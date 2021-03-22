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
					
				var addedDuration = 0;
				if (question.addedScript !== undefined) {
					var addedSpec = question.addedScript;
					/* addedSpec : {
						text: '',
						voice: '',
						duration: Number,
						animation: {type:'', duration:Numb,er},
						endBack: function(){}
					} */
					// setTimeout(function(){
					// 	win[namespace].setText(addedSpec.text);
					// 	console.log(addedSpec);
					// 	win[namespace].soundStatus('play', 'script', addedSpec.voice);
					// }, script.duration+1000);
					addedDuration = addedSpec.duration;
				}
				win[namespace].soundStatus('play', 'script', voice);
				setTimeout(function(){
					console.log(addedDuration);
					win[namespace].checkAnswer(script, question, question.resultBack, addedSpec);
				}, 0);
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
		checkAnswer: function(script, question, resultBack, addedSpec){
			var $questionArea = document.querySelector('.question-area');
			var $btnVoice = document.querySelector('.btn-voice');

			var addedDuration = addedSpec === undefined ? 0 : addedSpec.duration;

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
					setTimeout(blinkBtnVoice, question.guideDuration + addedDuration);
				} else {
					addedSpeak();
					setTimeout(blinkBtnVoice, addedDuration);
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
			
			// 추가 대화 있을 시
			function addedSpeak() {
				if (addedSpec !== undefined){
					win[namespace].setText(addedSpec.text);
					win[namespace].soundStatus('play', 'script', addedSpec.voice);
				}
			}

			// 첫번째 (글자수만 나오는거)
			setInitialAnswer(answerText, true);

			showQuestionArea();

			function evtStartVoiceCheck(){
				$btnVoice.disabled = true;

				clearTimeout(win[namespace].willTimer);
				
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
											win[namespace].willTimer = setTimeout(addedSpeak, script.duration);
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
										win[namespace].willTimer = setTimeout(addedSpeak, script.duration);
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
					clearTimeout(win[namespace].willTimer);
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
					duration: 1500
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
					duration: 3500
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
					duration: 3500
				},
			]
		],
		speak: [
			[
				{
					text: '안녕? 나는 천재초등학교 5학년 3반 우주라고 해. 반가워~',
					voice: 'SSJ510215_01',
					duration:5500,
					animation: {
						type: 'b',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][1]);
					}
				},
				{
					text: '지난번에 바다와 함께 즐거운 시간을 보냈다고 들었어. ',
					voice: 'SSJ510215_02',
					duration:3500,
					animation: {
						type: 'c',
						duration: 3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][2]);
					}
				},
				{
					text: '나랑도 오늘 재밌게 놀아보자!',
					voice: 'SSJ510215_03',
					duration:2500,
					animation: {
						type: 'c',
						duration: 2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				},
			],
			[
				{
					text: '나는 지금 어딘가에 가는 중이야. 어디에 가냐고?',
					voice: 'SSJ510215_04',
					duration:3500,
					animation: {
						type: 'd',
						duration: 3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][1]);
					}
				},
				{
					text: '그건 비~밀~! 일단 따라 와 봐~ 헤헷!',
					voice: 'SSJ510215_05',
					duration:3500,
					animation: {
						type: 'd',
						duration: 3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][2]);
					}
				},
				{
					text: '오! 여기 횡단보도를 따라 노란색 점자 블록이 있네.',
					voice: 'SSJ510215_06',
					duration:4500,
					animation: {
						type: 'c',
						duration: 4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '장애인들이 안전하게 원하는 곳에 갈 수 있도록 해 주는 <br>공공 편의 시설이야.',
					voice: 'SSJ510215_07',
					duration:5500,
					animation: {
						type: 'c',
						duration: 5500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][4],
							{
								type: 'word',
								answer: [
									['ㅇㄱ'],
									['인권', '여권', '왕권'],
									['인권']
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
					text: '우리는 모두 사람이기 때문에 <br>당연히 이 권리를 누릴 수 있어야 해.',
					voice: 'SSJ510215_08',
					duration:4500,
					animation: {
						type: 'd',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][5]);
					}
				},
				{
					text: '사람으로서 인간답게 살아갈 권리를 인권이라고 하지.',
					voice: 'SSJ510215_09',
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
					text: '모든 사람은 소중한 존재이니까 어떤 이유에서든 <br>차별받거나 소외되어서는 안 돼.',
					voice: 'SSJ510215_10',
					duration:6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				{
					text: '인권은 오늘날 사람들에게만 중요한 걸까?',
					voice: 'SSJ510215_11',
					duration:3500,
					animation: {
						type: 'd',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][1]);
					}
				},
				{
					text: '아니야~ 옛날에도 백성들의 인권을 높이기 위한 <br>여러 가지 제도가 있었대.',
					voice: 'SSJ510215_12',
					duration:5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][2]);
					}
				},
				{
					text: '백성들이 억울한 일을 당했을 때<br>이를 해결할 수 있도록 만든 제도들이지.',
					voice: 'SSJ510215_13',
					duration:4500,
					animation: {
						type: 'c',
						duration:4500
					},
					endBack: function(){
						// 여기서 박스 나타남
						win[namespace].progressStatus('ing', 1);
						win[namespace].askQuestion(
							win[namespace].speak[2][3],
							{
								type: 'word',
								answer: [
									['ㄱㅈ'],
									['고증', '격쟁', '기준'],
									['격쟁']
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
					text: '그중에 징이나 꽹과리를 쳐서 임금에게 억울함을 알리는 제도가 무엇인지 알아?',
					voice: 'SSJ510215_14',
					duration:5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '옛날 사람들은 격쟁을 이용해서 억울함을 풀 수 있었어.',
					voice: 'SSJ510215_15',
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
					text: '그런데 나도 얼마 전에 억울한 일을 겪었지 뭐야!',
					voice: 'SSJ510215_16',
					duration:3500,
					animation: {
						type: 'f', 
						duration:3500
					},
					endBack: function(){
						win[namespace].goStep(2);
					}
				},
			],
			[
				{
					text: '이렇게 불법 주차를 한 차들 때문에 <br>통학 버스가 지나가지 못해서 지각을 해 버렸어!',
					voice: 'SSJ510215_17',
					duration:6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][1]);
					}
				},
				{
					text: '국가가 사회의 질서를 유지하기 위해 만든 <br>행동 기준인 법을 지키지 않다니….',
					voice: 'SSJ510215_18',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][2],
							{
								type: 'ox',
								answer: '모든 사람',
								guideDuration: 4500,
								guideVoice: 'SSJ510215_20',
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[3][4])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[3][3])}
								}
							}
						);
					}
				},
				{
					text: '법은 일부 사람에게만 적용되는 걸까? <br>아니면 모든 사람에게 적용되는 걸까?',
					voice: 'SSJ510215_19',
					duration: 5500,
					animation: {
						type: 'd',
						duration:10800
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '법은 강제성이 있어서 <br>모든 사람이 반드시 지켜야 하는 규칙이야.',
					voice: 'SSJ510215_21',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][4]);
					}
				},
				{
					text: '우리 모두 일상생활 곳곳에 적용되는 법들을 <br>잘 지켜야 한다고~!',
					voice: 'SSJ510215_22',
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
					text: '만약 법을 준수하지 않으면 다른 사람의 권리를 침해하고 <br>갈등이 발생할 수 있어.',
					voice: 'SSJ510215_23',
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
								addedScript: win[namespace].speak[4][2],
								answer: [
									['ㅈㅍ'],
									['장풍', '재판', '지표'],
									['재판']
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
					text: '이렇게 법을 지키지 않아 문제가 생겼을 때',
					voice: 'SSJ510215_24',
					duration: 3200,// 기이이일게 해버리자
					animation: {
						type: 'd',
						duration:10500
					},
					endBack: function(){
					}
				},
				{
					text: '그 사람의 죄를 확인하고 권리를 제한하기 위해 <br>판결을 내리는 절차를 무엇이라고 하더라?',
					voice: 'SSJ510215_25',
					duration: 6500,
					animation: {
						type: 'd',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
					}
				},
				{
					text: '판사가 재판을 진행하고 법에 따라 판결을 내리지.',
					voice: 'SSJ510215_26',
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
					text: '법을 어긴 사람은 재판을 받고 <br>자신의 행동에 맞는 책임을 져야 해.',
					voice: 'SSJ510215_27',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].goStep(3);
					}
				},
			],
			[
				{
					text: '앗! 이야기 하다 보니 벌써 도착했네?!',
					voice: 'SSJ510215_28',
					duration: 3500,
					animation: {
						type: 'd',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{
					text: '이곳은 우리나라 최고의 법, <br>바로 헌법을 다루는 헌법 재판소야~',
					voice: 'SSJ510215_29',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][2]);
					}
				},
				{
					text: '헌법에는 대한민국 국민이 누려야 할 권리와 <br>지켜야 할 의무가 담겨 있어.',
					voice: 'SSJ510215_30',
					duration: 6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][3],
							{
								type: 'word',
								answer: [
									['ㄱㅂㄱ'],
									['기본권', '거부권', '개발권'],
									['기본권']
								],
								resultBack: {
									right: function(){win[namespace].askQuestion(win[namespace].speak[5][5])},
									wrong: function(){win[namespace].askQuestion(win[namespace].speak[5][4])}
								}
							}
						);
					}
				},
				{ 
					text: '헌법에 나타난 권리 중에서, 국민에게 보장되는 <br>기본적인 권리를 무엇이라고 하지?',
					voice: 'SSJ510215_31',
					duration: 6000,
					animation: {
						type: 'd',
						duration:6000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][4]);
					}
				},
				{
					text: '기본권이란 헌법으로 보장되는 <br>국민의 기본적인 권리를 말해.',
					voice: 'SSJ510215_32',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][5]);
					}
				},
				{
					text: '나와 다른 사람의 기본권을 보호하려면 <br>그에 따른 책임과 의무도 잘 지켜야 해.',
					voice: 'SSJ510215_33',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
					}
				},
			],
			[ // 6 - 0
				{
					text: '아 참, 그런데 내가 오늘 헌법 재판소에 온 이유가 <br>궁금하지 않아~?',
					voice: 'SSJ510215_34',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][1]);
					}
				},
				{
					text: '바로바로~ 얼마 전 7월 17일, <br>우리나라의 국경일을 기념하기 위해 찾아왔어!',
					voice: 'SSJ510215_35',
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
									['ㅈㅎㅈ'],
									['제한절', '제휴절', '제헌절'],
									['제헌절']
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
					text: '우리나라의 헌법을 만들어서 온 국민에게 알린 날! <br>설마 잊은 건 아니겠지?',
					voice: 'SSJ510215_36',
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
					text: '7월 17일은 우리나라에 헌법이 공포된 것을 기념하는 <br>제헌절이야.',
					voice: 'SSJ510215_37',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][4]);
					}
				},
				{
					text: '모든 국민이 존중받고 행복한 삶을 살아갈 수 있게 된 <br>의미 있는 날이니 꼭 기억해 둬~!',
					voice: 'SSJ510215_38',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][0]);
					}
				}
			],
			[
				{
					text: '오늘 나와 함께 먼 곳까지 와 줘서 고마웠어~',
					voice: 'SSJ510215_39',
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
					text: '덕분에 사회 시간에 배운 내용들을 <br>잊어버리지 않을 수 있겠어!',
					voice: 'SSJ510215_40',
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
					text: '우리 다음에 또 만나서 이야기 나누자. 안녕~',
					voice: 'SSJ510215_41',
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