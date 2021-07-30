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
			return Math.floor(Math.random() * (max - min + 1)) + min; 
		},
		/**
		 * @name goToNPage
		 * @param {Number} targetIndex 
		 * @param {HTMLElement} $evtEl 
		 */
		goPage: function(targetIndex, $evtEl, callback){
			var $targetPage = document.querySelector('[data-index="' + targetIndex + '"]');

			if (targetIndex !== 1 && !!$targetPage.getAttribute('data-bgm')) {
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

					if (!!$targetPage.getAttribute('data-bgm')) {
						win[namespace].soundStatus('play', 'bgm', $targetPage.getAttribute('data-bgm'));
					}
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
				setTimeout(function(){
					win[namespace].askQuestion(win[namespace].speak[0][0]);
				}, 700);
				win[namespace].soundStatus('play', 'bgm', 'bgm_01');
			} else if (targetStep === 2){
				win[namespace].askQuestion(win[namespace].speak[4][0]);
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
		changeBgm: function(type){
			clearTimeout(win[namespace].willTimer);
			document.querySelector('.question-area').style.display = 'none';
			document.querySelector('.btn-voice').style.display = 'none';
			var bgmStatus = win[namespace].currentBgmStatus.status;
			win[namespace].soundStatus('play', 'bgm', 'bgm_0'+type);
			if (bgmStatus !== 'play'){
				win[namespace].soundStatus('stop', 'bgm');
				document.querySelector('.btn-audio').classList.add('off');
			}
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
		currentVoiceStatus: false,
		soundStatus: function(status, type, name, callback){
			if (win[namespace].currentBgmStatus.status === status && win[namespace].currentBgmStatus.name === name && name !== 'bgm_intro') { return false; }
			var soundType = type;
			var $audio;
			var audio;

			if (type === 'wrong' || type === 'script') {
				soundType = 'script';
				win[namespace].currentVoiceStatus = false;
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
				
				audio = new Audio($audio.attributes.src.nodeValue);
				audio.addEventListener('canplaythrough', function(){
					win[namespace].currentVoiceStatus = true;
					$audio.play();
					if (win[namespace].currentBgmStatus.status === 'stop' && type === 'bgm'){
						$audio.pause();
						audio.pause();
					}
				})

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

			

			// 질문이 있을때는 checkAnswer로 넘어감
			clearTimeout(win[namespace].willTimer);
			if (question === undefined){
				win[namespace].animationStatus('play', animationSpec.type, animationSpec.duration, 
					function(){
						win[namespace].soundStatus('play', 'script', voice, fnEndBack);
					}, true);
			} else {
				win[namespace].animationStatus('play', animationSpec.type, animationSpec.duration, 
					function(){
						win[namespace].soundStatus('play', 'script', voice);
						win[namespace].checkAnswer(script, question, question.resultBack);
					}, true);
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
			if (win[namespace].checkAnswerTry < 3) {
				win[namespace].checkAnswerTry++;
			} else {
				win[namespace].checkAnswerTry = 1;
			}

			
			var motionIndex = win[namespace].getRandomInt(1, 2);
			win[namespace].animationStatus('play', 'e'+motionIndex, duration, function(){
				win[namespace].soundStatus('play', 'wrong', voice);
			}, true);

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
				if (question.type === 'ox' && question.guideVoice !== undefined) {
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
			if (question.noTextLength === undefined) {
				setInitialAnswer(answerText, true);
			} else {
				setInitialAnswer(false, true);
			}

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
										}, true);
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
									}, true);
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

				if (!!initial) {
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
				} else {
					resultHTML = '';
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
				voice: 'SSJ3b_ending_01',
				duration: 4000
			},
			{
				text: '잘했어! 열심히 공부하고 있구나.',
				voice: 'SSJ3b_ending_02',
				duration: 4000
			},
			{
				text: '다음번엔 더 잘할 수 있을 거야.',
				voice: 'SSJ3b_ending_03',
				duration: 3000
			},
			{
				text: '아쉽다~ 다음엔 더 잘해 보자!  ',
				voice: 'SSJ3b_ending_04',
				duration: 4000
			},
		],
		wrongScript: [
			[
				{
					text: '다시 한번 생각해 보자!',
					voice: 'SSJ3b_A_01',
					duration: 2000
				},
				{
					text: '조금 더 생각해 보자!',
					voice: 'SSJ3b_A_02',
					duration: 2000
				},
				{
					text: '한 번 더 생각해 볼까?',
					voice: 'SSJ3b_A_03',
					duration: 2200
				},
				{
					text: '글쎄, 한 번 더 생각해 봐!',
					voice: 'SSJ3b_A_04',
					duration: 2700
				},
				{
					text: '아쉬워~ 한 번 더 생각해 볼까?',
					voice: 'SSJ3b_A_05',
					duration: 3400
				},
			],
			[
				{
					text: '아쉬워~ 내가 설명해 줄게!',
					voice: 'SSJ3b_B_01',
					duration: 2900
				},
				{
					text: '잘 모르겠다면 내가 알려 줄게!',
					voice: 'SSJ3b_B_02',
					duration: 3500
				},
				{
					text: '어려웠구나! 내가 알려 줄게.',
					voice: 'SSJ3b_B_03',
					duration: 3200
				},
			]
		],
		speak: [
			[
				{
					text: '안녕! 나는 천재초등학교 3학년 1반 하늘이야~',
					voice: 'SSJ320110_01',
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
					text: '우리 고장에 놀러 온 걸 환영해. ',
					voice: 'SSJ320110_02',
					duration:2500,
					animation: {
						type: 'b',
						duration: 2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				},
			],
			[
				{
					text: '우리 고장에는 이렇게 넓은 논과 밭이 펼쳐져 있어.',
					voice: 'SSJ320110_03',
					duration:4500,
					animation: {
						type: 'c',
						duration: 4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][1],
							{
								type: 'ox',
								answer: '인문 환경',
								guideDuration: 4500,
								// noTextLength: true,
								guideVoice: 'SSJ320110_05',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[1][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[1][2])}
								}
							}
						);
					}
				},
				{
					text: '논과 밭, 과수원, 도로와 같이 사람들이 만든 환경을 <br>무슨 환경이라고 부르는지 아니?',
					voice: 'SSJ320110_04',
					duration:7500,
					animation: {
						type: 'd',
						duration: 14000
					},
					endBack: function(){

					}
				},
				{
					text: '논과 밭, 과수원과 같이 사람들이 만든 환경을 <br>인문 환경이라고 불러.',
					voice: 'SSJ320110_06',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '우리 고장 사람들은 이 논과 밭에서 <br>농사를 지으면서 살아가고 있어.',
					voice: 'SSJ320110_07',
					duration:5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
						win[namespace].setBgImg('bg_main2');
					}
				},
			],
			[
				{
					text: '저길 좀 봐! 추수가 한창이야.',
					voice: 'SSJ320110_08',
					duration:2500,
					animation: {
						type: 'c',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][1]);
					}
				},
				{
					text: '사람들의 생활 모습이 계절에 따라 <br>달라진다는 것 알고 있지?',
					voice: 'SSJ320110_09',
					duration:4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][2],
							{
								type: 'word',
								answer: [
									['ㄱㅇ'],
									['가을', '겨울', '곡우'],
									['가을']
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
					text: '논과 밭에서 곡식이나 열매를 수확하는 <br>지금은 어떤 계절일까?',
					voice: 'SSJ320110_10',
					duration:5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){

					}
				},
				{
					text: '논과 밭에서 곡식이나 열매를 수확하는 계절은 가을이지.',
					voice: 'SSJ320110_11',
					duration:4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '가을에만 볼 수 있는 정말 멋진 풍경이야.',
					voice: 'SSJ320110_12',
					duration:3500,
					animation: {
						type: 'f', 
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][0]);
						win[namespace].setBgImg('bg_main3');
						win[namespace].changeBgm(2);
					}
				},
			],
			[
				// idx 3
				{
					text: '여긴 우리 동네의 유명한 하천이야. <br>강변을 따라 산책을 하는 사람들이 있네.',
					voice: 'SSJ320110_13',
					duration:7000,
					animation: {
						type: 'c', 
						duration:7000
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][1],
							{
								type: 'word',
								answer: [
									['ㅇㄱ'],
									['연구', '여가', '일기'],
									['여가']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[3][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[3][2])}
								}
							}
						);
					}
				},
				{
					text: '이렇게 스스로 즐거움을 얻고자 남는 시간에 하는 <br>자유로운 활동을 뭐라고 할까? (OO 생활)',
					voice: 'SSJ320110_14',
					duration: 6500,
					animation: {
						type: 'd',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][2]);
					}
				},
				{
					text: '스스로 즐거움을 얻고자 남는 시간에 하는 <br>자유로운 활동을 여가 생활이라고 해.',
					voice: 'SSJ320110_15',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '사람들은 주로 자신이 살고 있는 고장의 환경을 이용해 <br>여가 생활을 즐기지!',
					voice: 'SSJ320110_16',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][0]);
						win[namespace].setBgImg('bg_main4');
						win[namespace].changeBgm(1);
					}
				},
			],
			[
				{
					text: '이제 저녁이 되니 조금 추워지는걸? <br>배도 좀 고픈 것 같고... 슬슬 집에 돌아가서 쉴 시간이네.',
					voice: 'SSJ320110_17',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][1]);
					}
				},
				{
					text: '역시, 사람이 살아가려면 <br>몸을 보호하는 옷, 영양분을 얻기 위한 음식,',
					voice: 'SSJ320110_18',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][2]);
					}
				},
				{
					text: '그리고 안전하고 편안하게 쉴 수 있는 집이 필요한가 봐.',
					voice: 'SSJ320110_19',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(
							win[namespace].speak[4][3],
							{
								type: 'word',
								answer: [
									['ㅇㅅㅈ'],
									['음식점', '원산지', '의식주'],
									['의식주']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[4][5])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[4][4])}
								}
							}
						);
					}
				},
				{
					text: '이와 같이 옷, 음식, 집을 통틀어 이르는 말이 뭐더라?',
					voice: 'SSJ320110_20',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][4]);
					}
				},
				{
					text: '옷, 음식, 집을 통틀어 이르는 말을 의식주라고 해.',
					voice: 'SSJ320110_21',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][5]);
					}
				},
				{
					text: '우리가 살아가는데 꼭 필요한 것들을 이르는 말이니 <br>기억해 두자!',
					voice: 'SSJ320110_22',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][0]);
						win[namespace].setBgImg('bg_main5');
					}
				},
			],
			[
				{
					text: '그런데, 고장의 환경에 따라 옷, 음식, 집의 모습도 <br>달라진다는 점 알고 있니?',
					voice: 'SSJ320110_23',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{ 
					text: '지난 방학 때 가족들과 덥고 비가 많이 내려 <br>습한 고장으로 해외여행을 다녀왔는데',
					voice: 'SSJ320110_24',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][2],
							{
								type: 'ox',
								answer: '열대 과일',
								// guideDuration: 2500,
								noTextLength: true,
								// guideVoice: 'SSJ320110_25',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[5][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[5][3])}
								}
							}
						);
					}
				},
				{
					text: '여행을 하면서, 열대 과일, 생선, 치즈 중에서, <br>내가 제일 많이 먹은 음식이 뭐였~게?',
					voice: 'SSJ320110_25',
					duration: 7500,
					animation: {
						type: 'd',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '정답은 열대 과일이야~!',
					voice: 'SSJ320110_25_1',
					duration: 2500,
					animation: {
						type: 'f',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][4]);
					}
				},
				{
					text: '날씨가 덥고 습한 고장에서는 파인애플, 바나나, <br>망고와 같은 열대 과일을 이용한 음식이 많아.',
					voice: 'SSJ320110_26',
					duration: 7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][5]);
					}
				},
				{
					text: '그리고, 바람이 잘 통하는 긴 옷을 입고 <br>챙이 넓은 모자를 쓰고 있는 사람들도 많이 볼 수 있었지.',
					voice: 'SSJ320110_27',
					duration: 7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
						win[namespace].setBgImg('bg_main6');
					}
				},
			],
			[ // 6 - 0
				{
					text: '자, 이제 고장의 환경에 따라 <br>집의 모양도 달라진다는 걸 보여 줄게.',
					voice: 'SSJ320110_28',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][1]);
					}
				},
				{
					text: '여긴 과거 우리 고장 사람들이 살았던 <br>집의 모양이 남아있는 곳이야.',
					voice: 'SSJ320110_29',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][2]);
					}
				},
				{
					text: '우리 고장은 여름철에 홍수로 <br>집이 물에 잠길 위험이 있었거든.',
					voice: 'SSJ320110_30',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][3],
							{
								type: 'word',
								answer: [
									['ㅌㄷㅇㅈ'],
									['터다운집', '터돋움집', '터듬이집'],
									['터돋움집']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[6][5])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[6][4])}
								}
							}
						);
					}
				},
				{
					text: '그래서 이렇게 땅 위에 터를 돋우어 높은 곳에 <br>집을 지었어. 이러한 집을 뭐라고 하는지 아니?',
					voice: 'SSJ320110_31',
					duration: 8500,
					animation: {
						type: 'd',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][4]);
					}
				},
				{
					text: '여름철 홍수로 집이 물에 잠길 위험 때문에 땅 위에 <br>터를 돋우어 높은 곳에 지은 집을 터돋움집이라고 해.',
					voice: 'SSJ320110_32',
					duration: 9500,
					animation: {
						type: 'f',
						duration:9500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][5]);
					}
				},
				{
					text: '그래. 고장의 환경에 따라 의생활, 식생활, 주생활이 <br>다양하게 나타난다는 점, 오늘 확실하게 배웠네!',
					voice: 'SSJ320110_33',
					duration: 9500,
					animation: {
						type: 'f',
						duration:9500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
					}
				},
			],
			[
				{
					text: '이제 시간이 늦었으니, 집에 가서 푹 쉬도록 하자!',
					voice: 'SSJ320110_34',
					duration: 4000,
					animation: {
						type: 'c',
						duration:4000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '그럼 다음에 또 만나! 안녕~',
					voice: 'SSJ320110_35',
					duration: 3500,
					animation: {
						type: 'b',
						duration:3500
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