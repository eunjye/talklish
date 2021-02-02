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
		/**
		 * @name goToNPage
		 * @param {Number} targetIndex 
		 * @param {HTMLElement} $evtEl 
		 */
		goPage: function(targetIndex, $evtEl, callback){
			var $targetPage = document.querySelector('[data-index="' + targetIndex + '"]');
			if (!!$evtEl) {
				var $evtPage = $evtEl.closestByClass('page-area');
				$evtPage.style.display = 'none';
			}
			$targetPage.style.display = 'block';

			if (!!$targetPage.getAttribute('data-bgm')) {
				win[namespace].soundStatus('play', 'bgm', $targetPage.getAttribute('data-bgm'));
			}

			!!callback && callback();
		},
		/**
		 * 
		 * @param {String} status (stop, play)
		 * @param {String} type (bgm, wrong, script, effect) 
		 * @param {String} name (intro, 01, 02 ...) 
		 * @param {function} callback
		 */
		soundStatus: function(status, type, name, callback){
			var soundType = type;
			if (type === 'wrong' || type === 'script') {
				soundType = 'script';
			}
			if (status === 'play') { // play status
				if (!document.querySelector('.' + name)) { // no have bgm tag
					var $audio = document.createElement('audio');
					var url = 'audio/' + type + '/' + name + '.mp3';
					$audio.setAttribute('class', name);
					$audio.classList.add('class', 'audio-' + soundType);
					$audio.setAttribute('src', url);
					$audio.setAttribute('name', 'audio/mpeg');
					if (type === 'bgm') {
						$audio.setAttribute('loop' ,'');
						$audio.volume = 0.4;
					}
					document.querySelector('body').appendChild($audio);
				} else {
					var $audio = document.querySelector('.' + name);
				}
				if (type !== 'effect') {
					muteByType(type);
				}
				if (!$audio.ended) {
					$audio.currentTime = 0;
				}
				$audio.play();

				// tobe : mp3 재생 끝날때 callback 실행시키도록
				!!callback && callback();
			} else { // stop status
				muteByType(type);
			}

			function muteByType(type) {
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
		 * @param {Number} progressIndex 
		 * @param {String} status (ing, right, wrong)
		 */
		progressStatus: function(progressIndex, status){
			var $progress = document.querySelectorAll('.progress-area > li');
			$progress[progressIndex].classList.add(status);
		},
		/**
		 * 
		 * @param {Object} script {text:String, voice:String, duration:Number, endBack:function}
		 * @param {Object} question {type:String, answer:Array}
		 */
		askQuestion: function(script, question){
			var text = script.text;
			var voice = script.voice;
			var fnEndBack = function(){
				win[namespace].willTimer = setTimeout(script.endBack, script.duration)
			};

			win[namespace].setText(text);

			// 질문이 있을때는 checkAnswer로 넘어감
			clearTimeout(win[namespace].willTimer);
			if (question === undefined){
				win[namespace].soundStatus('play', 'script', voice, fnEndBack);
			} else {
				win[namespace].soundStatus('play', 'script', voice);
				win[namespace].checkAnswer(script, question, script.endBack);
				// fnEndBack();
			}
		},
		/**
		 * 
		 * @param {Object} wrongScript  틀렸다는 음성 & 지문
		 * @param {function} endBack 
		 */
		wrongAnswer: function(wrongScript, endBack){
			var text = wrongScript.text;
			var voice = wrongScript.voice;
			var duration = wrongScript.duration;

			win[namespace].setText(text);
			document.querySelector('.question-area').style.display = 'none';
			win[namespace].soundStatus('play', 'wrong', voice);
			win[namespace].checkAnswerTry++;

			clearTimeout(win[namespace].willTimer);
			win[namespace].willTimer = setTimeout(function(){
				document.querySelector('.question-area').style.display = 'block';
				endBack();
			}, duration)
		},
		setText: function(text){
			var $text = document.querySelector('.txt-script span');
			$text.innerText = text;
		},
		/**
		 * 
		 * @param {} script 
		 * @param {Object} question 
				{
					type: 'word',
					answer: [
						['ㄱㅈ'],
						['고지', '고증', '고장'],
						['고장']
					]
				};
		 * @param {*} endBack 
		 */
		checkAnswerTry: 1,
		checkAnswer: function(script, question, endBack){
			var $questionArea = document.querySelector('.question-area');
			var $btnVoide = document.querySelector('.btn-voice');

			$questionArea.style.display='block';

			// [QuizType1] 단답형일 시
			if (question.type === 'word') {
				// answer check !! (question.answer[0])
				$questionArea.innerHTML = '<div class="single"></div>';
				var $questionInner = $questionArea.querySelector('.single');
				var answerText = question.answer[2][0];
				var reduceAnswerText = answerText.replace(/ /g,'');

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

				// 단어 세개 중 선택하기
				function setWordsAnswer() {
					$questionArea.classList.add('wide');
					$questionArea.innerHTML = '<div class="multiple"></div>';
					var $questionInner = $questionArea.querySelector('.multiple');
					var answerWords = question.answer[1];
					var multipleHTML = '';

					answerWords.forEach(function(item){
						multipleHTML += '<span>' + item.replace(/ /g,'') + '</span>';
					})
					$questionInner.innerHTML = multipleHTML;
				}

				// 첫번째 (글자수만 나오는거)
				setInitialAnswer(answerText, true);
				$btnVoide.addEventListener('click', startVoiceCheck);

				function startVoiceCheck(){
					var voiceText = getVoice();
					var tryNum = win[namespace].checkAnswerTry;
					win[namespace].soundStatus('stop', 'script');
					
					if (voiceText.reduceText.slice(0, reduceAnswerText.length) !== reduceAnswerText) {
						
						// 1트에 실패일 시, 초성 나옴
						if (tryNum === 1){
							win[namespace].setText(win[namespace].wrongScript[0][0].text);
							win[namespace].wrongAnswer(
								win[namespace].wrongScript[0][0], 
								function(){
									setInitialAnswer(question.answer[0][0]);
									win[namespace].soundStatus('play', 'script', script.voice);
									win[namespace].setText(script.text);
								}
							); // [To-be] 여기 랜덤으로
						} else if (tryNum === 2){
							win[namespace].setText(win[namespace].wrongScript[0][1].text);
							win[namespace].wrongAnswer(
								win[namespace].wrongScript[0][1], 
								function(){
									setWordsAnswer(); // multiple
									win[namespace].soundStatus('play', 'script', script.voice);
									win[namespace].setText(script.text);
								}
							); // [To-be] 여기 랜덤으로
						} else if (tryNum === 3){
							win[namespace].wrongAnswer(// [To-be] wrongAnswer()가 아니라, 으음~아쉬워 알려줄게! 랜덤으로
								win[namespace].wrongScript[1][2], 
								function(){ 
									// 여기서 멀티플 중에 .. 발음한 답이 있으면 그거 선택, 그리고 없으면 그냥 땡 하고 정답 선택. 만약 정답 맞으면 정답에 동그라미
									!!endBack && endBack();
								}
							);
							win[namespace].setText(win[namespace].wrongScript[1][2].text);
							setInitialAnswer(answerText);
							win[namespace].checkAnswerTry = 1;
							$btnVoide.removeEventListener('click', startVoiceCheck);
						}
					} else {
						// 성공일 시, 정답 모션
						setInitialAnswer(answerText);
						win[namespace].checkAnswerTry = 1;
						!!endBack && endBack();
						$btnVoide.removeEventListener('click', startVoiceCheck);
					}
				}

			} else if (question.type === 'ox') {
				// [QuizType2] O/X일 시

			}

			
			// 음성인식 실행해서 값 가져오기
			function getVoice(){
				var str = '음 고장 같아'; // 테스트용

				// window.HybridApp.startSilvySTTMode(0); // 여기 풀기
				// window.HybridApp.onResultSTTMode = function(str) { // 여기 풀기
					return {text: str, reduceText: str.replace(/(\s*)/g,'')};
				// } // 여기 풀기
			}
		},
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
					duration: 3000
				},
				{
					text: '아쉬워~ 한 번 더 생각해볼까?',
					voice: 'SSJ3b_A_05',
					duration: 3000
				},
			],
			[
				{
					text: '아쉬워~ 내가 설명해 줄게!',
					voice: 'SSJ3b_B_01',
					duration: 4000
				},
				{
					text: '잘 모르겠다면 내가 알려줄게!',
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
					text: '안녕? 나는 천재초등학교 3학년 1반 하늘이라고 해!',
					voice: 'SSJ310107_01',
					duration: 5800,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][1]);
					}
				},
				{
					text: '만나서 반가워~ 헤헷!',
					voice: 'SSJ310107_02',
					duration: 3500,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[0][2]);
					}
				},
				{
					text: '그런데, 여기가 어디냐고?',
					voice: 'SSJ310107_03',
					duration: 3800,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][0]);
					}
				}
			],
			[
				{
					text: '여긴 우리 동네야. 많은 사람들이 살고 있지.',
					voice: 'SSJ310107_04',
					duration: 5200,
					endBack: function(){
						// 여기서 박스 나타남
						win[namespace].askQuestion(
							win[namespace].speak[1][1],
							{
								type: 'word',
								answer: [
									['ㄱㅈ'],
									['고지', '고증', '고장'],
									['고장']
								]
							});
					}
				},
				{
					text: '사람들이 모여 사는 곳을 무엇이라고 하더라?',
					voice: 'SSJ310107_05',
					duration: 4500,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][2]);
					}
				},
				{
					text: '사람들이 모여 사는 곳을 고장이라고 해.',
					voice: 'SSJ310107_06',
					duration: 4500,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[1][3]);
					}
				},
				{
					text: '우리 고장의 여러 장소가 머릿속에 떠오르네!',
					voice: 'SSJ310107_07',
					duration: 5000,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][0]);
					}
				},
			],
			[
				{
					text: '그 중에서, 내가 제일 좋아하는 장소가 어디인지 맞춰볼래?',
					voice: 'SSJ310107_08',
					duration: 5800,
					endBack: function(){
						// 여기서 박스 나타남
						win[namespace].askQuestion(
							win[namespace].speak[2][1],
							{
								type: 'word',
								answer: [
									['ㄱㅈ'],
									['고지', '고증', '고장'],
									['고장']
								]
							}
						);
					}
				},
				{
					text: '이곳은, 친구들과 함께 교실에서 공부하고 운동장에서 재미있게 놀 수 있는 곳이야.',
					voice: 'SSJ310107_09',
					duration: 6000,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][2]);
					}
				},
				{
					text: '친구들과 함께 교실에서 공부하고 운동장에서 재미있게 노는 곳은 학교이지.',
					voice: 'SSJ310107_10',
					duration: 6500,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][3]);
					}
				},
				{
					text: '나중에 우리 고장의 장소 알림판에 학교를 꼭 소개할 테야. ',
					voice: 'SSJ310107_11',
					duration: 5500,
					endBack: function(){
						win[namespace].askQuestion(win[namespace].speak[2][4]);
					}
				},
				{
					text: '그때 꼭 도와줘야해! 알겠지?',
					voice: 'SSJ310107_12',
					duration: 4000,
					endBack: function(){
					}
				},
			]
		],
		init: function(){
			window.speakUp.goPage(0);
		}
	}

	document.addEventListener('DOMContentLoaded', function(){
		win[namespace].init();
	})

})(window, document);