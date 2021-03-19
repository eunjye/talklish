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
				win[namespace].askQuestion(win[namespace].speak[4][0]);
				win[namespace].soundStatus('play', 'bgm', 'bgm_02');
			} else if (targetStep === 3){
				win[namespace].askQuestion(win[namespace].speak[5][0]);
				win[namespace].soundStatus('play', 'bgm', 'bgm_01');
			}
			win[namespace].setBgImg('bg_main'+targetStep);
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
				text: '아쉽다~ 다음엔 더 잘해보자! ',
				voice: 'SSJ3b_ending_04',
				duration: 4000
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
					duration: 3000
				},
				{
					text: '한 번 더 생각해볼까?',
					voice: 'SSJ3b_A_03',
					duration: 3000
				},
				{
					text: '글쎄, 한 번 더 생각해봐!',
					voice: 'SSJ3b_A_04',
					duration: 4000
				},
				{
					text: '아쉬워~ 한 번 더 생각해볼까?',
					voice: 'SSJ3b_A_05',
					duration: 4000
				},
			],
			[
				{
					text: '아쉬워~ 내가 알려줄게!',
					voice: 'SSJ3b_B_01',
					duration: 3000
				},
				{
					text: '잘 모르겠다면 내가 설명해 줄게!',
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
					text: '안녕, 오랜만이다. 그동안 잘 지냈니?',
					voice: 'SSJ310309_01',
					duration:4200,
					animation: {
						type: 'b',
						duration: 4200
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][1]);
					}
				},
				{
					text: '오늘은 여행을 떠나보려고 해. 함께 가지 않을래?',
					voice: 'SSJ310309_02',
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
					text: '우와! 기차가 들어오고 있어. KTX라고 적혀있네.',
					voice: 'SSJ310309_03',
					duration:5500,
					animation: {
						type: 'c',
						duration: 5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][1]);
					}
				},
				{
					text: '우리나라 최초의 고속 열차야. ',
					voice: 'SSJ310309_04',
					duration:2500,
					animation: {
						type: 'c',
						duration: 2500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 0);
						win[namespace].askQuestion(
							win[namespace].speak[1][2],
							{
								type: 'ox',
								answer: '줄어들었어',
								guideDuration: 5500,
								guideVoice: 'SSJ310309_06',
								resultBack: {
									right: function(){
										win[namespace].askQuestion(win[namespace].speak[1][4])
									},
									wrong: function(){
										win[namespace].askQuestion(win[namespace].speak[1][3])
									}
								}
							}
						);
					}
				},
				{
					text: '교통수단의 발달로 서울에서 부산까지 가는 데 <br>걸리는 시간은 어떻게 변하였을까?',
					voice: 'SSJ310309_05',
					duration:5500,
					animation: {
						type: 'd',
						duration: 12000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '교통수단의 발달로 서울에서 부산까지 가는 데 <br>걸리는 시간은 줄어들었어.',
					voice: 'SSJ310309_07',
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
					text: '2시간 40분 만에 서울에서 부산까지 갈 수 있다고 해. <br>정말 빠른걸?',
					voice: 'SSJ310309_08',
					duration:5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				// idx 2
				{
					text: '옛날에는 서울에서 부산까지 걸어가려면, <br>무려 30일이 걸렸다고 하는데…',
					voice: 'SSJ310309_09',
					duration:6500,
					animation: {
						type: 'c',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][1]);
					}
				},
				{
					text: '그렇다면 옛날 사람들은 어떤 교통수단을 사용했을까?',
					voice: 'SSJ310309_10',
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
									['ㄱㅁ'],
									['건물', '가마', '골목'],
									['가마']
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
					text: '땅에서 사람이 이동할 때 사용했던, 여러 사람이 <br>함께 들고 가는 조그만 집 모양의 탈것이 뭐더라?',
					voice: 'SSJ310309_11',
					duration:7500,
					animation: {
						type: 'd',
						duration:7500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][3]);
					}
				},
				{
					text: '땅에서 사람이 이동할 때 사용했던, 여러 사람이 <br>함께 들고 가는 조그만 집 모양의 탈것을 가마라고 해.',
					voice: 'SSJ310309_12',
					duration:8500,
					animation: {
						type: 'f',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '그래. 가마 말고도 말, 소달구지, 뗏목, 돛단배 등이 있어.',
					voice: 'SSJ310309_13',
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
					text: '하지만 옛날의 교통수단은 여러 사람이 <br>함께 이용하기에 어렵고, ',
					voice: 'SSJ310309_14',
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
					text: '많은 물건을 한 번에 옮기기도 어려워 불편했을 것 같아.',
					voice: 'SSJ310309_15',
					duration:4500,
					animation: {
						type: 'c', 
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][1]);
					}
				},
				{
					text: '반면에, 오늘날의 교통수단은 어떨까?',
					voice: 'SSJ310309_16',
					duration: 3500,
					animation: {
						type: 'c',
						duration:3500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 2);
						win[namespace].askQuestion(
							win[namespace].speak[3][2],
							{
								type: 'ox',
								answer: '적게 받아',
								guideDuration: 4500,
								guideVoice: 'SSJ310309_18',
								resultBack: {
									right: function(){
										win[namespace].askQuestion(win[namespace].speak[3][4])
									},
									wrong: function(){
										win[namespace].askQuestion(win[namespace].speak[3][3])
									}
								}
							}
						);
					}
				},
				{
					text: '오늘날의 교통수단은 환경의 영향을 <br>많이 받을까? 적게 받을까?',
					voice: 'SSJ310309_17',
					duration: 4500,
					animation: {
						type: 'd',
						duration:10000
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][3]);
					}
				},
				{
					text: '오늘날의 교통수단은 환경의 영향을 적게 받아.',
					voice: 'SSJ310309_19',
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
					text: '기계의 힘을 이용해서, <br>먼 곳까지 빠르고 편리하게 이동할 수 있게 해줘.',
					voice: 'SSJ310309_20',
					duration: 5500,
					animation: {
						type: 'f',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[3][5]);
					}
				},
				{
					text: '지금 우리가 보고 있는 이 고속 열차처럼 말이야!',
					voice: 'SSJ310309_21',
					duration: 4000,
					animation: {
						type: 'f',
						duration:4000
					},
					endBack: function(){
						window.speakUp.goStep(2);
					}
				},
			],
			[
				{
					text: '우와~여기가 어디게? 뒤에 보이는 이건 뭘까?',
					voice: 'SSJ310309_22',
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
									['ㅂㅅ'],
									['부산', '봉수', '밥솥'],
									['봉수']
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
					text: '적이 쳐들어오거나 위급한 상황이 발생했을 때 <br>연기를 피워서 급한 일을 전달하였던 통신 수단이야.',
					voice: 'SSJ310309_23',
					duration: 8500,
					animation: {
						type: 'd',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][2]);
					}
				},
				{
					text: '적이 쳐들어오거나 위급한 상황이 발생했을 때 연기를 <br>피워 급한 일을 전달하였던 통신 수단을 봉수라고 해.',
					voice: 'SSJ310309_24',
					duration: 8500,
					animation: {
						type: 'f',
						duration:8500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[4][3]);
					}
				},
				{
					text: '봉수대를 실제로 보니 정말 신기해.',
					voice: 'SSJ310309_25',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][0]);
					}
				},
			],
			[
				{
					text: '그런데, 통신 수단도 계속해서 발전해 왔다는 점, <br>알고 있지?',
					voice: 'SSJ310309_26',
					duration: 5500,
					animation: {
						type: 'c',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][1]);
					}
				},
				{
					text: '오늘날의 통신 수단에는 어떤 것들이 있을까?',
					voice: 'SSJ310309_27',
					duration: 3500,
					animation: {
						type: 'd',
						duration:3500
					},
					endBack: function(){
						win[namespace].progressStatus('ing', 4);
						win[namespace].askQuestion(win[namespace].speak[5][2],
							{
								type: 'word',
								answer: [
									['ㅌㄹㅂㅈ'],
									['텔레바지', '텔레비전', '트랙비전'],
									['텔레비전']
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
					text: '운동 경기, 뉴스 등을 시청할 때 사용하는 <br>오늘날의 통신 수단이 뭐더라?',
					voice: 'SSJ310309_28',
					duration: 5500,
					animation: {
						type: 'd',
						duration:5500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][3]);
					}
				},
				{
					text: '운동 경기, 뉴스 등을 시청할 때 사용하는 <br>오늘날의 통신 수단은 텔레비전이야. ',
					voice: 'SSJ310309_29',
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
					text: '나도 텔레비전 보는 걸 참 좋아하는데, 헤헷!',
					voice: 'SSJ310309_30',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[5][5]);
					}
				},
				{
					text: '휴대 전화, 전자 우편 등도 오늘날의 통신 수단이지.',
					voice: 'SSJ310309_31',
					duration: 4500,
					animation: {
						type: 'f',
						duration:4500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][0]);
					}
				},
			],
			[ // 6 - 0
				{
					text: '그런데, 장소나 하는 일에 따라서도 <br>통신 수단의 이용 모습이 달라진다고 하네?',
					voice: 'SSJ310309_32',
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
									['ㅅㅅㅎ'],
									['수신호', '식생활', '산수화'],
									['수신호']
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
					text: '물속에서 의사소통을 하기 위해 무엇을 사용할까?',
					voice: 'SSJ310309_33',
					duration: 3500,
					animation: {
						type: 'd',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][2]);
					}
				},
				{
					text: '물속에서 의사소통을 할 때는 수신호를 사용해.',
					voice: 'SSJ310309_34',
					duration: 3500,
					animation: {
						type: 'f',
						duration:3500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[6][3]);
					}
				},
				{
					text: '물속이라 말을 할 수 없는 상황에서도 <br>수신호를 통한 통신이 가능하구나!',
					voice: 'SSJ310309_35',
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
					text: '우와! 통신 수단의 종류는 정말 다양한 것 같아.',
					voice: 'SSJ310309_36',
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
					text: '이제 집으로 돌아가 봐야 할 시간이네.',
					voice: 'SSJ310309_37',
					duration: 2500,
					animation: {
						type: 'f',
						duration:2500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][1]);
					}
				},
				{
					text: '사회 시간에 배운 내용들도 정리하고, <br>정말 즐거운 여행이었던 것 같아.',
					voice: 'SSJ310309_38',
					duration: 6500,
					animation: {
						type: 'f',
						duration:6500
					},
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[7][2]);
					}
				},
				{
					text: '함께해줘서 정말 고마워. 그럼 다음에 또 만나자!',
					voice: 'SSJ310309_39',
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