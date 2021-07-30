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
				text: '아쉽다~ 다음엔 더 잘해 보자!  ',
				voice: 'SSJ5b_ending_04',
				duration: 4000
			},
		],
		wrongScript: [
			[
				{
					text: '다시 한번 생각해 보자!',
					voice: 'SSJ5b_A_01',
					duration: 1500
				},
				{
					text: '조금 더 생각해 보자!',
					voice: 'SSJ5b_A_02',
					duration: 1300
				},
				{
					text: '한 번 더 생각해 볼까?',
					voice: 'SSJ5b_A_03',
					duration: 1500
				},
				{
					text: '글쎄, 한 번 더 생각해 봐!',
					voice: 'SSJ5b_A_04',
					duration: 2500
				},
				{
					text: '아쉬워~ 한 번 더 생각해 볼까?',
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
					text: '잘 모르겠다면 내가 알려 줄게!',
					voice: 'SSJ5b_B_02',
					duration: 2500
				},
				{
					text: '어려웠구나! 내가 알려 줄게.',
					voice: 'SSJ5b_B_03',
					duration: 3000
				},
			]
		],
		speak: [
			[
				{
					text: '안녕? 나는 천재초등학교 5학년 1반 우주라고 해!',
					voice: 'SSJ520117_01',
					duration:4500,
					animation: {
						type: 'b',
						duration: 4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				},
			],
			[
				{
					text: '나는 요즘 우리나라의 역사에 푹 빠져있어.',
					voice: 'SSJ520117_03',
					duration:4000,
					animation: {
						type: 'c',
						duration: 4000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][1]);
					}
				},
				{
					text: '그래서 옛사람들의 삶과 문화를 알아보기 위해 <br>이곳 박물관에 와 있지!',
					voice: 'SSJ520117_04',
					duration:5500,
					animation: {
						type: 'c',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][2]);

					}
				},
				{
					text: '내가 널 위해 해설사가 되어 줄게. 날 따라와 봐~',
					voice: 'SSJ520117_05',
					duration:4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '음… 먼저 청동기 시대 전시실을 살펴볼까?',
					voice: 'SSJ520117_06',
					duration:4000,
					animation: {
						type: 'c',
						duration:4000
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][4],
							{
								type: 'word',
								answer: [
									['ㄱㅈㅅ'],
									['국제선', '고조선', '간조선'],
									['고조선']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[1][6])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[1][5])}
								}
							}
						);
					}
				},
				{
					text: '청동기 시대에 세워진 우리나라 최초의 국가를 <br>알고 있니?',
					voice: 'SSJ520117_07',
					duration:3500,
					animation: {
						type: 'd',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][5]);
					}
				},
				{
					text: '청동기 시대에 세워진 우리나라 최초의 국가는 <br>고조선이야.',
					voice: 'SSJ520117_07_1',
					duration:4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][6]);
					}
				},
				{
					text: '단군왕검이 세운 우리나라 최초의 국가 고조선은<br>우수한 청동기 문화를 바탕으로 성장했어.',
					voice: 'SSJ520117_08',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][7]);
					}
				},
				{
					text: '뒤에 보이는 미송리식 토기, 비파형 동검 등이 <br>모두 고조선의 문화유산들이지.',
					voice: 'SSJ520117_09',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
						win[namespace].setBgImg('bg_main2');
					}
				},
			],
			[
				{
					text: '여기는 세 국가로 나뉘어 전시되어 있는 걸 보니 <br>삼국 시대 전시실인가 봐.',
					voice: 'SSJ520117_10',
					duration:5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){


						win[namespace].askQuestion(win[namespace].speak[2][1]);

					}
				},
				{
					text: '주몽이 세운 고구려, 온조가 세운 백제, 그리고 또…',
					voice: 'SSJ520117_11',
					duration:5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][2],
							{
								type: 'word',
								answer: [
									['ㅅㄹ'],
									['사림', '승려', '신라'],
									['신라']
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
					text: '박혁거세가 세우고, 문무왕 때 고대 삼국을 통일한 <br>이 나라는 어디더라?',
					voice: 'SSJ520117_12',
					duration:5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){

					}
				},
				{
					text: '박혁거세가 세우고, 문무왕 때 고대 삼국을 통일한 <br>나라의 이름은 신라야.',
					voice: 'SSJ520117_12_1',
					duration:5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '신라는 한반도에 있던 여러 나라를 처음으로 통일했어.',
					voice: 'SSJ520117_13',
					duration:4500,
					animation: {
						type: 'f', 
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][5]);
					}
				},
				{
					text: '이번엔 후삼국을 통일한 고려의 전시실로 가 보자!',
					voice: 'SSJ520117_14',
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
					text: '고려는 송악의 호족 출신인 <br>왕건이 세운 나라인 건 알고 있지?',
					voice: 'SSJ520117_15',
					duration:4500,
					animation: {
						type: 'c', 
						duration:4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][1],
							{
								type: 'ox',
								answer: '북쪽',
								guideDuration: 3500,
								// noTextLength: true,
								guideVoice: 'SSJ520117_17',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[3][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[3][2])}
								}
							}
						);
					}
				},
				{
					text: '왕건은 남쪽과 북쪽 중 어느 방향으로 <br>영토를 넓히고자 했는지, 혹시 알아?',
					voice: 'SSJ520117_16',
					duration:6500,
					animation: {
						type: 'd', 
						duration:11000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][2]);
					}
				},
				{
					text: '왕건은 북쪽으로 영토를 넓혀 나갔어.',
					voice: 'SSJ520117_17_1',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '고구려를 계승하고자 했던 왕건은 <br>북진 정책을 펼쳐서 북쪽으로 영토를 넓혀 나갔어.',
					voice: 'SSJ520117_18',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][0]);
						win[namespace].setBgImg('bg_main4');
					}
				},
			],
			[
				{
					text: '그럼 우리 이제 고려를 대표하는 문화유산들을 <br>구경해 볼까?',
					voice: 'SSJ520117_19',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][1]);
					}
				},
				{
					text: '우와~ 여기 푸른 도자기들 좀 봐. 정말 아름답다~!',
					voice: 'SSJ520117_20',
					duration: 4500,
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
									['ㅅㄱ'],
									['상감', '실감', '소금'],
									['상감']
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
					text: '이 청자들은 고려만의 독창적인 기법을 사용해 만들어진 <br>예술품이래. 어떤 기법일까? (OO 기법)',
					voice: 'SSJ520117_21',
					duration: 6500,
					animation: {
						type: 'd',
						duration:6500
					},
					endBack: function(){
					}
				},
				{
					text: '이 청자들은 상감 기법으로 만들어졌어.',
					voice: 'SSJ520117_21_1',
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
					text: '상감 기법을 사용해 만들어진 고려청자를 통해 <br>당시 귀족들의 화려한 문화를 엿볼 수 있어.',
					voice: 'SSJ520117_22',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][5]);
					}
				},
				{
					text: '자, 우리 이번엔 밖으로 한번 나가 보는 게 어때~?',
					voice: 'SSJ520117_23',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][0]);
						win[namespace].setBgImg('bg_main5');
						win[namespace].changeBgm(1);
					}
				},
			],
			[
				{
					text: '짜잔~ 이 발명품들은 모두 조선 시대의 한 왕이 <br>학자들과 함께 만든 과학 기구들이야.',
					voice: 'SSJ520117_24',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(
							win[namespace].speak[5][1],
							{
								type: 'word',
								answer: [
									['ㅅㅈ'],
									['사장', '세종', '수지'],
									['세종']
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
					text: '우리에게는 훈민정음을 창제한 왕으로 잘 알려진 <br>이 사람은 누구일까?',
					voice: 'SSJ520117_25',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){

					}
				},
				{
					text: '훈민정음을 창제한 왕의 이름은 세종이야.',
					voice: 'SSJ520117_25_1',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '세종은 백성의 생활에 도움이 되는 글자와 책, <br>과학 기구를 만드는 데 힘썼어.',
					voice: 'SSJ520117_26',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][4]);
					}
				},
				{
					text: '백성이 나라의 근본이며, 백성이 잘 사는 것이 <br>나라가 좋아지는 길이라고 생각했기 때문이야.',
					voice: 'SSJ520117_27',
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
					text: '이번에는 조선이 건국 200년 만에 맞은 위기 상황과 <br>극복 과정을 알아보려고 해.',
					voice: 'SSJ520117_28',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][1],
							{
								type: 'word',
								answer: [
									['ㅇㅈㅇㄹ'],
									['임진왜란', '인정왜란', '왕자왜란'],
									['임진왜란']
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
					text: '뒤에 보이는 저 커다란 배와 관련 있는 사건이야. <br>뭔지 알겠니~?',
					voice: 'SSJ520117_29',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
					}
				},
				{
					text: '바로 일본을 통일한 도요토미 히데요시가 일으킨 <br>임진왜란이야.',
					voice: 'SSJ520117_29_1',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][3]);
					}
				},
				{
					text: '일본은 조선을 정복하고자 수많은 군대를 이끌고 침략해 <br>임진왜란을 일으켰어.',
					voice: 'SSJ520117_30',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][4]);
						
					}
				},
				{
					text: '하지만 육지에서는 관군들이, 바다에서는 수군들이 <br>나라를 지키기 위해 노력했지.',
					voice: 'SSJ520117_31',
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
					text: '특히 이순신 장군이 이끌었던 수군은 <br>저 거북선을 이용해 일본군을 크게 무찔렀어.',
					voice: 'SSJ520117_32',
					duration: 7000,
					animation: {
						type: 'f',
						duration:7000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][6]);
					}
				},
				{
					text: '나라를 지키려는 우리 선조들의 활약이 정말 대단하지~?',
					voice: 'SSJ520117_33',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
					}
				},
			],
			[
				{
					text: '자! 오늘 나의 박물관 해설은 여기까지야~',
					voice: 'SSJ520117_34',
					duration: 3500,
					animation: {
						type: 'c',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '우리나라의 역사와 관련된 여러 가지 문화유산들을 <br>직접 보니 어땠어~?',
					voice: 'SSJ520117_35',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][2]);
					}
				},
				{
					text: '사회 시간에 배운 내용들을 잊어버리지 않을 수 있겠지?',
					voice: 'SSJ520117_36',
					duration: 3500,
					animation: {
						type: 'c',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][3]);
					}
				},
				{
					text: '그럼 우리 다음에 또 만나서 이야기 나누자. 안녕~',
					voice: 'SSJ520117_37',
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