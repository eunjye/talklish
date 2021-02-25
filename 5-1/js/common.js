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
				var _firstBgm = new Audio('audio/bgm/bgm_01.mp3');
				_firstBgm.oncanplaythrough  = function(){
					if (!!$evtEl) {
						var $evtPage = $evtEl.closestByClass('page-area');
						$evtPage.style.opacity = '0';
						$evtPage.style.zIndex = '-10';
						$evtPage.style.position = 'absolute';
					}
					$targetPage.style.opacity = '1';
					$targetPage.style.zIndex = '10';
					$targetPage.style.position = 'relative';
					!!callback && callback();
				}
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
				win[namespace].askQuestion(win[namespace].speak[5][0]);
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
			var $audio;
			if (type === 'wrong' || type === 'script') {
				soundType = 'script';
			}
			if (status === 'play') { // play status
				if (!document.querySelector('audio.' + name)) { // no have bgm tag
					$audio = document.createElement('audio');
					var url = 'audio/' + type + '/' + name + '.mp3';
					$audio.setAttribute('class', name);
					$audio.classList.add('class', 'audio-' + soundType);
					$audio.setAttribute('src', url);
					
					$audio.setAttribute('name', 'audio/mpeg');
					if (type === 'bgm') {
						$audio.setAttribute('loop' ,'');
						$audio.volume = 0.4;
						win[namespace].currentBgmStatus.status = 'play';
						win[namespace].currentBgmStatus.name = name;
					}
					document.querySelector('body').appendChild($audio);
				} else {
					$audio = document.querySelector('audio.' + name);
				}
				if (type !== 'effect') {
					muteByType(type);
				}
				if (!$audio.ended) {
					$audio.currentTime = 0;
				}
				// $audio.oncanplaythrough = function(){
				// 	$audio.play();
				// }
				
				$audio.play();

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
			script.duration += 800;
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
				win[namespace].animationStatus('stop');
				setTimeout(function(){
					endBack();
				}, 1200)
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

			$btnVoice.disabled = true;

			function blinkBtnVoice() {
				clearTimeout(win[namespace].blinkTimer);
				$btnVoice.classList.add('blink');
				question.type === 'word' ? $btnVoice.disabled = false : '';

				// win[namespace].blinkTimer = setTimeout(function(){
				// 	$btnVoice.classList.add('blink');
				// 	question.type === 'word' ? $btnVoice.disabled = false : '';
				// }, script.duration)
			}
			win[namespace].blinkTimer = setTimeout(function(){
				blinkBtnVoice();
			}, script.duration);

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

				showQuestionArea();

				function evtStartVoiceCheck(){
					$btnVoice.disabled = true;
					
					win[namespace].animationStatus('stop');

					if (externalManager.isPlayer()) {
						window.HybridApp.startSilvySTTMode(7);
						window.HybridApp.onResultSTTMode = function(str) {
							voiceText = {text: str, reduceText: str.replace(/(\s*)/g,'')};
							startVoiceCheck(voiceText);
						}
						window.HybridApp.onResultError = function() {
							voiceText = {text: '', reduceText: ''.replace(/(\s*)/g,'')};
							startVoiceCheck(voiceText);
						}
					} else {
						voiceText = {text: '방위표', reduceText: '방위표'.replace(/(\s*)/g,'')};
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
							setTimeout(function(){
								var wrongIndex = win[namespace].getRandomInt(0, 4);
								win[namespace].setText(win[namespace].wrongScript[0][wrongIndex].text);
								win[namespace].wrongAnswer(
									win[namespace].wrongScript[0][wrongIndex], 
									function(){
										setInitialAnswer(question.answer[0][0]);
										win[namespace].animationStatus('play', 'd', script.animation.duration, function(){
											win[namespace].soundStatus('play', 'script', script.voice);
										});
										win[namespace].setText(script.text);
										blinkBtnVoice();
									},
									true
								);
							}, 1000)
						} else if (tryNum === 2){
							$btnVoice.disabled = true;
							setInitialAnswer(voiceText.reduceText.slice(0, reduceAnswerText.length));
							win[namespace].soundStatus('stop', 'script');

							setTimeout(function(){
								var wrongIndex = win[namespace].getRandomInt(0, 4);
								win[namespace].setText(win[namespace].wrongScript[0][wrongIndex].text);
								win[namespace].wrongAnswer(
									win[namespace].wrongScript[0][wrongIndex], 
									function(){
										setWordsAnswer(); // multiple
										win[namespace].animationStatus('play', 'd', script.animation.duration, function(){
											win[namespace].soundStatus('play', 'script', script.voice);
										});
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

				showQuestionArea();

				$btnVoice.removeEventListener('click', evtStartVoiceCheck);
				$btnVoice.addEventListener('click', evtStartVoiceCheck);

				var guideVoiceTimer = setTimeout(function(){
					win[namespace].soundStatus('play', 'script', 'SSJ410108_14', function(){
						setTimeout(function(){
							$btnVoice.disabled = false;
						},5000)
					});
				}, script.duration);

				function evtStartVoiceCheck(){
					clearTimeout(guideVoiceTimer);
					$btnVoice.disabled = true;

					if (externalManager.isPlayer()) {
						window.HybridApp.startSilvySTTMode(7);
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

			function showQuestionArea() {
				$questionArea.style.display='block';
				$btnVoice.style.display='block';
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
			document.querySelector('#btnStart').classList.remove('start');
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
				voice: 'SSJ3g_ending_01',
				duration: 4000
			},
			{
				text: '잘했어! 열심히 공부하고 있구나.',
				voice: 'SSJ3g_ending_02',
				duration: 4000
			},
			{
				text: '다음번엔 더 잘할 수 있을 거야.',
				voice: 'SSJ3g_ending_03',
				duration: 3000
			},
			{
				text: '아쉽다~ 다음엔 더 잘해보자! ',
				voice: 'SSJ3g_ending_04',
				duration: 4000
			},
		],
		wrongScript: [
			[
				{
					text: '다시 한번 생각해볼까?',
					voice: 'SSJ3g_A_01',
					duration: 3000
				},
				{
					text: '조금 더 생각해볼까?',
					voice: 'SSJ3g_A_02',
					duration: 3000
				},
				{
					text: '한 번 더 생각해보자!',
					voice: 'SSJ3g_A_03',
					duration: 3000
				},
				{
					text: '글쎄, 한 번 더 생각해볼까?',
					voice: 'SSJ3g_A_04',
					duration: 4000
				},
				{
					text: '아쉬워~ 한 번 더 생각해봐!',
					voice: 'SSJ3g_A_05',
					duration: 4000
				},
			],
			[
				{
					text: '아쉬워~ 내가 알려줄게!',
					voice: 'SSJ3g_B_01',
					duration: 3000
				},
				{
					text: '잘 모르겠다면 내가 설명해 줄게!',
					voice: 'SSJ3g_B_02',
					duration: 4000
				},
				{
					text: '어려웠구나! 내가 알려줄게.',
					voice: 'SSJ3g_B_03',
					duration: 4000
				},
			]
		],
		speak: [
			[
				{
					text: '안녕? 나는 천재초등학교 5학년 1반 바다라고 해!',
					voice: 'SSJ410108_01',
					duration:6000,
					animation: {
						type: 'b',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][1]);
					}
				},
				{
					text: '만나서 반가워 친구야!',
					voice: 'SSJ410108_02',
					duration:2500,
					animation: {
						type: 'c',
						duration: 2000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				},
			],
			[
				{
					text: '나는 지금 특별한 곳으로 여행을 와 있어. 여기가 어디냐고?',
					voice: 'SSJ410108_05',
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
									['ㄷㄷ'],
									['도덕', '등대', '독도'],
									['독도']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[1][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[1][2])}
								}
							}
						);
					}
				},
				{
					text: '우리나라 영토의 동쪽 끝에 있는 섬이야.',
					voice: 'SSJ410108_06',
					duration:6000,
					animation: {
						type: 'd',
						duration:5800
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][2]);
					}
				},
				{
					text: '우리나라 영토의 동쪽 끝에는 독도가 있지.',
					voice: 'SSJ410108_07',
					duration:5800,
					animation: {
						type: 'f',
						duration:5100
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '독도는 경상북도 울릉군에 속해 있는 섬이야. ',
					voice: 'SSJ410108_08',
					duration:8000,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				{
					text: '우리나라는 경상북도, 전라남도, 강원도 등으로 나뉘는 것 알고 있지?',
					voice: 'SSJ410108_10',
					duration:7000,
					animation: {
						type: 'c',
						duration:6600
					},
					endBack: function(){
						// 여기서 박스 나타남
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][1],
							{
								type: 'word',
								answer: [
									['ㅎㅈ'],
									['효자', '행정', '현장'],
									['행정']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[2][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[2][2])}
								}
							}
						);
					}
				},
				{
					text: '이렇게 나라를 효율적으로 관리하려고 나눈 지역을 무슨 구역이라고 하더라?',
					voice: 'SSJ410108_11',
					duration:9000,
					animation: {
						type: 'd',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][3]);
					}
				},
				{
					text: '우리나라는 나라를 효율적으로 관리하기 위해 행정 구역을 나눴어.',
					voice: 'SSJ410108_12',
					duration:6000,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '좋아! 다음에는 강원도로 여행을 떠나 볼래!',
					voice: 'SSJ410108_13',
					duration:4300,
					animation: {
						type: 'f', // 여기 f임
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][0]);
					}
				},
			],
			[
				{
					text: '짜잔~ 이곳은 강원도에 있는 동강이라고 해.',
					voice: 'SSJ410108_13',
					duration:4300,
					animation: {
						type: 'f', // 여기 f임
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][1]);
					}
				},
				{
					text: '하천 사이에 있는 산이 꼭 한반도의 땅의 생김새를 닮았지?',
					voice: 'SSJ410108_14',
					duration: 5000,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][2], 
							{
								type: 'word',
								answer: [
									['ㅈㅎ'],
									['지형', '재해', '지하'],
									['지형']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[3][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[3][3])}
								}
							}
						);
					}
				},
				{
					text: '이러한 산지와 하천 등 땅의 생김새를 무엇이라고 하는지 알고 있니?',
					voice: 'SSJ410108_15',
					duration: 4000,
					animation: {
						type: 'd',
						duration:4000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '땅의 생김새는 지형이라고 말해.',
					voice: 'SSJ410108_16',
					duration: 5000,
					animation: {
						type: 'f',
						duration:5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][4]);
					}
				},
				{
					text: '우리나라에서는 산지, 하천, 평야, 해안, 섬 등과 같은 다양한 지형을 볼 수 있지.',
					voice: 'SSJ410108_17',
					duration: 5000,
					animation: {
						type: 'f',
						duration:4800
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][0]);
					}
				},
			],
			[
				{
					text: '앗! 그런데 오늘은 날씨가 너무 덥고 습하네.',
					voice: 'SSJ410108_17',
					duration: 5000,
					animation: {
						type: 'f',
						duration:4800
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][1]);
					}
				},
				{
					text: '하늘이 흐리고 바람이 강한 걸 보니 곧 많은 비가 내릴 것 같아.',
					voice: 'SSJ410108_18',
					duration: 5000,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(
							win[namespace].speak[4][2],
							{
								type: 'word',
								answer: [
									['ㅌㅍ'],
									['통풍', '테풍', '탕평'],
									['테풍']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[4][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[4][3])}
								}
							}
						);
					}
				},
				{
					text: '적도 부근에서 발생해 이동하는 열대 저기압 때문이라던데, 무엇인지 알고 있어?',
					voice: 'SSJ410108_19',
					duration: 7000,
					animation: {
						type: 'd',
						duration:7000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
					}
				},
				{
					text: '적도 부근에서 발생해 우리나라에 영향을 주는 열대 저기압은 태풍이야.',
					voice: 'SSJ410108_20',
					duration: 7300,
					animation: {
						type: 'f',
						duration:7000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][4]);
					}
				},
				{
					text: '거센 태풍이 오기 전에 어서 집으로 돌아가야겠어!',
					voice: 'SSJ410108_21',
					duration: 5000,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][0]);
					}
				},
			],

			///////////////////////// [To-BE]
			[
				{
					text: '이곳은 시장이네! 사람이 정말 많다.',
					voice: 'SSJ410108_23',
					duration: 5000,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{
					text: '이 시장처럼, 고장에는 군청이나 구청, 버스 터미널 등 사람들이 많이 모이는 곳이 있어. ',
					voice: 'SSJ410108_24',
					duration: 9000,
					animation: {
						type: 'c',
						duration:8500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][2],
							{
								type: 'word',
								answer: [
									['ㅈㅅㅈ'],
									['전시장', '중심지', '자서전'],
									['중심지']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[5][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[5][3])}
								}
							}
						);
					}
				},
				{ 
					text: '사람들의 생활과 관련된 여러 시설이 모여 있는 곳을 무엇이라고 할까?',
					voice: 'SSJ410108_25',
					duration: 6000,
					animation: {
						type: 'd',
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '사람들의 생활과 관련된 여러 시설이 모여 있는 곳을 중심지라고 해.',
					voice: 'SSJ410108_26',
					duration: 7000,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][4]);
					}
				},
				{
					text: '고장 사람들은 필요한 것을 구하거나 다양한 시설을<br>이용하기 위해 지역의 중심지를 방문하지.',
					voice: 'SSJ410108_27',
					duration: 8000,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
					}
				},
			],
			[ // 6 - 0
				{
					text: '사실 내가 오늘 시장에 온 이유는,<br>시장에 대해 조사해 보기 위해서야.',
					voice: 'SSJ410108_28',
					duration: 7000,
					animation: {
						type: 'c',
						duration:7000
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][1],
							{
								type: 'word',
								answer: [
									['ㄷㅅ'],
									['독서', '도시', '답사'],
									['답사']
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
					text: '이와 같이 어떤 곳에 직접 찾아가 조사하는 것을<br>무엇이라고 할까?',
					voice: 'SSJ410108_29',
					duration: 6000,
					animation: {
						type: 'd',
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][2]);
					}
				},
				{
					text: '어떤 곳에 직접 찾아가서 조사하는 것을 답사라고 해.',
					voice: 'SSJ410108_30',
					duration: 6000,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][3]);
					}
				},
				{
					text: '좋아! 답사를 통해 시장의 모습을 자세히 살펴보고,<br>결과를 정리한 후 발표하는 시간을 가져봐야겠어.',
					voice: 'SSJ410108_31',
					duration: 9000,
					animation: {
						type: 'f',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][4]);
					}
				},
				{
					text: '덕분에 사회 시간에 배운 내용을 완벽하게 정리한 것 같은데?',
					voice: 'SSJ410108_32',
					duration: 6000,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
					}
				}
			],
			[
				{
					text: '고마워! 그럼 다음에 또 만나자~ 안녕!',
					voice: 'SSJ410108_33',
					duration: 6000,
					animation: {
						type: 'b',
						duration:5000
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