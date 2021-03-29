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
				voice: 'SSJ5g_ending_01',
				duration: 4000
			},
			{
				text: '잘했어! 열심히 공부하고 있구나.',
				voice: 'SSJ5g_ending_02',
				duration: 4000
			},
			{
				text: '다음번엔 더 잘할 수 있을 거야.',
				voice: 'SSJ5g_ending_03',
				duration: 3000
			},
			{
				text: '아쉽다~ 다음엔 더 잘해보자! ',
				voice: 'SSJ5g_ending_04',
				duration: 4000
			},
		],
		wrongScript: [
			[
				{
					text: '다시 한번 생각해볼까?',
					voice: 'SSJ5g_A_01',
					duration: 1800
				},
				{
					text: '조금 더 생각해볼까?',
					voice: 'SSJ5g_A_02',
					duration: 1600
				},
				{
					text: '한 번 더 생각해보자!',
					voice: 'SSJ5g_A_03',
					duration: 1600
				},
				{
					text: '글쎄, 한 번 더 생각해볼까?',
					voice: 'SSJ5g_A_04',
					duration: 3000
				},
				{
					text: '아쉬워~ 한 번 더 생각해봐!',
					voice: 'SSJ5g_A_05',
					duration: 2800
				},
			],
			[
				{
					text: '아쉬워~ 내가 알려줄게!',
					voice: 'SSJ5g_B_01',
					duration: 2800
				},
				{
					text: '잘 모르겠다면 내가 설명해 줄게!',
					voice: 'SSJ5g_B_02',
					duration: 3000
				},
				{
					text: '어려웠구나! 내가 알려줄게.',
					voice: 'SSJ5g_B_03',
					duration: 2800
				},
			]
		],
		speak: [
			[
				{
					text: '안녕? 천재초등학교에 다니고 있는 바다라고 해!<br>만나서 반가워.',
					voice: 'SSJ610216_01',
					duration:6500,
					animation: {
						type: 'b',
						duration: 6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][1]);
					}
				},
				{
					text: '모처럼의 견학인데 같이 재밌게 둘러보자.',
					voice: 'SSJ610216_02',
					duration:3700,
					animation: {
						type: 'c',
						duration: 3700
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				},
			],
			[
				// idx 1
				{
					text: '이곳은 5·18 민주 묘지야.<br>5·18 민주화 운동 때 희생되신 분들을 추모하는 곳이지.',
					voice: 'SSJ610216_03',
					duration:7400,
					animation: {
						type: 'c',
						duration: 7400
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][1]);
					}
				},
				{
					text: '전두환은 군인들을 동원해서 5·18 민주화 운동을 진압했고, 많은 사상자가 나왔어.',
					voice: 'SSJ610216_04',
					duration:6500,
					animation: {
						type: 'c',
						duration: 6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						// 여기서 박스 나타남
						win[namespace].askQuestion(
							win[namespace].speak[1][2],
							{
								type: 'ox',
								answer: '계엄군',
								guideDuration: 4500,
								guideVoice: 'SSJ610216_06',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[1][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[1][3])}
								}
							}
						);
					}
				},
				{
					text: '그런데, 전두환의 명에 따라 시위대를 진압한 군대를<br>뭐라고 하는지 아니?',
					voice: 'SSJ610216_05',
					duration:5300,
					animation: {
						type: 'd',
						duration:11500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '전두환의 명에 따라 시위대를 진압한 군대를<br>계엄군이라고 해.',
					voice: 'SSJ610216_07',
					duration:5200,
					animation: {
						type: 'f',
						duration:5200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][4]);
					}
				},
				{
					text: '전두환은 계엄군을 광주로 내려보내서 <br>5·18 민주화 운동에 참가한 시위대를 진압했어.',
					voice: 'SSJ610216_08',
					duration:7000,
					animation: {
						type: 'f',
						duration:7000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][5]);
					}
				},
				{
					text: '두 번 다신 일어나선 안 될 슬픈 일이야, 그렇지?',
					voice: 'SSJ610216_09',
					duration:4200,
					animation: {
						type: 'f',
						duration:4200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				{
					text: '전두환은 5·18 민주화 운동을 진압한 후에도<br>독재 정치를 이어갔어.',
					voice: 'SSJ610216_10',
					duration:5000,
					animation: {
						type: 'c',
						duration:5000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][1]);
					}
				},
				{
					text: '그래서 국민들은 6월 민주 항쟁을 일으켰고, <br>대통령 선거 제도를 바꿔 달라고 요구했어.',
					voice: 'SSJ610216_11',
					duration:6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][2],
							{
								type: 'word',
								answer: [
									['ㅈㅈ ㅅㄱ'],
									['직접 수고', '직접 선거', '자장 선거'],
									['직접 선거']
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
					text: '6월 민주 항쟁에서 국민들이 요구한 <br>선거 방식은 무엇이었을까?',
					voice: 'SSJ610216_12',
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
					text: '6월 민주 항쟁에서 국민들이 요구한 선거 방식은 <br>직접 선거야.',
					voice: 'SSJ610216_13',
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
					text: '그래. 국민들의 이러한 요구는 결국 <br>6·29 민주화 선언을 통해 실현되었어.',
					voice: 'SSJ610216_14',
					duration:6200,
					animation: {
						type: 'f', 
						duration:6200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][5]);
					}
				},
				{
					text: '민주주의가 훼손될 때는 국민들의 손으로 <br>바로잡을 수 있다는 점을 꼭 기억해야겠네.',
					voice: 'SSJ610216_15',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						window.speakUp.goStep(2);
					}
				},
			],
			[
				// idx 3
				{
					text: '이번에는 투표소의 모습을 살펴보자.',
					voice: 'SSJ610216_16',
					duration: 2500,
					animation: {
						type: 'c',
						duration:2500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][1], 
							{
								type: 'word',
								answer: [
									['ㅅㄱ'],
									['선거', '상관', '송구'],
									['선거']
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
					text: '국민들이 투표소에서 하는 일로, 우리의 뜻을 전달할 <br>대표자를 뽑는 일을 뭐라고 하는지 아니?',
					voice: 'SSJ610216_17',
					duration: 7200,
					animation: {
						type: 'd',
						duration:7200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][2]);
					}
				},
				{
					text: '우리의 뜻을 전달할 대표자를 뽑는 일을 선거라고 해.',
					voice: 'SSJ610216_18',
					duration: 4200,
					animation: {
						type: 'f',
						duration:4200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '선거를 민주주의의 꽃이라고도 부른다고 해. <br>뭔가 멋있지 않니?',
					voice: 'SSJ610216_19',
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
					text: '선거를 할 때는 신중하게 투표권을 행사해야겠지.',
					voice: 'SSJ610216_20',
					duration: 3200,
					animation: {
						type: 'f',
						duration:3200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][0]);
					}
				},
			],
			[
				// idx 4
				{
					text: '민주주의 사회에서는 선거와 같이 <br>더 많은 쪽의 의견을 따르는 방식을 이용하는 경우가 많아.',
					voice: 'SSJ610216_21',
					duration: 6200,
					animation: {
						type: 'c',
						duration:6200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][1]);
					}
				},
				{
					text: '일상생활에서도 더 많은 쪽의 의견을 따르는 경험 <br>해본 적 있지?',
					voice: 'SSJ610216_22',
					duration: 4200,
					animation: {
						type: 'c',
						duration:4200
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 3);
						win[namespace].askQuestion(
							win[namespace].speak[4][2],
							{
								type: 'word',
								answer: [
									['ㄷㅅㄱ'],
									['도서관', '다수결', '대성공'],
									['다수결']
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
					text: '더 많은 쪽의 의견을 따르는 방식을 뭐라고 할까?',
					voice: 'SSJ610216_23',
					duration: 3200,
					animation: {
						type: 'd',
						duration:3200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
					}
				},
				{
					text: '더 많은 쪽의 의견을 따르는 방식을 다수결이라고 해.',
					voice: 'SSJ610216_24',
					duration: 3200,
					animation: {
						type: 'f',
						duration:3200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][4]);
					}
				},
				{
					text: '더 많은 쪽의 의견이 더 합리적일 것이라고 <br>가정하고 따르는 것이지.',
					voice: 'SSJ610216_25',
					duration: 4200,
					animation: {
						type: 'f',
						duration:4200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][5]);
					}
				},
				{
					text: '하지만 다수결의 원칙을 따른다고 해서 항상 합리적인 것은 아니야.',
					voice: 'SSJ610216_26',
					duration: 4200,
					animation: {
						type: 'f',
						duration:4200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][6]);
					}
				},
				{
					text: '그리고 소수의 의견도 항상 존중해야 한다는 점도 <br>잊지 말아야 해.',
					voice: 'SSJ610216_27',
					duration: 5200,
					animation: {
						type: 'f',
						duration:5200
					},
					endBack: function(){
						
						window.speakUp.goStep(3);
					}
				},
			],
			[
				// idx 5
				{
					text: '자, 여기는 국회 의사당이야. <br>우와~ 생각보다 크고 넓다~',
					voice: 'SSJ610216_28',
					duration: 5200,
					animation: {
						type: 'c',
						duration:5200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{
					text: '국회 의사당에서는 국회 의원들이 모여 <br>주로 법을 만드는 일을 하고 있어.',
					voice: 'SSJ610216_29',
					duration: 5200,
					animation: {
						type: 'c',
						duration:5200
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][2],
							{
								type: 'word',
								answer: [
									['ㅇㅂ'],
									['안보', '왕벌', '입법'],
									['입법']
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
					text: '법을 만드는 일을 뭐라고 하는지 아니?',
					voice: 'SSJ610216_30',
					duration: 3200,
					animation: {
						type: 'd',
						duration:3200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '법을 만드는 일을 입법이라고 해.',
					voice: 'SSJ610216_31',
					duration: 3200,
					animation: {
						type: 'f',
						duration:3200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][4]);
					}
				},
				{
					text: '아하, 그래서 국회를 입법부라고도 부르는 거구나!',
					voice: 'SSJ610216_32',
					duration: 4200,
					animation: {
						type: 'f',
						duration:4200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
					}
				},
			],
			[ // 6 - 0
				{
					text: '국가 기관에는 입법부 말고도 행정부와 사법부가 있어.',
					voice: 'SSJ610216_33',
					duration: 4200,
					animation: {
						type: 'c',
						duration:4200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][1]);
					}
				},
				{
					text: '그런데, 국가 기관이 잘못된 결정을 내리거나 <br>독재를 하면 민주주의가 훼손되겠지?',
					voice: 'SSJ610216_34',
					duration: 6000,
					animation: {
						type: 'c',
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][2]);
					}
				},
				{
					text: '그래서 국가 권력을 한 곳에 집중시키지 않고 나누어야 <br>그 권한을 마음대로 사용하지 못하게 막을 수 있대.',
					voice: 'SSJ610216_35',
					duration: 7000,
					animation: {
						type: 'c',
						duration:7000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][3]);
					}
				},
				{
					text: '우리나라는 국가 권력을 국회, 정부, 법원이 나누어 맡아.',
					voice: 'SSJ610216_36',
					duration: 5000,
					animation: {
						type: 'c',
						duration:5000
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 5);
						win[namespace].askQuestion(
							win[namespace].speak[6][4],
							{
								type: 'word',
								answer: [
									['ㅅㄱ ㅂㄹ'],
									['성공 별로', '삼권 분립', '생기 발랄'],
									['삼권 분립']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[6][6])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[6][5])}
								}
							}
						);
					}
				},
				{
					text: '이렇게 셋으로 국가 권력을 나누는 걸 뭐라고 하더라?',
					voice: 'SSJ610216_37',
					duration: 4000,
					animation: {
						type: 'd',
						duration:4000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][5]);
					}
				},
				{
					text: '국가 권력을 셋으로 나누는 것을 삼권 분립, <br>또는 권력 분립이라고 해.',
					voice: 'SSJ610216_38',
					duration: 6000,
					animation: {
						type: 'f',
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][6]);
					}
				},
				{
					text: '삼권 분립을 통해 세 기관이 서로 견제하고 균형을 이룰 때 <br>국민의 자유와 권리가 지켜질 수 있겠지!',
					voice: 'SSJ610216_39',
					duration: 7200,
					animation: {
						type: 'f',
						duration:7200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
					}
				}
			],
			[
				// idx 7
				{
					text: '와, 벌써 견학이 끝났네. 너무 아쉬워.',
					voice: 'SSJ610216_40',
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
					text: '그래도 덕분에 6학년 1학기에서 배운 내용을 <br>재미있게 복습했어.',
					voice: 'SSJ610216_41',
					duration: 5000,
					animation: {
						type: 'c',
						duration:4700
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][2]);
					}
				},
				{
					text: '그럼 다음에 또 만나자~',
					voice: 'SSJ610216_42',
					duration: 3000,
					animation: {
						type: 'b',
						duration:2500
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