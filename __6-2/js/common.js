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
			var bgmStatus = win[namespace].currentBgmStatus.status;
			if (targetStep === 1){
				win[namespace].progressStatus('reset');
				win[namespace].askQuestion(win[namespace].speak[0][0]);
				win[namespace].soundStatus('play', 'bgm', 'bgm_01');
			} else if (targetStep === 2){
				win[namespace].askQuestion(win[namespace].speak[3][0]);
				win[namespace].soundStatus('play', 'bgm', 'bgm_02');
			} else if (targetStep === 3){
				win[namespace].askQuestion(win[namespace].speak[5][0]);
				win[namespace].soundStatus('play', 'bgm', 'bgm_01');
			}
			win[namespace].setBgImg('bg_main'+targetStep);
			if (bgmStatus !== 'play'){
				win[namespace].soundStatus('stop', 'bgm');
				document.querySelector('.btn-audio').classList.add('off');
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
			if (win[namespace].currentBgmStatus.status === status && win[namespace].currentBgmStatus.name === name && name !== 'bgm_intro') { return false; }
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
					document.querySelector('body').appendChild($audio);
				} else {
					$audio = document.querySelector('audio.' + name);
				}
				if (type === 'bgm') {
					$audio.setAttribute('loop' ,'');
					$audio.volume = 0.4;
					win[namespace].currentBgmStatus.status = 'play';
					win[namespace].currentBgmStatus.name = name;
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
				$btnVoice.disabled = false;
				// question.type === 'word' ? $btnVoice.disabled = false : '';
			}
			win[namespace].blinkTimer = setTimeout(function(){
				if (question.type === 'ox') {
					win[namespace].soundStatus('play', 'script', question.guideVoice);
					setTimeout(blinkBtnVoice, question.guideDuration);
				} else {
					blinkBtnVoice();
				}
			}, script.duration);

			$questionArea.innerHTML = '<div class="single"></div>';
			var $questionInner = $questionArea.querySelector('.single');
			var answerText = question.type === 'word' ? question.answer[2][0] : question.answer;
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
					var promtText = prompt('text 입력') || '';
					voiceText = {text: promtText, reduceText: promtText.replace(/(\s*)/g,'')};
					startVoiceCheck(voiceText);
				}
			}
			$btnVoice.removeEventListener('click', evtStartVoiceCheck);
			$btnVoice.addEventListener('click', evtStartVoiceCheck);

			/* Start answer check !!
			======================= */
			function startVoiceCheck(voiceText){
				var tryNum = win[namespace].checkAnswerTry;
				win[namespace].soundStatus('stop', 'script');
				clearTimeout(win[namespace].blinkTimer);
				$btnVoice.classList.remove('blink');
				$btnVoice.disabled = true;
				console.log(voiceText.reduceText);
				
				if (voiceText.reduceText.slice(0, reduceAnswerText.length) !== reduceAnswerText) {
					// 1트에 실패일 시, 초성 나옴
					if (tryNum === 1){
						$btnVoice.disabled = true;
						setInitialAnswer(voiceText.reduceText.slice(0, reduceAnswerText.length));
						setTimeout(function(){
							if (question.type === 'ox') {
								win[namespace].progressStatus('wrong');
								$btnVoice.removeEventListener('click', evtStartVoiceCheck);
								lastWrongAnswer();
								return;
							} else {
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
							}
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
							if (item.replace(/(\s*)/g,'') === voiceText.reduceText.slice(0, reduceAnswerText.length)) {
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
								lastWrongAnswer();
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

			function lastWrongAnswer() {
				var wrongIndex = win[namespace].getRandomInt(0, 2);
				win[namespace].setText(win[namespace].wrongScript[1][wrongIndex].text);
				win[namespace].wrongAnswer(
					win[namespace].wrongScript[1][wrongIndex], 
					function(){ 
						win[namespace].checkAnswerTry = 1;
						$questionArea.style.display='none';
						$btnVoice.style.display='none';
						!!resultBack && resultBack.wrong();
						fnEndBack();
					},
					false
				);
			}
			
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
				voice: 'SSJ5b_ending_01',
				duration: 4000
			},
			{
				text: '잘했어! 열심히 공부하고 있구나.',
				voice: 'SSJ5b_ending_02',
				duration: 4000
			},
			{
				text: '다음번엔 더 잘할 수 있을 거야.',
				voice: 'SSJ5b_ending_03',
				duration: 3000
			},
			{
				text: '아쉽다~ 다음엔 더 잘해보자! ',
				voice: 'SSJ5b_ending_04',
				duration: 4000
			},
		],
		wrongScript: [
			[
				{
					text: '다시 한번 생각해보자!',
					voice: 'SSJ5b_A_01',
					duration: 1500
				},
				{
					text: '조금 더 생각해보자!',
					voice: 'SSJ5b_A_02',
					duration: 1300
				},
				{
					text: '한 번 더 생각해볼까?',
					voice: 'SSJ5b_A_03',
					duration: 1500
				},
				{
					text: '글쎄, 한 번 더 생각해봐!',
					voice: 'SSJ5b_A_04',
					duration: 2500
				},
				{
					text: '아쉬워~ 한 번 더 생각해볼까?',
					voice: 'SSJ5b_A_05',
					duration: 3000
				},
			],
			[
				{
					text: '아쉬워~ 내가 설명해 줄게!',
					voice: 'SSJ5b_B_01',
					duration: 2500
				},
				{
					text: '잘 모르겠다면 내가 알려줄게!',
					voice: 'SSJ5b_B_02',
					duration: 2500
				},
				{
					text: '어려웠구나! 내가 알려줄게.',
					voice: 'SSJ5b_B_03',
					duration: 3000
				},
			]
		],
		speak: [
			[
				{
					text: '안녕? 난 천재초등학교에 다니는 6학년 우주라고 해.',
					voice: 'SSJ610316_01',
					duration:4500,
					animation: {
						type: 'b',
						duration: 4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][1]);
					}
				},
				{
					text: '오늘은 우리나라의 경제에 대해 알아보자.',
					voice: 'SSJ610316_02',
					duration:2500,
					animation: {
						type: 'c',
						duration: 2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][2]);
					}
				},
				{
					text: '경제, 말만 들어도 너무 어렵지? 사실 나도 그래. ',
					voice: 'SSJ610316_03',
					duration:4500,
					animation: {
						type: 'c',
						duration: 4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][3]);
					}
				},
				{
					text: '그래도 우리 생활에 아주 밀접하게 관련된 분야니까 <br>잘 알아둬야겠지?',
					voice: 'SSJ610316_04',
					duration:4500,
					animation: {
						type: 'c',
						duration: 4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				},
			],
			[
				{
					text: '가계는 생활에 필요한 물건과 서비스를 구매하고, <br>기업은 이를 통해 이윤을 얻게 돼.',
					voice: 'SSJ610316_05',
					duration:7500,
					animation: {
						type: 'c',
						duration: 7500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][1],
							{
								type: 'word',
								answer: [
									['ㅅㅈ'],
									['성장', '시장', '수정'],
									['시장']
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
					text: '이렇게 가계와 기업이 물건과 서비스를 거래하는 곳을 <br>뭐라고 할까?',
					voice: 'SSJ610316_06',
					duration:5500,
					animation: {
						type: 'd',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][2]);
					}
				},
				{
					text: '시장에서 가계는 생활에 필요한 물건과 서비스를 구매하고, 기업은 이를 통해 이윤을 얻게 돼.',
					voice: 'SSJ610316_07',
					duration:7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '우리나라는 자유로운 시장 거래를 보장하고 있어.',
					voice: 'SSJ610316_08',
					duration:3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				{
					text: '자신의 능력과 적성에 따라 자유롭게 <br>직업을 선택할 수도 있고,',
					voice: 'SSJ610316_09',
					duration:4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][1]);
					}
				},
				{
					text: '또, 기업은 이윤을 얻기 위해 자유롭게 <br>경제 활동을 할 수 있지.',
					voice: 'SSJ610316_10',
					duration:4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						// 여기서 박스 나타남
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][2],
							{
								type: 'word',
								answer: [
									['ㄱㅈ'],
									['경쟁', '고장', '궁전'],
									['경쟁']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[2][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[2][3])}
								}
							}
						);
					}
				},
				{
					text: '우리나라 경제의 특징에는 자유 말고도 <br>한 가지가 더 있는데, 그게 뭘까?',
					voice: 'SSJ610316_11',
					duration:5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][3]);
					}
				},
				{
					text: '우리나라 경제의 특징은 자유와 경쟁이야.',
					voice: 'SSJ610316_12',
					duration:3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '개인은 더 좋은 일자리를 얻기 위해 경쟁하고, <br>기업은 더 많은 이윤을 얻기 위해 경쟁하게 돼.',
					voice: 'SSJ610316_13',
					duration:7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][5]);
					}
				},
				{
					text: '개인과 기업의 자유로운 경쟁은 <br>국가 전체 경제 발전에 도움을 주게 되지.',
					voice: 'SSJ610316_14',
					duration:5500,
					animation: {
						type: 'f', 
						duration:5500
					},
					endBack: function(){
						window.speakUp.goStep(2);
					}
				},
			],
			[
				// idx 3
				{
					text: '이번에는 도시로 나가 보자. <br>우와~ 크고 멋진 건물들이 많다.',
					voice: 'SSJ610316_15',
					duration:5500,
					animation: {
						type: 'c', 
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][1]);
					}
				},
				{
					text: '우리나라는 6·25 전쟁을 겪고 나서 <br>경제적으로 상당한 어려움을 겪었대.',
					voice: 'SSJ610316_16',
					duration:5500,
					animation: {
						type: 'c', 
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][2]);
					}
				},
				{
					text: '그렇지만 지금은 이렇게 멋진 도시들이 많아질 정도로 <br>경제가 발전했지?',
					voice: 'SSJ610316_17',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][3],
							{
								type: 'word',
								answer: [
									['ㄱㅈ ㅅㅈ'],
									['고전 산조', '구직 시장', '경제 성장'],
									['경제 성장']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[3][5])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[3][4])}
								}
							}
						);
					}
				},
				{
					text: '이렇게 한 나라가 경제적으로 발전하는 것을 뭐라고 할까?',
					voice: 'SSJ610316_18',
					duration: 4500,
					animation: {
						type: 'd',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][4]);
					}
				},
				{
					text: '한 나라가 경제적으로 발전하는 것을 경제 성장이라고 해.',
					voice: 'SSJ610316_19',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][5]);
					}
				},
				{
					text: '우리나라는 경제가 성장하면서 <br>산업 분야도 점점 다양해지고 발전하게 됐어.',
					voice: 'SSJ610316_20',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][0]);
					}
				},
			],
			[
				{
					text: '이렇게 경제가 성장하면서 우리나라는 <br>사회적으로도 크게 변화하게 됐지.',
					voice: 'SSJ610316_21',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][1]);
					}
				},
				{
					text: '특히 해외여행객도 증가하고, <br>우리 문화와 관련된 상품들이 외국에서 인기를 얻고 있어.',
					voice: 'SSJ610316_22',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(
							win[namespace].speak[4][2],
							{
								type: 'word',
								answer: [
									['ㅎㄹ'],
									['한류', '훌륭', '호랑'],
									['한류']
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
					text: '우리나라의 대중가요나 드라마 같은 문화가 <br>전 세계로 퍼지는 현상을 뭐라고 부를까?',
					voice: 'SSJ610316_23',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
					}
				},
				{
					text: '우리 문화가 전 세계로 퍼지는 현상을 한류라고 해.',
					voice: 'SSJ610316_24',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][4]);
					}
				},
				{
					text: '한류를 즐기는 외국인이 급증하는 현상은 <br>경제 발전에 큰 기여를 하고 있대.',
					voice: 'SSJ610316_25',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].currentStep = 2;
						window.speakUp.goStep(3);
					}
				},
			],
			[
				{
					text: '우와~ 여긴 항구야! <br>저기 보이는 것들은 배로 싣고 나르는 상자들인가 봐.',
					voice: 'SSJ610316_26',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{
					text: '모두 어디로 가는 걸까? 다른 나라로 가는 걸까?',
					voice: 'SSJ610316_27',
					duration: 3500,
					animation: {
						type: 'c',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][2]);
					}
				},
				{
					text: '수업 시간에 다른 나라와의 경제 교류에 대해 <br>배웠었는데,',
					voice: 'SSJ610316_28',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '각 나라가 더 잘 만들 수 있는 상품을 생산하고, <br>이를 상호 교류하면 서로 경제적 이익이 생긴대.',
					voice: 'SSJ610316_29',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][4],
							{
								type: 'word',
								answer: [
									['ㅁㅇ'],
									['모양', '무용', '무역'],
									['무역']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[5][6])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[5][5])}
								}
							}
						);
					}
				},
				{ 
					text: '이렇게 나라 간에 물건과 서비스를 사고파는 것을 <br>뭐라고 그럴까?',
					voice: 'SSJ610316_30',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][5]);
					}
				},
				{
					text: '나라와 나라 사이에 물건과 서비스를 사고파는 것을 <br>무역이라고 해.',
					voice: 'SSJ610316_31',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][6]);
					}
				},
				{
					text: '무역을 할 때 다른 나라에 상품을 파는 것을 수출, <br>다른 나라에서 상품을 사 오는 것을 수입이라고 해.',
					voice: 'SSJ610316_32',
					duration: 8000,
					animation: {
						type: 'f',
						duration:8000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
					}
				},
			],
			[ // 6 - 0
				{
					text: '이렇게 무역을 하는 나라들은 서로 도움을 주고받지만 <br>동시에 경쟁 상대가 되기도 해.',
					voice: 'SSJ610316_33',
					duration: 6000,
					animation: {
						type: 'c',
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][1]);
					}
				},
				{
					text: '그래서 무역을 하다 보면 문제가 발생하기도 하고, <br>서로 자기 나라 경제를 보호하려고 하지.',
					voice: 'SSJ610316_34',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][2],
							{
								type: 'word',
								answer: [
									['ㄱㅅ'],
									['겸상', '관세', '군사'],
									['관세']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[6][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[6][3])}
								}
							}
						);
					}
				},
				{
					text: '자기 나라 경제를 보호하는 방법 중, 국외에서 수입하는 <br>물건에 부과하는 세금을 뭐라고 할까?',
					voice: 'SSJ610316_35',
					duration: 6500,
					animation: {
						type: 'd',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][3]);
					}
				},
				{
					text: '국외에서 수입하는 물건에 부과하는 세금을 관세라고 해.',
					voice: 'SSJ610316_36',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][4]);
					}
				},
				{
					text: '관세는 자기 나라의 경제를 보호하는 수단이 될 수 있지만, 자유로운 무역을 방해하기도 해.',
					voice: 'SSJ610316_37',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][5]);
					}
				},
				{
					text: '그래서 서로 의존하는 나라끼리는 \'자유 무역 협정\'이라는 걸 맺어서 관세를 줄이거나 없애기도 하지.',
					voice: 'SSJ610316_38',
					duration: 7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
					}
				},
			],
			[
				{
					text: '벌써 한 학기 내용이 모두 끝났네.',
					voice: 'SSJ610316_39',
					duration: 2500,
					animation: {
						type: 'c',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '나랑 같이 2단원 내용을 정리한 시간이 즐거웠길 바라.',
					voice: 'SSJ610316_40',
					duration: 3500,
					animation: {
						type: 'c',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][2]);
					}
				},
				{
					text: '그럼 다음에 또 만나자~ 안녕!',
					voice: 'SSJ610316_41',
					duration: 3000,
					animation: {
						type: 'b',
						duration:2000
					},
					endBack: function(){
						win[namespace].currentStep = 2;
						
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