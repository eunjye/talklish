/**
 * 
 * @param {String} status (ready, play)
 * @param {String} type (b:인사, c:기본, d:문제, e1 or e2 : 오답) 
 * @param {Number || String} duration (1000 || 'infinite')
 * @param {function} callback
 * @param {boolean} isVoice 음성인가?
 */
window.speakUp.animationTimer = {};
window.speakUp.animationStop = {};
window.speakUp.animationStatus = function(status, type, duration, callback, isVoice) {
	if (status === 'stop') {
		clearTimeout(window.speakUp.animationStop);
		cancelAnimationFrame(window.speakUp.animationTimer);
		return; 
	}
	
	var jsonSource = window.speakUp.sequence[type];

	var _cvs = document.querySelector('#canvasCharacter');
	var _ctx = _cvs.getContext('2d');
	var _maxFrame = 30;
	var _minHeight = 810;

	var _dx = 390;
	var _dy = 90;

	switch (type)	{
		case 'b':
		 _dx = 240;
		 break;

		case 'c':
		 _dx = 380;
		 break;

		case 'd':
		 _dx = 270;
		 break;

		case 'e1':
		 _dx = 400;
		 break;

		case 'e2':
		 _dx = 420;
		 break;
	}

	switch (type)	{

		case 'f':
		 _dy = 80;
		 break;

		case 'c':
		 _dy = 70;
		 break;

		case 'e2':
		 _dy = 90;
		 break;
	}

	_dx += 20;
	var _img = new Image();
	_img.src = 'img/ani/'+type+'.png';
	_img.onload = function(e) {
		_cvs.width = 1200;
		_cvs.height = _minHeight;

		_ctx.drawImage(_img, 0, 0, 700, _minHeight, _dx, _dy, 700, _minHeight); // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		_cvs.classList = 'type-'+type;

		if (status !== 'play'){
			!!callback && callback();
		}
	}

	if (status === 'play'){
		_img.onload = function(e) {

			if (isVoice){

				!!callback && callback();
				var isLoadedAudio = setInterval(function(){
					if (!!window.speakUp.currentVoiceStatus){
						doAnimation();
						window.speakUp.currentVoiceStatus = true;
						clearInterval(isLoadedAudio);
					}
				}, 50)
			} else {
				!!callback && callback();
				doAnimation();
			}
		}

		var count = 0;
		var frame = 10000;
		var frameLength = Object.keys(jsonSource.frames).length;
		// var frameLength = 50;
		clearTimeout(window.speakUp.animationStop);
		doAnimation();
				
		function doAnimation() {
			cancelAnimationFrame(window.speakUp.animationTimer);
			count++;
			frame = 10000 + parseInt(count/3);
			if (frame - 10000 < frameLength - 1) {
				setBgAndTimer();
			} else if (!duration) { // duration이 없을 땐 1세트만
				cancelAnimationFrame(window.speakUp.animationTimer);
			} else { // duration이 있고 시간이 아직 남았으면
				count = 0;

				if (type === 'f') {
					count = 27*3;
				}

				setBgAndTimer();
			}

			function setBgAndTimer() {
				var frameInfo = jsonSource.frames['character'+frame].frame;
				_cvs.width = _cvs.width;
				_ctx.drawImage(_img, frameInfo.x, frameInfo.y, frameInfo.w, _minHeight, _dx, _dy, frameInfo.w, _minHeight); // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
				window.speakUp.animationTimer = requestAnimationFrame(doAnimation)
			}
		}

		function endMotion() {
			frame = frameLength - 1 + 10000;

			switch (type) {
				case 'b':
				frame = frameLength - 8 + 10000;
				break;

				case 'c':
				frame = frameLength - 6 + 10000;
				break;

				case 'e2':
				frame = frameLength - 4 + 10000;
				break;

				case 'f':
				frame = frameLength - 4 + 10000;
				break;

			}
			var frameInfo = jsonSource.frames['character'+frame].frame;

			_cvs.width = _cvs.width;
			_ctx.drawImage(_img, frameInfo.x, frameInfo.y, frameInfo.w, _minHeight, _dx, _dy, frameInfo.w, _minHeight);
		}

		if (!!duration && duration !== 'infinite') {
			window.speakUp.animationStop = setTimeout(function(){
				endMotion();
				cancelAnimationFrame(window.speakUp.animationTimer);
			}, duration)
		} 
	}
	
}
window.speakUp.sequence = {
	b:{"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10001":
		{
			"frame": {"x":638,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10002":
		{
			"frame": {"x":1276,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10003":
		{
			"frame": {"x":1914,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10004":
		{
			"frame": {"x":2552,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10005":
		{
			"frame": {"x":3190,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10006":
		{
			"frame": {"x":3828,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10007":
		{
			"frame": {"x":0,"y":703,"w":638,"h":703},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10008":
		{
			"frame": {"x":638,"y":703,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10009":
		{
			"frame": {"x":1276,"y":703,"w":638,"h":703},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10010":
		{
			"frame": {"x":1914,"y":703,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10011":
		{
			"frame": {"x":2552,"y":703,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10012":
		{
			"frame": {"x":3190,"y":703,"w":638,"h":703},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10013":
		{
			"frame": {"x":3828,"y":703,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10014":
		{
			"frame": {"x":0,"y":1406,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10015":
		{
			"frame": {"x":638,"y":1406,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10016":
		{
			"frame": {"x":1276,"y":1406,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10017":
		{
			"frame": {"x":1914,"y":1406,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10018":
		{
			"frame": {"x":2552,"y":1406,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10019":
		{
			"frame": {"x":3190,"y":1406,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10020":
		{
			"frame": {"x":3828,"y":1406,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10021":
		{
			"frame": {"x":0,"y":2109,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10022":
		{
			"frame": {"x":638,"y":2109,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10023":
		{
			"frame": {"x":1276,"y":2109,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10024":
		{
			"frame": {"x":1914,"y":2109,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10025":
		{
			"frame": {"x":2552,"y":2109,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10026":
		{
			"frame": {"x":3190,"y":2109,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10027":
		{
			"frame": {"x":3828,"y":2109,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10028":
		{
			"frame": {"x":0,"y":2812,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10029":
		{
			"frame": {"x":638,"y":2812,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10030":
		{
			"frame": {"x":1276,"y":2812,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10031":
		{
			"frame": {"x":1914,"y":2812,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10032":
		{
			"frame": {"x":2552,"y":2812,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10033":
		{
			"frame": {"x":3190,"y":2812,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10034":
		{
			"frame": {"x":3828,"y":2812,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10035":
		{
			"frame": {"x":0,"y":3515,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10036":
		{
			"frame": {"x":638,"y":3515,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10037":
		{
			"frame": {"x":1276,"y":3515,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10038":
		{
			"frame": {"x":1914,"y":3515,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		},
		"character10039":
		{
			"frame": {"x":0,"y":0,"w":638,"h":703},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":638,"h":703},
			"sourceSize": {"w":638,"h":703}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.4.39603",
			"image": "b남2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		
		,
	c:{"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10001":
		{
			"frame": {"x":486,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10002":
		{
			"frame": {"x":972,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10003":
		{
			"frame": {"x":1458,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10004":
		{
			"frame": {"x":1944,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10005":
		{
			"frame": {"x":2430,"y":0,"w":486,"h":788},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10006":
		{
			"frame": {"x":2916,"y":0,"w":486,"h":788},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10007":
		{
			"frame": {"x":3402,"y":0,"w":486,"h":788},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10008":
		{
			"frame": {"x":3888,"y":0,"w":486,"h":788},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10009":
		{
			"frame": {"x":4374,"y":0,"w":486,"h":788},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10010":
		{
			"frame": {"x":0,"y":788,"w":486,"h":788},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10011":
		{
			"frame": {"x":486,"y":788,"w":486,"h":788},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10012":
		{
			"frame": {"x":972,"y":788,"w":486,"h":788},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10013":
		{
			"frame": {"x":1458,"y":788,"w":486,"h":788},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10014":
		{
			"frame": {"x":1944,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10015":
		{
			"frame": {"x":2430,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10016":
		{
			"frame": {"x":2916,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10017":
		{
			"frame": {"x":3402,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10018":
		{
			"frame": {"x":3888,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10019":
		{
			"frame": {"x":4374,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10021":
		{
			"frame": {"x":0,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10022":
		{
			"frame": {"x":0,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10023":
		{
			"frame": {"x":0,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10024":
		{
			"frame": {"x":4374,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10025":
		{
			"frame": {"x":4374,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10026":
		{
			"frame": {"x":4374,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10027":
		{
			"frame": {"x":4374,"y":788,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10028":
		{
			"frame": {"x":486,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10029":
		{
			"frame": {"x":486,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10030":
		{
			"frame": {"x":972,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10031":
		{
			"frame": {"x":1458,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10032":
		{
			"frame": {"x":1944,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10033":
		{
			"frame": {"x":2430,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10034":
		{
			"frame": {"x":2916,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10035":
		{
			"frame": {"x":3402,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10036":
		{
			"frame": {"x":3888,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10037":
		{
			"frame": {"x":4374,"y":1576,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10038":
		{
			"frame": {"x":0,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10039":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10040":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10041":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10042":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10043":
		{
			"frame": {"x":486,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10044":
		{
			"frame": {"x":486,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10045":
		{
			"frame": {"x":486,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10046":
		{
			"frame": {"x":486,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10047":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10048":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10049":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10050":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10051":
		{
			"frame": {"x":972,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10052":
		{
			"frame": {"x":972,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10053":
		{
			"frame": {"x":972,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10054":
		{
			"frame": {"x":972,"y":2363,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		},
		"character10055":
		{
			"frame": {"x":0,"y":0,"w":486,"h":787},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":486,"h":788},
			"sourceSize": {"w":486,"h":788}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "c남아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		,
	d: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10001":
		{
			"frame": {"x":762,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10002":
		{
			"frame": {"x":1524,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10003":
		{
			"frame": {"x":2286,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10004":
		{
			"frame": {"x":3048,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10005":
		{
			"frame": {"x":3810,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10006":
		{
			"frame": {"x":4572,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10007":
		{
			"frame": {"x":0,"y":704,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10008":
		{
			"frame": {"x":762,"y":704,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10009":
		{
			"frame": {"x":1524,"y":704,"w":770,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10010":
		{
			"frame": {"x":2294,"y":704,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10011":
		{
			"frame": {"x":3056,"y":704,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10012":
		{
			"frame": {"x":3818,"y":704,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10013":
		{
			"frame": {"x":4580,"y":704,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10014":
		{
			"frame": {"x":0,"y":1408,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10015":
		{
			"frame": {"x":762,"y":1408,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10016":
		{
			"frame": {"x":1524,"y":1408,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10017":
		{
			"frame": {"x":2286,"y":1408,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10018":
		{
			"frame": {"x":3048,"y":1408,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10019":
		{
			"frame": {"x":3810,"y":1408,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10020":
		{
			"frame": {"x":4572,"y":1408,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10021":
		{
			"frame": {"x":0,"y":2112,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10022":
		{
			"frame": {"x":762,"y":2112,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10023":
		{
			"frame": {"x":1524,"y":2112,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10024":
		{
			"frame": {"x":2286,"y":2112,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10025":
		{
			"frame": {"x":3048,"y":2112,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10026":
		{
			"frame": {"x":3810,"y":2112,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10027":
		{
			"frame": {"x":4572,"y":2112,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10028":
		{
			"frame": {"x":0,"y":2816,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10029":
		{
			"frame": {"x":762,"y":2816,"w":763,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10030":
		{
			"frame": {"x":1525,"y":2816,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10031":
		{
			"frame": {"x":2287,"y":2816,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10032":
		{
			"frame": {"x":3049,"y":2816,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10033":
		{
			"frame": {"x":3811,"y":2816,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10034":
		{
			"frame": {"x":4573,"y":2816,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10035":
		{
			"frame": {"x":0,"y":3520,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10036":
		{
			"frame": {"x":762,"y":3520,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10037":
		{
			"frame": {"x":1524,"y":3520,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10038":
		{
			"frame": {"x":2286,"y":3520,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10039":
		{
			"frame": {"x":3048,"y":3520,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10040":
		{
			"frame": {"x":3810,"y":3520,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10041":
		{
			"frame": {"x":4572,"y":3520,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10042":
		{
			"frame": {"x":0,"y":4224,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10043":
		{
			"frame": {"x":762,"y":4224,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10044":
		{
			"frame": {"x":1524,"y":4224,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10045":
		{
			"frame": {"x":2286,"y":4224,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10046":
		{
			"frame": {"x":3048,"y":4224,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10047":
		{
			"frame": {"x":3810,"y":4224,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		},
		"character10048":
		{
			"frame": {"x":0,"y":0,"w":762,"h":704},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":2,"y":0,"w":770,"h":704},
			"sourceSize": {"w":770,"h":704}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "d남아2.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
		}
		
		,
	e1:{"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10001":
		{
			"frame": {"x":537,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10002":
		{
			"frame": {"x":1074,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10003":
		{
			"frame": {"x":1611,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10004":
		{
			"frame": {"x":2148,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10005":
		{
			"frame": {"x":2685,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10006":
		{
			"frame": {"x":3222,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10007":
		{
			"frame": {"x":3759,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10008":
		{
			"frame": {"x":4296,"y":0,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10009":
		{
			"frame": {"x":0,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10010":
		{
			"frame": {"x":537,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10011":
		{
			"frame": {"x":1074,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10012":
		{
			"frame": {"x":1611,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10013":
		{
			"frame": {"x":2148,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10014":
		{
			"frame": {"x":2685,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10015":
		{
			"frame": {"x":3222,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10016":
		{
			"frame": {"x":3759,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10017":
		{
			"frame": {"x":3759,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10018":
		{
			"frame": {"x":4296,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10019":
		{
			"frame": {"x":4296,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10021":
		{
			"frame": {"x":537,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10022":
		{
			"frame": {"x":1074,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10023":
		{
			"frame": {"x":1611,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10024":
		{
			"frame": {"x":2148,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10025":
		{
			"frame": {"x":2148,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10026":
		{
			"frame": {"x":2685,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10027":
		{
			"frame": {"x":2148,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10028":
		{
			"frame": {"x":1611,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10029":
		{
			"frame": {"x":1074,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10030":
		{
			"frame": {"x":1074,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10031":
		{
			"frame": {"x":537,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10032":
		{
			"frame": {"x":3222,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10033":
		{
			"frame": {"x":3759,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10034":
		{
			"frame": {"x":4296,"y":1392,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10035":
		{
			"frame": {"x":0,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10036":
		{
			"frame": {"x":537,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10037":
		{
			"frame": {"x":537,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10038":
		{
			"frame": {"x":537,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10039":
		{
			"frame": {"x":537,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10040":
		{
			"frame": {"x":4296,"y":696,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10041":
		{
			"frame": {"x":1074,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10042":
		{
			"frame": {"x":1611,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10043":
		{
			"frame": {"x":2148,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10044":
		{
			"frame": {"x":2685,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10045":
		{
			"frame": {"x":3222,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10046":
		{
			"frame": {"x":3759,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10047":
		{
			"frame": {"x":4296,"y":2088,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10048":
		{
			"frame": {"x":0,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10049":
		{
			"frame": {"x":537,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10050":
		{
			"frame": {"x":1074,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10051":
		{
			"frame": {"x":1074,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10052":
		{
			"frame": {"x":1611,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10053":
		{
			"frame": {"x":2148,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10054":
		{
			"frame": {"x":2685,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10055":
		{
			"frame": {"x":2685,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10056":
		{
			"frame": {"x":3222,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10057":
		{
			"frame": {"x":3759,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10058":
		{
			"frame": {"x":4296,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10059":
		{
			"frame": {"x":4296,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10060":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10061":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10062":
		{
			"frame": {"x":537,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10063":
		{
			"frame": {"x":1074,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10064":
		{
			"frame": {"x":1611,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10065":
		{
			"frame": {"x":2148,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10066":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10067":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10068":
		{
			"frame": {"x":3222,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10069":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10070":
		{
			"frame": {"x":3759,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10071":
		{
			"frame": {"x":4296,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10072":
		{
			"frame": {"x":4296,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10073":
		{
			"frame": {"x":0,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10074":
		{
			"frame": {"x":2148,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10075":
		{
			"frame": {"x":1611,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10076":
		{
			"frame": {"x":537,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10077":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10078":
		{
			"frame": {"x":3759,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10079":
		{
			"frame": {"x":3759,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10080":
		{
			"frame": {"x":3759,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10081":
		{
			"frame": {"x":3222,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10082":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10083":
		{
			"frame": {"x":537,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10084":
		{
			"frame": {"x":1611,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10085":
		{
			"frame": {"x":1074,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10086":
		{
			"frame": {"x":2148,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10087":
		{
			"frame": {"x":1074,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10088":
		{
			"frame": {"x":1611,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10089":
		{
			"frame": {"x":2148,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10090":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10091":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10092":
		{
			"frame": {"x":1074,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10093":
		{
			"frame": {"x":1074,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10094":
		{
			"frame": {"x":0,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10095":
		{
			"frame": {"x":2685,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10096":
		{
			"frame": {"x":0,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10097":
		{
			"frame": {"x":3222,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10098":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10099":
		{
			"frame": {"x":4296,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10100":
		{
			"frame": {"x":4296,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10101":
		{
			"frame": {"x":4296,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10102":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10103":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10104":
		{
			"frame": {"x":3222,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10105":
		{
			"frame": {"x":2685,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10106":
		{
			"frame": {"x":3759,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10107":
		{
			"frame": {"x":4296,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10108":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10109":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10110":
		{
			"frame": {"x":3222,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10111":
		{
			"frame": {"x":2685,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10112":
		{
			"frame": {"x":2148,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10113":
		{
			"frame": {"x":1611,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10114":
		{
			"frame": {"x":1611,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10115":
		{
			"frame": {"x":1074,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10116":
		{
			"frame": {"x":2148,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10117":
		{
			"frame": {"x":1611,"y":2784,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10118":
		{
			"frame": {"x":537,"y":4176,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		},
		"character10119":
		{
			"frame": {"x":0,"y":3480,"w":537,"h":696},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":537,"h":696},
			"sourceSize": {"w":537,"h":696}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "e1남아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		
		
		,
	e2: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10001":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10002":
		{
			"frame": {"x":460,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10003":
		{
			"frame": {"x":920,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10004":
		{
			"frame": {"x":1380,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10005":
		{
			"frame": {"x":1840,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10006":
		{
			"frame": {"x":2300,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10007":
		{
			"frame": {"x":2760,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10008":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10009":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10010":
		{
			"frame": {"x":3220,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10011":
		{
			"frame": {"x":3680,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10012":
		{
			"frame": {"x":4140,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10013":
		{
			"frame": {"x":0,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10014":
		{
			"frame": {"x":460,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10015":
		{
			"frame": {"x":920,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10016":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10017":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10018":
		{
			"frame": {"x":460,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10019":
		{
			"frame": {"x":920,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10020":
		{
			"frame": {"x":1380,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10021":
		{
			"frame": {"x":1840,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10022":
		{
			"frame": {"x":2300,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10023":
		{
			"frame": {"x":2760,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10024":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10025":
		{
			"frame": {"x":0,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10026":
		{
			"frame": {"x":1380,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10027":
		{
			"frame": {"x":1840,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10028":
		{
			"frame": {"x":4140,"y":0,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10029":
		{
			"frame": {"x":0,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10030":
		{
			"frame": {"x":460,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		},
		"character10031":
		{
			"frame": {"x":920,"y":705,"w":460,"h":705},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":460,"h":705},
			"sourceSize": {"w":460,"h":705}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "e2남아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		,
	f: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10001":
		{
			"frame": {"x":0,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10002":
		{
			"frame": {"x":0,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10003":
		{
			"frame": {"x":0,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10004":
		{
			"frame": {"x":532,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10005":
		{
			"frame": {"x":532,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10006":
		{
			"frame": {"x":532,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10007":
		{
			"frame": {"x":532,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10008":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10009":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10010":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10011":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10012":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10013":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10014":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10015":
		{
			"frame": {"x":0,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10016":
		{
			"frame": {"x":532,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10017":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10018":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10019":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10020":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10021":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10022":
		{
			"frame": {"x":3724,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10023":
		{
			"frame": {"x":4256,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10024":
		{
			"frame": {"x":0,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10025":
		{
			"frame": {"x":532,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10026":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10027":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10028":
		{
			"frame": {"x":1596,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10029":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10030":
		{
			"frame": {"x":2128,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10031":
		{
			"frame": {"x":2660,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10032":
		{
			"frame": {"x":3192,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10033":
		{
			"frame": {"x":3724,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10034":
		{
			"frame": {"x":4256,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10035":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10036":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10037":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10038":
		{
			"frame": {"x":0,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10039":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10040":
		{
			"frame": {"x":532,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10041":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10042":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10043":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10044":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10045":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10046":
		{
			"frame": {"x":4256,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10047":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10048":
		{
			"frame": {"x":0,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10049":
		{
			"frame": {"x":532,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10050":
		{
			"frame": {"x":532,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10051":
		{
			"frame": {"x":1064,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10052":
		{
			"frame": {"x":1596,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10053":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10054":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10055":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10056":
		{
			"frame": {"x":1596,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10057":
		{
			"frame": {"x":2128,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10058":
		{
			"frame": {"x":2660,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10059":
		{
			"frame": {"x":2128,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10060":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10061":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10062":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10063":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10064":
		{
			"frame": {"x":532,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10065":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10066":
		{
			"frame": {"x":0,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10067":
		{
			"frame": {"x":3192,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10068":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10069":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10070":
		{
			"frame": {"x":4256,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10071":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10072":
		{
			"frame": {"x":0,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10073":
		{
			"frame": {"x":532,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10074":
		{
			"frame": {"x":532,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10075":
		{
			"frame": {"x":1064,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10076":
		{
			"frame": {"x":1596,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10077":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10078":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10079":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10080":
		{
			"frame": {"x":1596,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10081":
		{
			"frame": {"x":2128,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10082":
		{
			"frame": {"x":3724,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10083":
		{
			"frame": {"x":3724,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10084":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10085":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10086":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10087":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10088":
		{
			"frame": {"x":532,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10089":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10090":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10091":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10092":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10093":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10094":
		{
			"frame": {"x":3724,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10095":
		{
			"frame": {"x":4256,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10096":
		{
			"frame": {"x":0,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10097":
		{
			"frame": {"x":532,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10098":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10099":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10100":
		{
			"frame": {"x":1596,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10101":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10102":
		{
			"frame": {"x":2128,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10103":
		{
			"frame": {"x":2660,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10104":
		{
			"frame": {"x":3192,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10105":
		{
			"frame": {"x":3724,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10106":
		{
			"frame": {"x":4256,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10107":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10108":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10109":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10110":
		{
			"frame": {"x":0,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10111":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10112":
		{
			"frame": {"x":532,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10113":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10114":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10115":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10116":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10117":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10118":
		{
			"frame": {"x":4256,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10119":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10120":
		{
			"frame": {"x":0,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10121":
		{
			"frame": {"x":532,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10122":
		{
			"frame": {"x":532,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10123":
		{
			"frame": {"x":1064,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10124":
		{
			"frame": {"x":1596,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10125":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10126":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10127":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10128":
		{
			"frame": {"x":1596,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10129":
		{
			"frame": {"x":2128,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10130":
		{
			"frame": {"x":2660,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10131":
		{
			"frame": {"x":2128,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10132":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10133":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10134":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10135":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10136":
		{
			"frame": {"x":532,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10137":
		{
			"frame": {"x":1064,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10138":
		{
			"frame": {"x":0,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10139":
		{
			"frame": {"x":3192,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10140":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10141":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10142":
		{
			"frame": {"x":4256,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10143":
		{
			"frame": {"x":3192,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10144":
		{
			"frame": {"x":0,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10145":
		{
			"frame": {"x":532,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10146":
		{
			"frame": {"x":532,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10147":
		{
			"frame": {"x":1064,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10148":
		{
			"frame": {"x":1596,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10149":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10150":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10151":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10152":
		{
			"frame": {"x":1596,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10153":
		{
			"frame": {"x":2128,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10154":
		{
			"frame": {"x":3724,"y":2118,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10155":
		{
			"frame": {"x":3724,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10156":
		{
			"frame": {"x":2660,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10157":
		{
			"frame": {"x":2128,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10158":
		{
			"frame": {"x":1596,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10159":
		{
			"frame": {"x":1064,"y":1412,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		},
		"character10160":
		{
			"frame": {"x":532,"y":706,"w":532,"h":706},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":706},
			"sourceSize": {"w":532,"h":706}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "f남아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		
		
}
