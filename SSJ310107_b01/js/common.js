;(function (win, doc, undefined) {

	/* ===========================
	Base Utils
	=========================== */
	/**
	 * @name closestByClassName
	 * @param {String} className 
	 * @returns {HTMLElement}
	 */
	HTMLElement.prototype.closestByClass = function(className) {
    var target = this;
    while (!target.parentElement.classList.contains(className)) {
				target = target.parentElement;
        if (target.parentElement === null) {
            throw new Error('Not found.');
        }
    }
    return target.parentElement;
	};


	/* ===========================
	Custom Utils
	=========================== */
	var namespace = 'speakUp';

	win[namespace] = {
		willTimer: null,
		getRandomInt: function(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값은 제외, 최솟값은 포함
		},
		/**
		 * @name goToNPage
		 * @param {Number} targetIndex 
		 * @param {HTMLElement} $evtEl 
		 */
		goPage: function(targetIndex, $evtEl, callback){
			var $targetPage = document.querySelector('[data-index="' + targetIndex + '"]');

			// bgm은 먼저 틀고
			if (!!$targetPage.getAttribute('data-bgm')) {
				win[namespace].soundStatus('play', 'bgm', $targetPage.getAttribute('data-bgm'));
			}

			// 캔버스에 다 그리고 난 뒤 이벤트 실행
			win[namespace].animationStatus('', 'b', '', function(){
				if (!!$evtEl) {
					var $evtPage = $evtEl.closestByClass('page-area');
					$evtPage.style.display = 'none';
				}
				$targetPage.style.display = 'block';
				!!callback && callback();
			});

		},
		currentStep: 1,
		goStep: function(targetStep) {
			clearTimeout(win[namespace].willTimer);
			document.querySelector('.question-area').style.display = 'none';
			document.querySelector('.btn-voice').style.display = 'none';
			if (targetStep === 1){
				win[namespace].progressStatus('reset');
				win[namespace].askQuestion(win[namespace].speak[0][0]);
			} else if (targetStep === 2){
				win[namespace].askQuestion(win[namespace].speak[4][0]);
			}
			win[namespace].setBgImg('bg_main'+targetStep);
			var bgmStatus = win[namespace].currentBgmStatus.status;
			win[namespace].soundStatus('play', 'bgm', 'bgm_0'+targetStep);
			if (bgmStatus !== 'play'){
				win[namespace].soundStatus('stop', 'bgm');
			}
			win[namespace].currentStep = targetStep;
		},
		/**
		 * 
		 * @param {String} status 'disabled', 'abled', 'show', 'hide'
		 * @param {HTMLElement} target 
		 */
		pageBtnsStatus: function(status, target) {
			return; 

			var $target = '.page-btns button';
			if (!!target) {
				$target = target === 'next' ? '.btn-next' : '.btn-prev';
			}
			if (status === 'disabled' || status === 'abled') {
				document.querySelectorAll($target).forEach(function(item) {
					item.disabled = status === 'disabled' ? true : false;
				})
			} else {
				document.querySelectorAll($target).forEach(function(item) {
					item.style.display = status === 'show' ? 'block' : 'none';
				})
			}
		},
		/**
		 * 
		 * @param {String} status (stop, play)
		 * @param {String} type (bgm, wrong, script, effect) 
		 * @param {String} name (intro, 01, 02 ...) 
		 * @param {function} callback
		 */
		currentBgmStatus: {
			status: 'stop',
			name: ''
		},
		soundStatus: function(status, type, name, callback){
			var soundType = type;
			if (type === 'wrong' || type === 'script') {
				soundType = 'script';
			}
			if (status === 'play') { // play status
				if (!document.querySelector('.audio-' + name)) { // no have bgm tag
					var $audio = document.createElement('audio');
					var url = 'audio/' + type + '/' + name + '.mp3';
					$audio.setAttribute('class', name);
					$audio.classList.add('class', 'audio-' + soundType);
					$audio.setAttribute('src', url);
					// $audio.src(url);
					$audio.setAttribute('name', 'audio/mpeg');
					if (type === 'bgm') {
						$audio.setAttribute('loop' ,'');
						$audio.volume = 0.4;
						win[namespace].currentBgmStatus.status = 'play';
						win[namespace].currentBgmStatus.name = name;
					}
					document.querySelector('body').appendChild($audio);
				} else {
					var $audio = document.querySelector('.' + name);
				}
				if (type !== 'effect') {
					muteByType(type);
				}
				if (!$audio.ended) {
					$audio.currentTime = 0;
				}
				$audio.oncanplaythrough = function(){
					$audio.play();
				}

				// tobe : mp3 재생 끝날때 callback 실행시키도록
				!!callback && callback();
			} else { // stop status
				muteByType(type);
				if (type === 'bgm') {
					win[namespace].currentBgmStatus.status = 'stop';
				}
			}

			function muteByType(soundType) {
				var $otherAudio = document.querySelectorAll('[class*=audio-' + soundType + ']');
				var otherAudioindex = 0;
				while (otherAudioindex < $otherAudio.length) {
					$otherAudio[otherAudioindex].pause();
					otherAudioindex++;
				}
			}
		},
		/**
		 * 
		 * @param {String} status (right, wrong, ing || reset)
		 * @param {Number} progressStep ing index
		 */
		progressStatus: function(status, ingStep){
			var $progressArea = document.querySelector('.progress-area');
			var $progress = $progressArea.querySelectorAll('li');
			var progressStep = 0;
			if (status === 'reset') {
				$progress.forEach(function(item, index) {
					item.classList = '';
				})
			} else {
				if (status === 'ing') {
					progressStep = ingStep;
				} else {
					progressStep = $progressArea.querySelectorAll('.wrong, .right').length;
				}
				$progress[progressStep].classList.add(status);
			}
		},
		/**
		 * 
		 * @param {Object} script {text:String, voice:String, duration:Number, endBack:function}
		 * @param {Object} question {type:String, answer:Array, resultBack}
		 */
		askQuestion: function(script, question){
			var text = script.text;
			var voice = script.voice;
			script.duration += 1000;
			var fnEndBack = function(){
				win[namespace].willTimer = setTimeout(script.endBack, script.duration)
			}

			win[namespace].setText(text);

			var animationSpec = script.animation;
			win[namespace].animationStatus('', animationSpec.type);

			win[namespace].animationStatus('play', animationSpec.type, animationSpec.duration);

			// 질문이 있을때는 checkAnswer로 넘어감
			clearTimeout(win[namespace].willTimer);
			if (question === undefined){
				win[namespace].soundStatus('play', 'script', voice, fnEndBack);
			} else {
				win[namespace].soundStatus('play', 'script', voice);
				// win[namespace].checkAnswer(script, question, script.endBack);
				win[namespace].checkAnswer(script, question, question.resultBack);
				// fnEndBack();
			}
		},
		
		/**
		 * 
		 * @param {Object} wrongScript  틀렸다는 음성 & 지문
		 * @param {function} endBack 
		 * @param {boolean} 버튼이랑 문제 보일건지 말지
		 */
		wrongAnswer: function(wrongScript, endBack, isShow){
			var text = wrongScript.text;
			var voice = wrongScript.voice;
			var duration = wrongScript.duration;

			win[namespace].setText(text);
			win[namespace].soundStatus('play', 'wrong', voice);
			if (win[namespace].checkAnswerTry < 3) {
				win[namespace].checkAnswerTry++;
			} else {
				win[namespace].checkAnswerTry = 1;
			}
			
			var motionIndex = win[namespace].getRandomInt(1, 2);
			win[namespace].animationStatus('play', 'e'+motionIndex, duration);

			clearTimeout(win[namespace].willTimer);
			win[namespace].willTimer = setTimeout(function(){
				if (isShow){
					document.querySelector('.question-area').style.display = 'block';
					document.querySelector('.btn-voice').style.display = 'block';
				} else {
					document.querySelector('.question-area').style.display = 'none';
					document.querySelector('.btn-voice').style.display = 'none';
				}
				endBack();
				// debugger;
			}, duration)
		},
		introAnimation: function() {
			document.querySelector('.page-area.intro').classList.remove('on');
			setTimeout(function(){
				document.querySelector('.page-area.intro').classList.add('on');
			}, 200)
		},
		setText: function(text){
			var $text = document.querySelector('.txt-script span');
			$text.innerHTML = text;
		},
		/**
		 * 
		 * @param {} script 
		 * @param {Object} question 
				{
					type: 'word', 'ox
					answer: [
						['ㄱㅈ'],
						['고지', '고증', '고장'],
						['고장']
					]
				};
				true | false
		 * @param {*} endBack 
		 */
		blinkTimer: 0,
		checkAnswerTry: 1,
		checkAnswer: function(script, question, resultBack){
			var $questionArea = document.querySelector('.question-area');
			var $btnVoice = document.querySelector('.btn-voice');

			$questionArea.style.display='block';
			$btnVoice.style.display='block';
			$btnVoice.disabled = true;

			function blinkBtnVoice() {
				clearTimeout(win[namespace].blinkTimer);
				win[namespace].blinkTimer = setTimeout(function(){
					$btnVoice.classList.add('blink');
					question.type === 'word' ? $btnVoice.disabled = false : '';
				}, script.duration)
			}
			blinkBtnVoice();

			// [QuizType1] 단답형일 시
			if (question.type === 'word') {
				// answer check !! (question.answer[0])
				$questionArea.innerHTML = '<div class="single"></div>';
				var $questionInner = $questionArea.querySelector('.single');
				var answerText = question.answer[2][0];
				var reduceAnswerText = answerText.replace(/ /g,'');

				// 단어 세개 중 선택하기
				function setWordsAnswer() {
					$questionArea.classList.add('wide');
					$questionArea.innerHTML = '<div class="multiple"></div>';
					$questionInner = $questionArea.querySelector('.multiple');
					var answerWords = question.answer[1];
					var multipleHTML = '';

					answerWords.forEach(function(item){
						multipleHTML += '<span>' + item + '</span>';
					})
					$questionInner.innerHTML = multipleHTML;
				}

				// 첫번째 (글자수만 나오는거)
				setInitialAnswer(answerText, true);
				function evtStartVoiceCheck(){
					$btnVoice.disabled = true;

					if (externalManager.isPlayer()) {
						window.HybridApp.startSilvySTTMode(0);
						window.HybridApp.onResultSTTMode = function(str) {
							voiceText = {text: str, reduceText: str.replace(/(\s*)/g,'')};
							startVoiceCheck(voiceText);
						}
						window.HybridApp.onResultError = function() {
							voiceText = {text: '', reduceText: ''.replace(/(\s*)/g,'')};
							startVoiceCheck(voiceText);
						}
					} else {
						voiceText = {text: '백 지도', reduceText: '백지도'.replace(/(\s*)/g,'')};
						startVoiceCheck(voiceText);
					}
				}
				$btnVoice.removeEventListener('click', evtStartVoiceCheck);
				$btnVoice.addEventListener('click', evtStartVoiceCheck);

				function startVoiceCheck(voiceText){
					var tryNum = win[namespace].checkAnswerTry;
					win[namespace].soundStatus('stop', 'script');
					clearTimeout(win[namespace].blinkTimer);
					$btnVoice.classList.remove('blink');
					$btnVoice.disabled = true;
					
					if (voiceText.reduceText.slice(0, reduceAnswerText.length) !== reduceAnswerText) {
						// 1트에 실패일 시, 초성 나옴
						if (tryNum === 1){
							$btnVoice.disabled = true;
							setInitialAnswer(voiceText.reduceText.slice(0, reduceAnswerText.length));
							// [To-be]
							setTimeout(function(){
								var wrongIndex = win[namespace].getRandomInt(0, 4);
								win[namespace].setText(win[namespace].wrongScript[0][wrongIndex].text);
								win[namespace].wrongAnswer(
									win[namespace].wrongScript[0][wrongIndex], 
									function(){
										setInitialAnswer(question.answer[0][0]);
										win[namespace].soundStatus('play', 'script', script.voice);
										win[namespace].animationStatus('play', 'd', script.animation.duration);
										win[namespace].setText(script.text);
										blinkBtnVoice();
									},
									true
								);
							}, 1000)
						} else if (tryNum === 2){
							$btnVoice.disabled = true;
							setInitialAnswer(voiceText.reduceText.slice(0, reduceAnswerText.length));
							setTimeout(function(){
								var wrongIndex = win[namespace].getRandomInt(0, 4);
								win[namespace].setText(win[namespace].wrongScript[0][wrongIndex].text);
								win[namespace].wrongAnswer(
									win[namespace].wrongScript[0][wrongIndex], 
									function(){
										setWordsAnswer(); // multiple
										win[namespace].soundStatus('play', 'script', script.voice);
										win[namespace].animationStatus('play', 'd', script.animation.duration);
										win[namespace].setText(script.text);
										blinkBtnVoice();
									},
									true
								); 
							}, 1000);
						} else if (tryNum === 3){
							// 보기 중에 단어가 있을 땐 체크해서 잠시 멈췄다가
							var timer = 0;
							var selectedAnswer = false;
							question.answer[1].forEach(function(item, index){
								if (item === voiceText.reduceText.slice(0, reduceAnswerText.length)) {
									$questionInner.querySelectorAll('span')[index].classList.add('selected');
									timer = 1500;
									selectedAnswer = index;
								}
							})
							setTimeout(function(){
								$questionInner.classList.add('answer-wrong');
								question.answer[1].forEach(function(item, index){
									if (item === answerText) {
										$questionInner.querySelectorAll('span')[index].classList.add('right');
									}
								})
								!!selectedAnswer && $questionInner.querySelectorAll('span')[selectedAnswer].classList.add('wrong');
								win[namespace].progressStatus('wrong');
								win[namespace].soundStatus('play', 'effect', 'wrong');
								$btnVoice.removeEventListener('click', evtStartVoiceCheck);

								setTimeout(function(){
									var wrongIndex = win[namespace].getRandomInt(0, 2);
									win[namespace].setText(win[namespace].wrongScript[1][wrongIndex].text);
									win[namespace].wrongAnswer(// [To-be] wrongAnswer()가 아니라, 으음~아쉬워 알려줄게! 랜덤으로
										win[namespace].wrongScript[1][wrongIndex], 
										function(){ 
											// 여기서 멀티플 중에 .. 발음한 답이 있으면 그거 선택, 그리고 없으면 그냥 땡 하고 정답 선택. 만약 정답 맞으면 정답에 동그라미
											!!resultBack && resultBack.wrong();
											fnEndBack();
										},
										false
									);
								}, 1500)
								return false;
							}, timer)
						}
					} else {
						/* 성공일 시, 정답 모션
						============================== */
						if (tryNum === 3) {
							$questionInner.classList.add('answer-right');
							question.answer[1].forEach(function(item, index){
								if (item === answerText) {
									$questionInner.querySelectorAll('span')[index].classList.add('right');
								}
							})
						} else {
							setInitialAnswer(answerText);
							$questionInner.classList.add('right');
						}
						setTimeout(function(){
							win[namespace].soundStatus('play', 'effect', 'right');
							win[namespace].checkAnswerTry = 1;
							win[namespace].progressStatus('right');
							$btnVoice.removeEventListener('click', evtStartVoiceCheck);
							setTimeout(function(){
								$questionArea.style.display='none';
								$btnVoice.style.display='none';
								!!resultBack && resultBack.right();
							}, 2000)
							return true;
						}, 1000);
					}
				}

			} else if (question.type === 'ox') {
				// [QuizType2] O/X일 시
				$questionArea.innerHTML = '<div class="single"></div>';
				var $questionInner = $questionArea.querySelector('.single');
				var answerText = question.answer ? '같아' : '달라';

				setInitialAnswer(answerText, true);

				$btnVoice.removeEventListener('click', evtStartVoiceCheck);
				$btnVoice.addEventListener('click', evtStartVoiceCheck);

				var guideVoiceTimer = setTimeout(function(){
					win[namespace].soundStatus('play', 'script', 'SSJ310107_14', function(){
						setTimeout(function(){
							$btnVoice.disabled = false;
						},5000)
					});
				}, script.duration);

				function evtStartVoiceCheck(){
					clearTimeout(guideVoiceTimer);
					$btnVoice.disabled = true;

					if (externalManager.isPlayer()) {
						window.HybridApp.startSilvySTTMode(0);
						window.HybridApp.onResultSTTMode = function(str) {
							voiceText = {text: str, reduceText: str.replace(/(\s*)/g,'')};
							startVoiceCheck(voiceText);
						} 
						window.HybridApp.onResultError = function() {
							voiceText = {text: '', reduceText: ''.replace(/(\s*)/g,'')};
							startVoiceCheck(voiceText);
						}
					} else {
						voiceText = {text: '달라', reduceText: '달라'.replace(/(\s*)/g,'')};
						startVoiceCheck(voiceText);
					}

					function startVoiceCheck() {
						if (voiceText.reduceText.slice(0, answerText.length) === answerText) {
							win[namespace].soundStatus('play', 'effect', 'right');
							win[namespace].progressStatus('right');
							setInitialAnswer(answerText);
							fnEndBack();
							$btnVoice.removeEventListener('click', evtStartVoiceCheck);
							$questionInner.classList.add('right');
							setTimeout(function(){
								win[namespace].checkAnswerTry = 1;
								$questionArea.style.display='none';
								$btnVoice.style.display='none';
								!!resultBack && resultBack.right();
							}, 2000);
						} else {
							win[namespace].progressStatus('wrong');
							setInitialAnswer(voiceText.reduceText.slice(0, answerText.length));
							win[namespace].soundStatus('play', 'effect', 'wrong');
							$btnVoice.removeEventListener('click', evtStartVoiceCheck);
							win[namespace].soundStatus('stop', 'script');
							setTimeout(function(){
								var wrongIndex = win[namespace].getRandomInt(0, 2);
								win[namespace].setText(win[namespace].wrongScript[1][wrongIndex].text);
								win[namespace].wrongAnswer(
									win[namespace].wrongScript[1][wrongIndex], 
									function(){ 
										// !!resultBack && resultBack.wrong();
										win[namespace].checkAnswerTry = 1;
										$questionArea.style.display='none';
										$btnVoice.style.display='none';
										!!resultBack && resultBack.wrong();
									},
									true
								);
							}, 2000);
						}
					}
				}
			}

			// 초성값 .single에 넣기
			function setInitialAnswer(initial, isTransparent) {
				$questionArea.classList.remove('wide');
				var resultHTML = '';
				for(var i = 0; i < initial.length; i++) {
					if (initial[i] === ' ') {
						resultHTML += '&nbsp;';
					} else {
						if (isTransparent) {
							resultHTML += '<span></span>';
						} else {
							resultHTML += '<span>' + initial[i] + '</span>';
						}
					}
				}
				$questionInner.innerHTML = resultHTML;
			}

			function fnEndBack() {
				setTimeout(function(){
					$questionArea.style.display='none';
					$btnVoice.style.display='none';
				}, script.duration)
			}
		},
		calcEndResult: function(rightNum){
			var resultIndex = 0;
			if (rightNum === 6) {
				resultIndex = 0;
			} else if (rightNum === 5 || rightNum === 4) {
				resultIndex = 1;
			} else if (rightNum === 2 || rightNum === 3) {
				resultIndex = 2;
			} else {
				resultIndex = 3;
			}
			document.querySelector('#resultNumber').innerHTML = rightNum;
			document.querySelector('#resultText').innerHTML = win[namespace].resultScript[resultIndex].text;
			document.querySelector('#modalEnding').style.display = 'block';
			setTimeout(function(){
				document.querySelector('#modalEnding').classList.add('open');
			}, 100)
			document.querySelector('.progress-end-area').innerHTML = document.querySelector('.progress-area').innerHTML;
			
			win[namespace].soundStatus('play', 'script', win[namespace].resultScript[resultIndex].voice);
		},
		setBgImg: function(fileName){
			var $pageArea = document.querySelector('.page-area.question');
			$pageArea.style.backgroundImage = 'url("img/'+fileName+'.jpg")';
		},
		restart: function(){
			document.querySelectorAll('.modal-area').forEach(function(item){
				item.style.display = 'none';
			})
			document.querySelector('#modalEnding').classList.remove('open');
			win[namespace].introAnimation();
			win[namespace].goPage(0);
			// win[namespace].goStep(1);
			win[namespace].setText(win[namespace].speak[0][0].text);
			document.querySelector('.btn-audio').classList.remove('off');
			
			win[namespace].pageBtnsStatus('hide');
			win[namespace].pageBtnsStatus('disabled');
		},
		resultScript: [
			{
				text: '우리 친구 최고! 정말 잘했어~',
				voice: 'SSJ3b_ending_01',
				duration: 4000
			},
			{
				text: '잘했어! 열심히 공부하고 있구나.',
				voice: 'SSJ3b_ending_02',
				duration: 4000
			},
			{
				text: '다음 번엔 더 잘할 수 있을 거야.',
				voice: 'SSJ3b_ending_03',
				duration: 4000
			},
			{
				text: '아쉽다~ 다음엔 더 잘해보자! ',
				voice: 'SSJ3b_ending_04',
				duration: 5000
			},
		],
		wrongScript: [
			[
				{
					text: '다시 한번 생각해보자!',
					voice: 'SSJ3b_A_01',
					duration: 3000
				},
				{
					text: '조금 더 생각해보자!',
					voice: 'SSJ3b_A_02',
					duration: 2000
				},
				{
					text: '한 번 더 생각해볼까?',
					voice: 'SSJ3b_A_03',
					duration: 3000
				},
				{
					text: '글쎄, 한 번 더 생각해봐!',
					voice: 'SSJ3b_A_04',
					duration: 3000
				},
				{
					text: '아쉬워~ 한 번 더 생각해볼까?',
					voice: 'SSJ3b_A_05',
					duration: 4000
				},
			],
			[
				{
					text: '아쉬워~ 내가 설명해 줄게!',
					voice: 'SSJ3b_B_01',
					duration: 4000
				},
				{
					text: '잘 모르겠다면 내가 알려줄게!',
					voice: 'SSJ3b_B_02',
					duration: 4000
				},
				{
					text: '어려웠구나! 내가 알려줄게.',
					voice: 'SSJ3b_B_03',
					duration: 4000
				},
			]
		],
		speak: [
			[
				{
					text: '안녕? 나는 천재초등학교 3학년 1반 하늘이라고 해!',
					voice: 'SSJ310107_01',
					duration:5000,
					animation: {
						type: 'b',
						duration: 5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][1]);
					}
				},
				{
					text: '만나서 반가워~ 헤헷!',
					voice: 'SSJ310107_02',
					duration:3000,
					animation: {
						type: 'c',
						duration: 2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][2]);
					}
				},
				{
					text: '그런데, 여기가 어디냐고?',
					voice: 'SSJ310107_03',
					duration:3000,
					animation: {
						type: 'c',
						duration: 2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				}
			],
			[
				{
					text: '여긴 우리 동네야. 많은 사람들이 살고 있지.',
					voice: 'SSJ310107_04',
					duration:4000,
					animation: {
						type: 'c',
						duration: 3500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						// 여기서 박스 나타남
						win[namespace].askQuestion(
							win[namespace].speak[1][1],
							{
								type: 'word',
								answer: [
									['ㄱㅈ'],
									['고장', '공주', '기지'],
									['고장']
								],
								resultBack: {
									right: function(){
										win[namespace].askQuestion(win[namespace].speak[1][3]);
									},
									wrong: function(){
										win[namespace].askQuestion(win[namespace].speak[1][2]);
									}
								}
							}
						);
					}
				},
				{
					text: '사람들이 모여 사는 곳을 무엇이라고 하더라?',
					voice: 'SSJ310107_05',
					duration:3700,
					animation: {
						type: 'd',
						duration: 3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][2]);
					}
				},
				{
					text: '사람들이 모여 사는 곳을 고장이라고 해.',
					voice: 'SSJ310107_06',
					duration:4000,
					animation: {
						type: 'f',
						duration: 3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '우리 고장의 여러 장소가 머릿속에 떠오르네!',
					voice: 'SSJ310107_07',
					duration:4000,
					animation: {
						type: 'f',
						duration: 3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				{
					text: '그중에서, 내가 제일 좋아하는 장소가 어디인지 맞춰볼래?',
					voice: 'SSJ310107_08',
					duration:5000,
					animation: {
						type: 'd',
						duration: 4200
					},
					endBack: function(){
						// 여기서 박스 나타남
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][1],
							{
								type: 'word',
								answer: [
									['ㅎㄱ'],
									['현관', '항구', '학교'],
									['학교']
								],
								resultBack: {
									right: function(){
										win[namespace].askQuestion(win[namespace].speak[2][3])
									},
									wrong: function(){
										win[namespace].askQuestion(win[namespace].speak[2][2]);
									}
								}
							}
						);
					}
				},
				{
					text: '이곳은, 친구들과 함께 교실에서 공부하고<br>운동장에서 재미있게 놀 수 있는 곳이야.',
					voice: 'SSJ310107_09',
					duration:7500,
					animation: {
						type: 'd',
						duration: 7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][2]);
					}
				},
				{
					text: '친구들과 함께 교실에서 공부하고<br>운동장에서 재미있게 노는 곳은 학교이지.',
					voice: 'SSJ310107_10',
					duration:7000,
					animation: {
						type: 'f',
						duration: 6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][3]);
					}
				},
				{
					text: '나중에 우리 고장의 장소 알림판에 학교를 꼭 소개할 테야. ',
					voice: 'SSJ310107_11',
					duration:6000,
					animation: {
						type: 'f',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '그때 꼭 도와줘야 해! 알겠지?',
					voice: 'SSJ310107_12',
					duration: 4000,
					animation: {
						type: 'f',
						duration: 3800
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][0], 
							{
								type: 'ox',
								answer: false,
								resultBack: {
									right: function(){
										win[namespace].askQuestion(win[namespace].speak[3][2]);
									},
									wrong: function(){
										win[namespace].askQuestion(win[namespace].speak[3][1]);
									}
								}
							})
					}
				},
			],
			[
				{
					text: '그런데, 친구들 각자의 고장에 대한 생각과 느낌은<br>서로 같을까 다를까?',
					voice: 'SSJ310107_13',
					duration: 7000,
					animation: {
						type: 'd',
						duration: 10500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][1]);
					}
				},
				{
					text: '고장에 대한 생각과 느낌은 각자의 경험에 따라<br>서로 다를 수 있어.',
					voice: 'SSJ310107_15',
					duration: 6000,
					animation: {
						type: 'f',
						duration: 5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][2]);
					}
				},
				{
					text: '그래! 고장에 대한 서로 다른 생각과 느낌을 이해하고 존중하는 자세가 필요하다는 점',
					voice: 'SSJ310107_16',
					duration: 7000,
					animation: {
						type: 'f',
						duration: 6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '절대 잊지 말자고~!',
					voice: 'SSJ310107_17',
					duration: 3000,
					animation: {
						type: 'f',
						duration: 2500
					},
					endBack: function(){
						win[namespace].currentStep = 1;
						// win[namespace].pageBtnsStatus('abled', 'next');
						// win[namespace].pageBtnsStatus('show', 'next');
						
						window.speakUp.goStep(2);
					}
				},
			],
			[
				{
					text: '이번에는 하늘에서 내려다본 고장의 모습을 살펴보자.',
					voice: 'SSJ310107_18',
					duration: 5000,
					animation: {
						type: 'c',
						duration: 4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(win[namespace].speak[4][1],
							{
								type: 'word',
								answer: [
									['ㅇㄱㅇㅅ'],
									['인공위성', '인공우산', '인공영상'],
									['인공위성']
								],
								resultBack: {
									right: function(){
										win[namespace].askQuestion(win[namespace].speak[4][3]);
										// win[namespace].animationStatus('play', 'f', 7500);
									},
									wrong: function(){
										win[namespace].askQuestion(win[namespace].speak[4][2]);
										// win[namespace].animationStatus('play', 'f', 5500);
									}
								}
							}
						);
					}
				},
				{
					text: '사람들이 만들어 쏘아 올린 비행 물체를<br>뭐라고 부르는지 아니?',
					voice: 'SSJ310107_19',
					duration: 5000,
					animation: {
						type: 'd',
						duration: 5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][2]);
					}
				},
				{
					text: '사람들이 만들어 쏘아 올린 비행 물체를 인공위성이라고 해.',
					voice: 'SSJ310107_20',
					duration: 6000,
					animation: {
						type: 'f',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
						win[namespace].animationStatus('play', 'f', 7500);
					}
				},
				{
					text: '인공위성 사진은 우주에서 찍었기 때문에<br>어떤 장소의 위치를 쉽게 알게 해주지.',
					voice: 'SSJ310107_21',
					duration: 8000,
					animation: {
						type: 'f',
						duration: 7500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][0],
							{
								type: 'word',
								answer: [
									['ㄷㅈㅌ ㅇㅅ ㅈㄷ'],
									['디지털 영상 지도', '디지털 인식 지도', '디지털 안심 지도'],
									['디지털 영상 지도']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[5][1])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[5][2])}
								}
							}
						);
					}
				},
			],
			[
				{ // 5 - 0
					text: '그렇다면, 인공위성 사진을 이용해 만든 지도를<br>무엇이라고 할까?',
					voice: 'SSJ310107_22',
					duration: 6000,
					animation: {
						type: 'd',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{
					text: '인공위성 사진을 이용해서 만든 지도를<br>디지털 영상 지도라고 해.',
					voice: 'SSJ310107_23',
					duration: 5000,
					animation: {
						type: 'f',
						duration: 4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][2]);
					}
				},
				{
					text: '디지털 영상 지도를 통해서 우리 고장을<br>우주에서 내려다본 것처럼 살펴볼 수 있어.',
					voice: 'SSJ310107_24',
					duration: 7000,
					animation: {
						type: 'f',
						duration: 6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '이동, 확대, 다른 종류의 지도로 바꾸기 등<br>여러 가지 기능을 이용할 수 있다고~!',
					voice: 'SSJ310107_25',
					duration: 7000,
					animation: {
						type: 'f',
						duration: 6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
					}
				},
			],
			[ // 6 - 0
				{
					text: '자 그러면, 이제 우리 고장의 안내도를 만들 때 필요한<br>지도에 대해 알아보자.',
					voice: 'SSJ310107_26',
					duration: 7000,
					animation: {
						type: 'c',
						duration: 7000
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][1],
							{
								type: 'word',
								answer: [
									['ㅂㅈㄷ'],
									['빈지도', '본지도', '백지도'],
									['백지도']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[6][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[6][2])}
								}
							}
						);
					}
				},
				{
					text: '산, 강, 큰길 등의 밑그림만 그려져 있는 지도를<br>무엇이라고 하지?',
					voice: 'SSJ310107_27',
					duration: 6000,
					animation: {
						type: 'd',
						duration: 5600
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][2]);
					}
				},
				{
					text: '산, 강, 큰길 등의 밑그림만 그려져 있는 지도를<br>백지도라고 해.',
					voice: 'SSJ310107_28',
					duration: 6000,
					animation: {
						type: 'f',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][3]);
					}
				},
				{
					text: '그래, 백지도에 우리 고장의 주요 장소를 나타내어,<br>우리 고장의 안내도를 만들 수 있지!',
					voice: 'SSJ310107_29',
					duration: 8000,
					animation: {
						type: 'f',
						duration: 8000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
						/* 화면 전환하기 */
					}
				}
			],
			[
				{
					text: '우와! 이야기 나누다 보니까 시간이 금방 갔네!',
					voice: 'SSJ310107_30',
					duration: 5000,
					animation: {
						type: 'c',
						duration: 5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '덕분에 사회 시간에 배운 내용들 절대 잊어버리지<br>않을 것 같아.',
					voice: 'SSJ310107_31',
					duration: 6000,
					animation: {
						type: 'c',
						duration: 6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][2]);
					}
				},
				{
					text: '다음에 또 만나서 이야기 나누자. 안녕~!',
					voice: 'SSJ310107_32',
					duration: 4000,
					animation: {
						type: 'b',
						duration: 4000
					},
					endBack: function(){
						win[namespace].currentStep = 2;
						// win[namespace].pageBtnsStatus('show');
						// win[namespace].pageBtnsStatus('abled', 'prev');
						// win[namespace].pageBtnsStatus('abled', 'next');
						
						externalManager.completeContents(); // 학습 완료

						window.speakUp.calcEndResult(document.querySelectorAll('.progress-area .right').length);
						window.speakUp.soundStatus('play', 'bgm', 'bgm_intro');

					}
				},
			]
		],
		init: function(){
			win[namespace].introAnimation();
			win[namespace].goPage(0);
			
			win[namespace].pageBtnsStatus('hide');
			win[namespace].pageBtnsStatus('disabled');
		}
	}

	document.addEventListener('DOMContentLoaded', function(){
		win[namespace].init();
	})

})(window, document);