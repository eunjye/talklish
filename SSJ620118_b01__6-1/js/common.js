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
					text: '안녕? 나는 천재초등학교에 다니고 있는 우주라고 해!',
					voice: 'SSJ620118_01',
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
					text: '나는 요즘 세계 여러 나라들에 대한 공부에 푹 빠져있어.',
					voice: 'SSJ620118_02',
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
					text: '그래서 부모님께서 생일 선물로 <br>세계 지도와 지구본을 사주셨어~야호!',
					voice: 'SSJ620118_03',
					duration:6500,
					animation: {
						type: 'c',
						duration: 6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][1]);
					}
				},
				{
					text: '세계 지도는 둥근 지구를 평면으로 나타낸 것으로, <br>세계 여러 나라의 위치와 영역을 한눈에 살펴볼 수 있지!',
					voice: 'SSJ620118_04',
					duration:8500,
					animation: {
						type: 'c',
						duration: 8500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][2],
							{
								type: 'ox',
								answer: '달라',
								guideDuration: 3500,
								// noTextLength: true,
								guideVoice: 'SSJ620118_06',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[1][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[1][3])}
								}
							}
						);

					}
				},
				{
					text: '그런데, 세계 지도에 나타난 모습은, <br>실제 모습과 같을까, 다를까?',
					voice: 'SSJ620118_05',
					duration:6500,
					animation: {
						type: 'd',
						duration:11000
					},
					endBack: function(){
						
					}
				},
				{
					text: '세계 지도에서는 나라와 바다의 모양, 거리가 <br>실제와는 다르게 표현되고 있어.',
					voice: 'SSJ620118_07',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][4]);
					}
				},
				{
					text: '세계 지도는 둥근 지구를 평면으로 나타낸 것이기 때문에 <br>실제 모습과 다른 점이 있음을 주의하자.',
					voice: 'SSJ620118_08',
					duration:7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][5]);
					}
				},
				{
					text: '반면에, 오른쪽에 있는 이 지구본은, <br>지구의 실제 모습과 비슷하지!',
					voice: 'SSJ620118_09',
					duration:5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][6]);
					}
				},
				{
					text: '다만 전 세계의 모습을 한눈에 보기에는 어렵고, <br>가지고 다니기 불편하다는 단점이 있어.',
					voice: 'SSJ620118_10',
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
					text: '자! 그럼 세계의 여러 대륙과 대양에 대해 더 알아볼까?',
					voice: 'SSJ620118_11',
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
					text: '대륙은 바다로 둘러싸인 큰 땅덩어리야. 아시아, 유럽, <br>아프리카, 북아메리카, 남아메리카, 오세아니아가 있지.',
					voice: 'SSJ620118_12',
					duration:10500,
					animation: {
						type: 'c',
						duration:10500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][2]);
					}
				},
				{
					text: '대양은 큰 바다를 말해.',
					voice: 'SSJ620118_13',
					duration:2500,
					animation: {
						type: 'c',
						duration:2500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][3],
							{
								type: 'word',
								answer: [
									['ㅌㅍㅇ'],
									['투표율', '태평양', '특파원'],
									['태평양']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[2][5])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[2][4])}
								}
							}
						);

					}
				},
				{
					text: '아시아, 오세아니아, 아메리카 등의 대륙 사이에 있는, <br>우리나라와 인접해 있는 바다의 이름이 뭘까?',
					voice: 'SSJ620118_14',
					duration:7500,
					animation: {
						type: 'd',
						duration:7500
					},
					endBack: function(){
						
					}
				},
				{
					text: '아시아, 오세아니아, 아메리카 등의 대륙 사이에 있는 <br>바다의 이름은 태평양이야.',
					voice: 'SSJ620118_15',
					duration:6500,
					animation: {
						type: 'f', 
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][5]);
					}
				},
				{
					text: '대양에는 그 밖에도 대서양, 인도양, <br>북극해, 남극해도 있으니 잊지 마~',
					voice: 'SSJ620118_16',
					duration:7500,
					animation: {
						type: 'f',
						duration:7500
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
					text: '벌써 내가 제일 좋아하는 세계 여행 프로그램이 <br>방영할 시간이 되었네, 같이 보자!',
					voice: 'SSJ620118_17',
					duration:6000,
					animation: {
						type: 'c', 
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][1]);
					}
				},
				{
					text: '우와! 저긴 어딜까? 사막이 정말 넓게 펼쳐져 있네.',
					voice: 'SSJ620118_18',
					duration:4500,
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
									['ㄱㅈ ㄱㅎ'],
									['고장 기후', '극지 기후', '건조 기후'],
									['건조 기후']
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
					text: '강수량이 매우 적어 사막이 널리 나타나는 <br>이곳은 어떤 기후 지역일까?',
					voice: 'SSJ620118_19',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){

					}
				},
				{
					text: '강수량이 매우 적어 사막이 널리 나타나는 곳은 <br>건조 기후 지역이야.',
					voice: 'SSJ620118_20',
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
					text: '사막 지역의 사람들은 오아시스나 나일강과 같은 <br>강 주변에서 농사를 지으며 살아가지.',
					voice: 'SSJ620118_21',
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
					text: '오, 이번에는 한대 기후 지역을 소개해 주고 있네!',
					voice: 'SSJ620118_22',
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
					text: '한대 기후 지역은 고위도 지역에 주로 나타나. <br>평균 기온이 낮아서 땅속이 계속 얼어있는 것이 특징이지.',
					voice: 'SSJ620118_23',
					duration: 8500,
					animation: {
						type: 'c',
						duration:8500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(
							win[namespace].speak[4][2],
							{
								type: 'word',
								answer: [
									['ㅇㅁ'],
									['이목', '우물', '유목'],
									['유목']
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
					text: '여름에 얼음이 녹아 이끼나 풀이 자라는 땅에서 <br>순록을 기르는 것을 무엇이라고 하는지 아니? (OO 생활)',
					voice: 'SSJ620118_24',
					duration: 6500,
					animation: {
						type: 'd',
						duration:6500
					},
					endBack: function(){
						
					}
				},
				{
					text: '여름에 얼음이 녹아 이끼나 풀이 자라는 땅에서 <br>순록을 기르는 것을 유목 생활이라고 해.',
					voice: 'SSJ620118_25',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][4]);
					}
				},
				{
					text: '최근에는 한대 기후 지역의 자연환경을 연구하려고 <br>여러 나라가 연구소나 기지를 세우고 있어.',
					voice: 'SSJ620118_26',
					duration: 7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][5]);
					}
				},
				{
					text: '우리나라도 남극 지방에 <br>세종 과학 기지와 장보고 과학 기지,',
					voice: 'SSJ620118_27',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][6]);
					}
				},
				{
					text: '북극 지방에 다산 과학 기지를 세워 <br>극지방의 자연환경 연구에 힘을 쏟고 있지!',
					voice: 'SSJ620118_28',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][7]);
					}
				},
				{
					text: '자 그럼, 계속 집에만 있었으니 <br>이번엔 밖으로 나가 보자고!',
					voice: 'SSJ620118_29',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
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
					text: '짜잔! 이곳은 세계 여러 나라 사람들의 다양한 문화와 <br>생활 모습을 전시해 놓은 다문화 박물관이야!',
					voice: 'SSJ620118_30',
					duration: 8500,
					animation: {
						type: 'c',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{ 
					text: '여기 인도 여성의 전통 복장인 사리가 있네! <br>사리는 한 장의 천으로 만들어진 옷이래.',
					voice: 'SSJ620118_31',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){

						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(
							win[namespace].speak[5][2],
							{
								type: 'word',
								answer: [
									['ㅎㄷㄱ'],
									['힌두교', '환등교', '횡단교'],
									['힌두교']
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
					text: '옷감을 자르거나 바느질하는 것을 바람직하지 않게 <br>여기는 이 종교 때문이라는데, 이름이 뭐더라?',
					voice: 'SSJ620118_32',
					duration: 7500,
					animation: {
						type: 'd',
						duration:7500
					},
					endBack: function(){
						
					}
				},
				{
					text: '힌두교에서는 옷감을 자르거나 바느질하는 것을 <br>바람직하지 않게 여긴다고 해.',
					voice: 'SSJ620118_33',
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
					text: '세계 각 지역 사람들의 생활 모습은 정말 다양하구나!',
					voice: 'SSJ620118_34',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
						win[namespace].setBgImg('bg_main6');
					}
				},
			],
			[ // 6 - 0
				{
					text: '그럼 이제 마지막으로 우리나라와 가까운 나라들인 <br>중국, 일본, 러시아에 대해 알아보러 가자.',
					voice: 'SSJ620118_35',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][1]);
					}
				},
				{
					text: '여기, 식생활 문화가 전시되어 있네!',
					voice: 'SSJ620118_36',
					duration: 2500,
					animation: {
						type: 'c',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][2]);
					}
				},
				{
					text: '우리나라와 중국, 일본은 젓가락을 주로 사용하고, <br>러시아는 포크, 나이프를 사용하는 점이 달라.',
					voice: 'SSJ620118_37',
					duration: 7500,
					animation: {
						type: 'c',
						duration:7500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][3],
							{
								type: 'ox',
								answer: '중국',
								// guideDuration: 4500,
								// noTextLength: true,
								// guideVoice: 'SSJ320110_05',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[6][5])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[6][4])}
								}
							}
						);
					}
				},
				{
					text: '일본과 중국 중, 뜨겁고 기름진 음식이 미끄러지지 않도록 젓가락 끝이 뭉툭한 특징을 가지는 나라가 어디지?',
					voice: 'SSJ620118_38',
					duration: 8500,
					animation: {
						type: 'd',
						duration:8500
					},
					endBack: function(){
						
					}
				},
				{
					text: '끝이 뭉툭한 것은 중국, <br>끝이 뾰족한 것은 일본에서 사용하는 젓가락이야.',
					voice: 'SSJ620118_39',
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
					text: '젓가락의 모습이 각 나라의 문화의 영향을 받아 <br>조금씩 달라진다는 점이 흥미로워!',
					voice: 'SSJ620118_40',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
					}
				},
			],
			[
				{
					text: '어느새 집에 돌아갈 시간이네. 정말 알찬 하루였어. ',
					voice: 'SSJ620118_41',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '오늘 함께 한 하루가 즐거웠길 바라! <br>그럼 다음에 만나자. 안녕!',
					voice: 'SSJ620118_42',
					duration: 5500,
					animation: {
						type: 'b',
						duration:5500
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