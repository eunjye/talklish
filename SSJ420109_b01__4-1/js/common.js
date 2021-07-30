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
				text: '아쉽다~ 다음엔 더 잘해 보자!  ',
				voice: 'SSJ3g_ending_04',
				duration: 4000
			},
		],
		wrongScript: [
			[
				{
					text: '다시 한번 생각해 볼까?',
					voice: 'SSJ3g_A_01',
					duration: 2000
				},
				{
					text: '조금 더 생각해 볼까?',
					voice: 'SSJ3g_A_02',
					duration: 2000
				},
				{
					text: '한 번 더 생각해 보자!',
					voice: 'SSJ3g_A_03',
					duration: 2000
				},
				{
					text: '글쎄, 한 번 더 생각해 볼까?',
					voice: 'SSJ3g_A_04',
					duration: 3000
				},
				{
					text: '아쉬워~ 한 번 더 생각해 봐!',
					voice: 'SSJ3g_A_05',
					duration: 3000
				},
			],
			[
				{
					text: '아쉬워~ 내가 알려 줄게!',
					voice: 'SSJ3g_B_01',
					duration: 3000
				},
				{
					text: '잘 모르겠다면 내가 설명해 줄게!',
					voice: 'SSJ3g_B_02',
					duration: 3000
				},
				{
					text: '어려웠구나! 내가 알려 줄게.',
					voice: 'SSJ3g_B_03',
					duration: 3000
				},
			]
		],
		speak: [
			[
				{
					text: '안녕~ 나는 천재초등학교 4학년 노을이야!',
					voice: 'SSJ420109_01',
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
					text: '오늘은 나와 같이 촌락과 도시의 모습을 살펴보고 오자.',
					voice: 'SSJ420109_02',
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
					text: '우선 촌락부터 구경해 보자고! <br>여기저기 논과 밭이 펼쳐져 있네~',
					voice: 'SSJ420109_03',
					duration:6500,
					animation: {
						type: 'c',
						duration: 6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][1],
							{
								type: 'word',
								answer: [
									['ㄴㅊ'],
									['남촌', '농촌', '내촌'],
									['농촌']
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
					text: '농사짓는 땅을 이용하여 생산 활동을 하는 <br>이곳은 어떤 종류의 촌락일까?',
					voice: 'SSJ420109_04',
					duration:5500,
					animation: {
						type: 'd',
						duration: 5500
					},
					endBack: function(){

					}
				},
				{
					text: '농사짓는 땅을 이용하여 생산 활동을 하는 촌락을 <br>농촌이라고 해.',
					voice: 'SSJ420109_05',
					duration:5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '그런데, 농촌에 사람들이 왜 이렇게 없을까?',
					voice: 'SSJ420109_06',
					duration:4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
						win[namespace].setBgImg('bg_main2');
					}
				},
			],
			[
				{
					text: '게다가 논과 밭에서 일하는 사람들은 <br>노인분들밖에 보이지 않네.',
					voice: 'SSJ420109_07',
					duration:5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][1],
							{
								type: 'word',
								answer: [
									['ㄱㄹㅎ'],
									['공론화', '그룹화', '고령화'],
									['고령화']
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
					text: '전체 인구에서 노인이 차지하는 비율이 높아지는 현상을 <br>뭐라고 하는지 아니? (OOO 현상)',
					voice: 'SSJ420109_08',
					duration:5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
					}
				},
				{
					text: '전체 인구에서 노인이 차지하는 비율이 높아지는 것을 <br>고령화 현상이라고 해.',
					voice: 'SSJ420109_08_1',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][3]);

					}
				},
				{
					text: '고령화 현상으로 촌락에 사는 노인의 인구는 늘어나고, <br>어린이의 수는 줄어들고 있어.',
					voice: 'SSJ420109_09',
					duration:7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '일손 부족의 문제가 심각할 것 같아 걱정이 되긴 하지만,',
					voice: 'SSJ420109_10',
					duration:5000,
					animation: {
						type: 'f', 
						duration:5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][5]);
					}
				},
				{
					text: '최근 다양한 기계를 이용해서 일손 부족 문제를 <br>해결하고 있다고 하니 다행이야.',
					voice: 'SSJ420109_11',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][0]);
						win[namespace].setBgImg('bg_main3');
						// win[namespace].changeBgm(2);
					}
				},
			],
			[
				// idx 3
				{
					text: '저기, 새로 이사를 오는 사람들이 보이네!',
					voice: 'SSJ420109_12',
					duration:3500,
					animation: {
						type: 'c', 
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][1]);
					}
				},
				{
					text: '도시에서 농촌으로 이사를 온 사람들인가 봐. ',
					voice: 'SSJ420109_13',
					duration:2500,
					animation: {
						type: 'c', 
						duration:2500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][2],
							{
								type: 'word',
								answer: [
									['ㄱㅊ'],
									['강촌', '김천', '귀촌'],
									['귀촌']
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
					text: '도시에 살던 사람들이 촌락으로 <br>삶의 터전을 옮기는 것을 뭐라고 할까?',
					voice: 'SSJ420109_14',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){

					}
				},
				{
					text: '도시에 살던 사람들이 촌락으로 삶의 터전을 옮기는 것을 <br>귀촌이라고 해.',
					voice: 'SSJ420109_15',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][4]);
					}
				},
				{
					text: '귀촌을 하려는 사람들이 촌락에 잘 적응하며 살 수 <br>있도록 지역 사회의 적극적인 지원이 필요할 것 같아.',
					voice: 'SSJ420109_16',
					duration: 8500,
					animation: {
						type: 'f',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][0]);
						win[namespace].setBgImg('bg_main4');
						win[namespace].changeBgm(2);
					}
				},
			],
			[
				{
					text: '이제 도시를 둘러볼 차례야!',
					voice: 'SSJ420109_17',
					duration: 2500,
					animation: {
						type: 'c',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][1]);
					}
				},
				{
					text: '사람도 많고, 높은 건물도 많고, 교통 시설들도 많네!',
					voice: 'SSJ420109_18',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][2]);
					}
				},
				{
					text: '도시는 주로 교통이 발달하여 <br>사람과 물건 이동이 편리한 곳에 위치해.',
					voice: 'SSJ420109_19',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
					}
				},
				{
					text: '그런데, 처음부터 계획하여 만들어진 도시도 있다고 하네?',
					voice: 'SSJ420109_20',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(
							win[namespace].speak[4][4],
							{
								type: 'word',
								answer: [
									['ㅅㅈㅌㅂㅈㅊㅅ'],
									['순조특별자치시', '세종특별자치시', '숙종특별자치시'],
									['세종특별자치시']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[4][6])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[4][5])}
								}
							}
						);
					}
				},
				{
					text: '행정의 중심지로 새롭게 계획하여 만든 <br>도시의 이름이 뭐였더라?',
					voice: 'SSJ420109_21',
					duration: 4500,
					animation: {
						type: 'd',
						duration:4500
					},
					endBack: function(){
					}
				},
				{
					text: '행정의 중심지로 새롭게 계획해서 만든 도시의 이름은 <br>세종특별자치시야.',
					voice: 'SSJ420109_22',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][6]);
					}
				},
				{
					text: '이름만큼 특별한 도시인 것 같네!',
					voice: 'SSJ420109_23',
					duration: 2500,
					animation: {
						type: 'f',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][0]);
						win[namespace].setBgImg('bg_main5');
					}
				},
			],
			[
				{
					text: '그런데, 촌락과 도시는 서로 도움을 주고받으며 <br>발전한다는 사실 알고 있니?',
					voice: 'SSJ420109_24',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(
							win[namespace].speak[5][1],
							{
								type: 'word',
								answer: [
									['ㄱㄹ'],
									['권리', '관람', '교류'],
									['교류']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[5][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[5][2])}
								}
							}
						);
					}
				},
				{ 
					text: '사람들이 오고 가거나 물건, 문화, 기술 등을 <br>서로 주고받는 것을 뭐라고 하더라?',
					voice: 'SSJ420109_25',
					duration: 6500,
					animation: {
						type: 'd',
						duration:6500
					},
					endBack: function(){

					}
				},
				{
					text: '사람들이 오고 가거나 물건, 문화, 기술 등을 <br>서로 주고받는 것을 교류라고 해.',
					voice: 'SSJ420109_26',
					duration: 7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '지역마다 생산물, 기술, 문화 등이 다르기 때문에 <br>교류가 이루어지게 돼.',
					voice: 'SSJ420109_27',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
						win[namespace].setBgImg('bg_main6');
					}
				},
			],
			[ // 6 - 0
				{
					text: '마침 저기 농산물 직거래 장터가 보이네! 한번 가 보자.',
					voice: 'SSJ420109_28',
					duration: 5000,
					animation: {
						type: 'c',
						duration:5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][1]);
					}
				},
				{
					text: '도시 사람들은 믿을 수 있는 <br>싱싱한 농산물을 싸게 구매하고',
					voice: 'SSJ420109_29',
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
					text: '촌락 사람들은 농산물을 제값을 받고 팔면서, <br>서로 도움을 주고받고 있구나.',
					voice: 'SSJ420109_30',
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
									['ㅅㅎ ㅇㅈ'],
									['상호 억제', '상호 의존', '상호 인정'],
									['상호 의존']
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
					text: '교류하는 촌락과 도시의 관계를 나타내는 말로, <br>서로 돕고 교류하며 의지하는 것을 뭐라고 하지?',
					voice: 'SSJ420109_31',
					duration: 8500,
					animation: {
						type: 'd',
						duration:8500
					},
					endBack: function(){
						
					}
				},
				{
					text: '서로 돕고 교류하며 의지하는 것을 상호 의존이라고 해.',
					voice: 'SSJ420109_32',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][5]);
					}
				},
				{
					text: '촌락과 도시에 사는 사람들은 서로 부족한 것들을 교류를 통해 채워 주면서 상호 의존하고 있다는 점 잊지 말자!',
					voice: 'SSJ420109_33',
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
					text: '벌써 집에 갈 시간이네! <br>오늘 정말 알찬 하루를 보낸 것 같아.',
					voice: 'SSJ420109_34',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '그럼 다음에 또 만나서 이야기 나누자! 안녕~',
					voice: 'SSJ420109_35',
					duration: 4500,
					animation: {
						type: 'b',
						duration:4500
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