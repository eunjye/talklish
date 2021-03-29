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

			if (targetIndex !== 1 && !!$targetPage.getAttribute('data-bgm')) {
				win[namespace].soundStatus('play', 'bgm', $targetPage.getAttribute('data-bgm'));
				console.log('노래나옴')
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
				console.log(voice);
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
					duration: 2000
				},
				{
					text: '조금 더 생각해볼까?',
					voice: 'SSJ3g_A_02',
					duration: 2000
				},
				{
					text: '한 번 더 생각해보자!',
					voice: 'SSJ3g_A_03',
					duration: 2000
				},
				{
					text: '글쎄, 한 번 더 생각해볼까?',
					voice: 'SSJ3g_A_04',
					duration: 3000
				},
				{
					text: '아쉬워~ 한 번 더 생각해봐!',
					voice: 'SSJ3g_A_05',
					duration: 3000
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
					duration: 3000
				},
				{
					text: '어려웠구나! 내가 알려줄게.',
					voice: 'SSJ3g_B_03',
					duration: 3000
				},
			]
		],
		speak: [
			[
				{
					text: '안녕~ 또 만났네! 그동안 잘 지냈니?',
					voice: 'SSJ410308_01',
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
					text: '오늘도 나랑 같이 이곳저곳을 돌아다니며 <br>이야기 나눠보자.',
					voice: 'SSJ410308_02',
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
					text: '여기 다양한 공공 기관들이 모여 있네!',
					voice: 'SSJ410308_03',
					duration:3500,
					animation: {
						type: 'c',
						duration: 3500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][1],
							{
								type: 'ox',
								answer: '국가',
								guideDuration: 3500,
								guideVoice: 'SSJ410308_05',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[1][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[1][2])}
								}
							}
						);
					}
				},
				{
					text: '그런데, 공공 기관은 누가 세운 걸까?',
					voice: 'SSJ410308_04',
					duration:3200,
					animation: {
						type: 'd',
						duration: 8000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][2]);
					}
				},
				{
					text: '공공 기관은 국가가 세웠어.',
					voice: 'SSJ410308_06',
					duration:2500,
					animation: {
						type: 'f',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '공공 기관은 개인의 이익이 아닌 주민 전체의 <br>이익을 위해 국가가 세우고 관리하는 곳이구나.',
					voice: 'SSJ410308_07',
					duration:7500,
					animation: {
						type: 'f',
						duration:7200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				{
					text: '공공 기관의 종류에는 어떤 것들이 있더라?',
					voice: 'SSJ410308_08',
					duration:3500,
					animation: {
						type: 'c',
						duration:3000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][1]);
					}
				},
				{
					text: '도청, 소방서, 우체국, 주민 센터 등등…',
					voice: 'SSJ410308_09',
					duration:4500,
					animation: {
						type: 'c',
						duration:4000
					},
					endBack: function(){
						// 여기서 박스 나타남
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][2],
							{
								type: 'word',
								answer: [
									['ㅂㄱㅅ'],
									['보건소', '부가세', '불국사'],
									['보건소']
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
					text: '그 밖에, 감염병과 질병 예방 및 치료를 위해 노력하는 <br>공공 기관도 있대. 어디일까?',
					voice: 'SSJ410308_10',
					duration:7500,
					animation: {
						type: 'd',
						duration:7000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][3]);
					}
				},
				{
					text: '감염병과 질병 예방 및 치료를 위해 노력하는 <br>공공 기관은 보건소야.',
					voice: 'SSJ410308_11',
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
					text: '게다가 보건소는 학생들에게 건강과 관련된 <br>다양한 교육을 해주기도 한다고!',
					voice: 'SSJ410308_12',
					duration:5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][0]);
					}
				},
			],
			[
				// idx 3
				{
					text: '공공 기관에서는 지역 주민이 요청하는 일을 <br>처리하기도 해.',
					voice: 'SSJ410308_13',
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
								type: 'word',
								answer: [
									['ㄱㅊㅅ'],
									['감찰사', '관측소', '경찰서'],
									['경찰서']
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
					text: '어린이 보호 구역에서 신호를 지키지 않는 차에 대한 <br>단속 강화 요청은 어떤 공공 기관에 하면 좋을까?',
					voice: 'SSJ410308_14',
					duration:7500,
					animation: {
						type: 'd', 
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][2]);
					}
				},
				{
					text: '어린이 보호 구역에서 신호를 지키지 않는 차에 대한 <br>단속 강화 요청은 경찰서에 하면 돼.',
					voice: 'SSJ410308_15',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '요즘 어린이 보호 구역에서 신호를 지키지 않는 차들이 <br>많이 보였는데, ',
					voice: 'SSJ410308_16',
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
					text: '경찰서에 이들에 대한 단속 강화를 요청해야겠어.',
					voice: 'SSJ410308_17',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][5]);
					}
				},
				{
					text: '우와! 공공 기관들은 정말 다양한 방법으로 <br>우리 지역 주민들의 생활을 도와주는 것 같아.',
					voice: 'SSJ410308_18',
					duration: 7500,
					animation: {
						type: 'f',
						duration:7500
					},
					endBack: function(){
						window.speakUp.goStep(2);
					}
				},
			],
			[
				{
					text: '오늘은 최근 우리 지역에서 발생한 문제를 해결하기 위한 <br>주민 회의가 열리는 날이야.',
					voice: 'SSJ410308_19',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(
							win[namespace].speak[4][1],
							{
								type: 'word',
								answer: [
									['ㅈㅇ ㅁㅈ'],
									['자연 문제', '지역 문제', '자유 문제'],
									['지역 문제']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[4][3])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[4][2])}
								}
							}
						);
					}
				},
				{
					text: '지역 주민의 삶을 불편하게 하거나 지역 주민들 사이에 <br>갈등을 일으키는 문제를 무엇이라고 하지?',
					voice: 'SSJ410308_20',
					duration: 7500,
					animation: {
						type: 'd',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][2]);
					}
				},
				{
					text: '지역 주민의 삶을 불편하게 하거나 지역 주민들 사이에 <br>갈등을 일으키는 문제를 지역 문제라고 해.',
					voice: 'SSJ410308_21',
					duration: 7200,
					animation: {
						type: 'f',
						duration:7200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
					}
				},
				{
					text: '그래. 현재 우리 동네는 지역 문제로 인해 <br>많은 사람들 사이에 갈등이 일어나고 있는 상태야.',
					voice: 'SSJ410308_22',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][0]);
					}
				},
			],
			[
				{
					text: '부모님께서 그러는데, 우리 동네에 <br>주차 문제가 심각하다고 해.',
					voice: 'SSJ410308_23',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{
					text: '그래서 이렇게 많은 사람들이 <br>주민 회의에 참석한 것인가 봐.',
					voice: 'SSJ410308_24',
					duration: 4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][2],
							{
								type: 'word',
								answer: [
									['ㅈㅁ ㅊㅇ'],
									['주민 치유', '주민 참여', '주민 청원'],
									['주민 참여']
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
					text: '지역 문제를 해결하는 과정에서 지역 주민이 중심이 되어 <br>참여하는 것을 무엇이라고 할까?',
					voice: 'SSJ410308_25',
					duration: 6300,
					animation: {
						type: 'd',
						duration:6300
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '지역 문제를 해결하는 과정에서 지역 주민이 중심이 되어 참여하는 것을 주민 참여라고 해. ',
					voice: 'SSJ410308_26',
					duration: 7000,
					animation: {
						type: 'f',
						duration:7000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][4]);
					}
				},
				{
					text: '지역 문제는 지역의 모든 주민에게 영향을 미치기 때문에 <br>이를 해결하는 과정에 주민들이 참여하는 게 좋겠지?',
					voice: 'SSJ410308_27',
					duration: 8000,
					animation: {
						type: 'f',
						duration:8000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][5]);
					}
				},
				{
					text: '공청회 참여, 주민 회의 참여, 서명 운동 등 <br>여러 가지 방법으로 주민 참여를 실천할 수 있어.',
					voice: 'SSJ410308_28',
					duration: 7500,
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
					text: '그리고 어떤 단체를 만들어서 지역의 일에 <br>참여하는 경우도 있다고 배웠는데…',
					voice: 'SSJ410308_29',
					duration: 6000,
					animation: {
						type: 'c',
						duration:6000
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][1],
							{
								type: 'word',
								answer: [
									['ㅅㅁ ㄷㅊ'],
									['시민 단체', '신문 도착', '선물 당첨'],
									['시민 단체']
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
					text: '시민들이 스스로 모여 사회 전체의 이익을 위해 <br>활동하는 단체를 뭐라고 하더라?',
					voice: 'SSJ410308_30',
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
					text: '시민들이 스스로 모여 사회 전체의 이익을 위해 <br>활동하는 단체를 시민 단체라고 해.',
					voice: 'SSJ410308_31',
					duration: 6000,
					animation: {
						type: 'f',
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][3]);
					}
				},
				{
					text: '그래! 시민 단체는 지역의 환경, 경제, 교육 등의 <br>여러 분야에서 활동하고,',
					voice: 'SSJ410308_32',
					duration: 6000,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][4]);
					}
				},
				{
					text: '지역의 어려운 사람들을 돕는 봉사 활동을 하기도 하지.',
					voice: 'SSJ410308_33',
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
					text: '오늘 정말 많은 곳을 둘러보고 온 것 같아!',
					voice: 'SSJ410308_34',
					duration: 3000,
					animation: {
						type: 'c',
						duration:3000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '덕분에 사회 시간에 배운 내용들이 <br>한번에 정리되는 기분인걸? 고마워.',
					voice: 'SSJ410308_35',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][2]);
					}
				},
				{
					text: '그럼 다음에 또 만나자. 안녕~!',
					voice: 'SSJ410308_36',
					duration: 4500,
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