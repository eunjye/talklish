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
		/**
		 * @name goToNPage
		 * @param {Number} targetIndex 
		 * @param {HTMLElement} $evtEl 
		 */
		goPage: function(targetIndex, $evtEl, callback){
			var $targetPage = document.querySelector('[data-index="' + targetIndex + '"]');
			if (!!$evtEl) {
				var $evtPage = $evtEl.closestByClass('page-area');
				console.log($evtPage);
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
		 * @param {String} type (bgm, voice, script, effect) 
		 * @param {String} name (intro, 01, 02 ...) 
		 * @param {function} callback
		 */
		soundStatus: function(status, type, name, callback){
			
			if (status === 'play') { // play status
				if (!document.querySelector('.' + name)) { // no have bgm tag
					var $audio = document.createElement('audio');
					var url = 'audio/' + type + '/' + name + '.mp3';
					$audio.setAttribute('class', name);
					$audio.classList.add('class', 'audio-' + type);
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
				var $otherAudio = document.querySelectorAll('[class*=audio-' + type + ']');
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
		 * @param {Object} speak {text:String, voice:String, duration:Number, endBack:function}
		 * @param {Object} question {type:String, answer:Array}
		 */
		askQuestion: function(script, question){
			var text = script.text;
			var voice = script.voice;
			var fnEndBack = function(){
				setTimeout(script.endBack, script.duration)
			};

			win[namespace].setText(text);
			win[namespace].soundStatus('play', 'script', voice, fnEndBack);

			if (question !== undefined){
				setTimeout(function(){
					win[namespace].checkAnswer(script, question);
				}, script.duration);
			}
		},
		wrongAnswer: function(script){
			var text = script.text;
			var voice = script.voice;

			win[namespace].setText(text);
			win[namespace].soundStatus('play', 'wrong', voice);
			document.querySelector('.question-area').style.display = 'none';
		},
		setText: function(text){
			var $text = document.querySelector('.txt-script span');
			$text.innerText = text;
		},
		checkAnswer: function(script, question){
			var $questionArea = document.querySelector('.question-area');

			if (question.type === 'word') {
				// answer check !! (question.question[0])
				$questionArea.style.display='block';
				$questionArea.innerHTML = '<div class="single"></div>';
				var $questionInner = $questionArea.querySelector('.single');
				
				// 첫번째 녹음하기
        if (externalManager.isPlayer() || true) { // [to-be] true는 나중에 빼야함
					var answerWord = question.answer[2][0];
					var initialAnswer = question.answer[0][0];
					var reduceAnswerWord = answerWord.replace(/(\s*)/g,'');
					var answerLength = reduceAnswerWord.length;

					var voice = getVoice();
					if (voice.reduceText.substring(0, answerLength) === reduceAnswerWord) {
						// 맞았을 때 (1트)
						setInitialAnswer(answerWord);
					} else {
						// 틀렸을 때 (1트)
						win[namespace].wrongAnswer(win[namespace].wrongSpeak[0]); // [to-be] 이거 랜덤으로 해야됨

						setTimeout(function(){
							setInitialAnswer(initialAnswer);
							$questionArea.style.display='block';
	
							win[namespace].askQuestion(script);
						}, win[namespace].wrongSpeak[0].duration);
					}

					// 초성값 .single에 넣기
					function setInitialAnswer(initial) {
						var resultHTML = '';
						for(var i = 0; i < initial.length; i++) {
							if (initial[i] === ' ') {
								resultHTML += '&nbsp;';
							} else {
								resultHTML += '<span>' + initial[i] + '</span>';
							}
						}
						$questionInner.innerHTML = resultHTML;
					}

					// 음성인식 실행해서 값 가져오기
					function getVoice(){
						var str = '음 디지털 영상 지도 아니니'; // 테스트용

						// window.HybridApp.startSilvySTTMode(0); // 여기 풀기
						// window.HybridApp.onResultSTTMode = function(str) { // 여기 풀기
							return {text: str, reduceText: str.replace(/(\s*)/g,'')};
						// } // 여기 풀기
					}
				} else {
					setSilvyText("버리야 안녕 나는 씩씩한 냥이야. 도덕 공부를 하고 있어.");
				}

			} else if (question.type === 'ox') {

			}
		},
		wrongSpeak: [
			{
				text: '다시 한번 생각해보자!',
				voice: 'SSJ3b_A_01',
				duration: 5800
			},
			{
				text: '조금 더 생각해보자!',
				voice: 'SSJ3b_A_02',
				duration: 5800
			},
			{
				text: '한 번 더 생각해볼까?',
				voice: 'SSJ3b_A_03',
				duration: 5800
			},
			{
				text: '글쎄, 한 번 더 생각해봐!',
				voice: 'SSJ3b_A_04',
				duration: 5800
			},
			{
				text: '아쉬워~ 한 번 더 생각해볼까?',
				voice: 'SSJ3b_A_05',
				duration: 5800
			},
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
									['ㄷㅈㅌ ㅇㅅ ㅈㄷ'],
									['디지털 영상 지도', '디지털 인식 지도', '디지털 안심 지도'],
									['디지털 영상 지도']
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
					voice: 'SSJ310107_06'
				},
				{
					text: '우리 고장의 여러 장소가 머릿속에 떠오르네!',
					voice: 'SSJ310107_07'
				},
			],
			[
				{
					text: '그 중에서, 내가 제일 좋아하는 장소가 어디인지 맞춰볼래?',
					voice: 'SSJ310107_08'
				},
				{
					text: '이곳은, 친구들과 함께 교실에서 공부하고 운동장에서 재미있게 놀 수 있는 곳이야.',
					voice: 'SSJ310107_09'
				},
				{
					text: '친구들과 함께 교실에서 공부하고 운동장에서 재미있게 노는 곳은 학교이지.',
					voice: 'SSJ310107_10'
				},
				{
					text: '나중에 우리 고장의 장소 알림판에 학교를 꼭 소개할 테야. ',
					voice: 'SSJ310107_11'
				},
				{
					text: '그때 꼭 도와줘야해! 알겠지?',
					voice: 'SSJ310107_12'
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