/**
 * 
 * @param {String} status (ready, play)
 * @param {String} type (b:인사, c:기본, d:문제, e1 or e2 : 오답) 
 * @param {Number || String} duration (1000 || 'infinite')
 * @param {function} callback
 */
window.speakUp.animationTimer = {};
window.speakUp.animationStop = {};
window.speakUp.animationStatus = function(status, type, duration, callback) {
	if (status === 'stop') {
		clearTimeout(window.speakUp.animationStop);
		cancelAnimationFrame(window.speakUp.animationTimer);
		return; 
	}
	
	var jsonSource = window.speakUp.sequence[type];

	var _cvs = document.querySelector('#canvasCharacter');
	var _ctx = _cvs.getContext('2d');
	var _maxFrame = 30;
	var _minHeight = 604;

	var _dx = 360;
	var _dy = 10;

	switch (type)	{
		case 'b':
		_dx = 315;
		break;

	case 'd':
		_dx = 340;
		break;

	case 'e2':
		_dx = 340;
		break;

		case 'f':
		_dx = 420;
		break;
	}

	switch (type)	{
		case 'f':
		_dy = 0;
		break;

		case 'b':
		_dy = 20;
		break;
	}

	var _img = new Image();
	_img.src = 'img/ani/'+type+'.png';
	_img.onload = function(e) {
		_cvs.width = 1200;
		_cvs.height = _minHeight;

		_ctx.drawImage(_img, 0, 0, 532, _minHeight, _dx, _dy, 532, _minHeight); // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

		if (status !== 'play'){
				setTimeout(function(){
				!!callback && callback();
			}, 200)
			}
	}

	if (status === 'play'){
		_img.onload = function(e) {
			doAnimation();

			setTimeout(function(){
				!!callback && callback();
			}, 200)
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
	b: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10010":
		{
			"frame": {"x":0,"y":604,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10011":
		{
			"frame": {"x":532,"y":604,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":604,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":604,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":604,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":604,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":604,"w":532,"h":606},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":604,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":604,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":604,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1211,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1211,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1211,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1211,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1211,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1211,"w":532,"h":607},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1211,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1211,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1211,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1211,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10031":
		{
			"frame": {"x":532,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10034":
		{
			"frame": {"x":0,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10035":
		{
			"frame": {"x":532,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10036":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10037":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10038":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10039":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10040":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10041":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10042":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10043":
		{
			"frame": {"x":2128,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10044":
		{
			"frame": {"x":2660,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10045":
		{
			"frame": {"x":3192,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10046":
		{
			"frame": {"x":3724,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10047":
		{
			"frame": {"x":4256,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10048":
		{
			"frame": {"x":4788,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10049":
		{
			"frame": {"x":0,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10050":
		{
			"frame": {"x":532,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10051":
		{
			"frame": {"x":1064,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10052":
		{
			"frame": {"x":1596,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10053":
		{
			"frame": {"x":2128,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10054":
		{
			"frame": {"x":2660,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10055":
		{
			"frame": {"x":3192,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10056":
		{
			"frame": {"x":3724,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10057":
		{
			"frame": {"x":4256,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10058":
		{
			"frame": {"x":4788,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10059":
		{
			"frame": {"x":0,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10060":
		{
			"frame": {"x":532,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10061":
		{
			"frame": {"x":4788,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10062":
		{
			"frame": {"x":1064,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10063":
		{
			"frame": {"x":1596,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10064":
		{
			"frame": {"x":2128,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10065":
		{
			"frame": {"x":2660,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10066":
		{
			"frame": {"x":3192,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10067":
		{
			"frame": {"x":3724,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10068":
		{
			"frame": {"x":0,"y":0,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "b여1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
		}
		,
	c: {
		"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10010":
		{
			"frame": {"x":0,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10011":
		{
			"frame": {"x":532,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":668,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1336,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1336,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1336,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1336,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1336,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1336,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1336,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1336,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1336,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1336,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10030":
		{
			"frame": {"x":0,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10031":
		{
			"frame": {"x":532,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10034":
		{
			"frame": {"x":2128,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":2004,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10045":
		{
			"frame": {"x":2660,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10046":
		{
			"frame": {"x":3192,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10047":
		{
			"frame": {"x":3724,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10048":
		{
			"frame": {"x":4256,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10049":
		{
			"frame": {"x":4788,"y":2671,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "c여아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
	},
	d: {
		"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10010":
		{
			"frame": {"x":0,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10011":
		{
			"frame": {"x":532,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10031":
		{
			"frame": {"x":532,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10034":
		{
			"frame": {"x":2128,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":1881,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10045":
		{
			"frame": {"x":2660,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10046":
		{
			"frame": {"x":3192,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10047":
		{
			"frame": {"x":3724,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10048":
		{
			"frame": {"x":4256,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10049":
		{
			"frame": {"x":4788,"y":2508,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "d여아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
	},
	e1: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10010":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10011":
		{
			"frame": {"x":0,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10012":
		{
			"frame": {"x":532,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10013":
		{
			"frame": {"x":1064,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10014":
		{
			"frame": {"x":1596,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10015":
		{
			"frame": {"x":2128,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10016":
		{
			"frame": {"x":2660,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10017":
		{
			"frame": {"x":3192,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10018":
		{
			"frame": {"x":3724,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10019":
		{
			"frame": {"x":4256,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10020":
		{
			"frame": {"x":4788,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10021":
		{
			"frame": {"x":0,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10022":
		{
			"frame": {"x":532,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10023":
		{
			"frame": {"x":1064,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10024":
		{
			"frame": {"x":1596,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10025":
		{
			"frame": {"x":2128,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10026":
		{
			"frame": {"x":2660,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10027":
		{
			"frame": {"x":3192,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10028":
		{
			"frame": {"x":3724,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10029":
		{
			"frame": {"x":4256,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10030":
		{
			"frame": {"x":4788,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10031":
		{
			"frame": {"x":0,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10032":
		{
			"frame": {"x":532,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10033":
		{
			"frame": {"x":1064,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10034":
		{
			"frame": {"x":1596,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10035":
		{
			"frame": {"x":2128,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10036":
		{
			"frame": {"x":2660,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10037":
		{
			"frame": {"x":3192,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10038":
		{
			"frame": {"x":3724,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10039":
		{
			"frame": {"x":3724,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10040":
		{
			"frame": {"x":4256,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10041":
		{
			"frame": {"x":4788,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10042":
		{
			"frame": {"x":0,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10043":
		{
			"frame": {"x":532,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10044":
		{
			"frame": {"x":1064,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10045":
		{
			"frame": {"x":1596,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10046":
		{
			"frame": {"x":2128,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10047":
		{
			"frame": {"x":4788,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10048":
		{
			"frame": {"x":2660,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10049":
		{
			"frame": {"x":3724,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10050":
		{
			"frame": {"x":3192,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10051":
		{
			"frame": {"x":4788,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10052":
		{
			"frame": {"x":3192,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10053":
		{
			"frame": {"x":3724,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10054":
		{
			"frame": {"x":3724,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10055":
		{
			"frame": {"x":4256,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10056":
		{
			"frame": {"x":4788,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10057":
		{
			"frame": {"x":3192,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10058":
		{
			"frame": {"x":3724,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10059":
		{
			"frame": {"x":4256,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10060":
		{
			"frame": {"x":4788,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10061":
		{
			"frame": {"x":0,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10062":
		{
			"frame": {"x":532,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10063":
		{
			"frame": {"x":1064,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10064":
		{
			"frame": {"x":1596,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10065":
		{
			"frame": {"x":2128,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10066":
		{
			"frame": {"x":2660,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10067":
		{
			"frame": {"x":3192,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10068":
		{
			"frame": {"x":3724,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10069":
		{
			"frame": {"x":3724,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10070":
		{
			"frame": {"x":4256,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10071":
		{
			"frame": {"x":4788,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10072":
		{
			"frame": {"x":0,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10073":
		{
			"frame": {"x":532,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10074":
		{
			"frame": {"x":0,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10075":
		{
			"frame": {"x":532,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10076":
		{
			"frame": {"x":2128,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10077":
		{
			"frame": {"x":4788,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10078":
		{
			"frame": {"x":2660,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10079":
		{
			"frame": {"x":3724,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10080":
		{
			"frame": {"x":3192,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10081":
		{
			"frame": {"x":4788,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10082":
		{
			"frame": {"x":1064,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10083":
		{
			"frame": {"x":1596,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10084":
		{
			"frame": {"x":1596,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10085":
		{
			"frame": {"x":2128,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10086":
		{
			"frame": {"x":2660,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10087":
		{
			"frame": {"x":3192,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10088":
		{
			"frame": {"x":3724,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10089":
		{
			"frame": {"x":4256,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10090":
		{
			"frame": {"x":4788,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10091":
		{
			"frame": {"x":0,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10092":
		{
			"frame": {"x":1596,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10093":
		{
			"frame": {"x":2660,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10094":
		{
			"frame": {"x":532,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10095":
		{
			"frame": {"x":0,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10096":
		{
			"frame": {"x":2660,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10097":
		{
			"frame": {"x":3192,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10098":
		{
			"frame": {"x":3724,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10099":
		{
			"frame": {"x":3724,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10100":
		{
			"frame": {"x":4256,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "e1여아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
		}
		,
	e2: {
		"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10010":
		{
			"frame": {"x":0,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10011":
		{
			"frame": {"x":532,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1254,"w":532,"h":627},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":627},
			"sourceSize": {"w":532,"h":627}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "e2여아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":4000},
			"scale": "1"
		}
	},
	f: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10001":
		{
			"frame": {"x":0,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10002":
		{
			"frame": {"x":0,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10003":
		{
			"frame": {"x":0,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10004":
		{
			"frame": {"x":568,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10005":
		{
			"frame": {"x":1136,"y":0,"w":568,"h":657},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10006":
		{
			"frame": {"x":1704,"y":0,"w":568,"h":664},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10007":
		{
			"frame": {"x":2272,"y":0,"w":568,"h":669},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10008":
		{
			"frame": {"x":2840,"y":0,"w":568,"h":673},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10009":
		{
			"frame": {"x":3408,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10010":
		{
			"frame": {"x":3976,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10011":
		{
			"frame": {"x":4544,"y":0,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10012":
		{
			"frame": {"x":0,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10013":
		{
			"frame": {"x":568,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10014":
		{
			"frame": {"x":1136,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10015":
		{
			"frame": {"x":1704,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10016":
		{
			"frame": {"x":2272,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10017":
		{
			"frame": {"x":2840,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10018":
		{
			"frame": {"x":3408,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10019":
		{
			"frame": {"x":3976,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10020":
		{
			"frame": {"x":4544,"y":673,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10021":
		{
			"frame": {"x":0,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10022":
		{
			"frame": {"x":568,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10023":
		{
			"frame": {"x":1136,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10024":
		{
			"frame": {"x":1704,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10025":
		{
			"frame": {"x":2272,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10026":
		{
			"frame": {"x":2840,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10027":
		{
			"frame": {"x":3408,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10028":
		{
			"frame": {"x":3976,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10029":
		{
			"frame": {"x":4544,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10031":
		{
			"frame": {"x":568,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10032":
		{
			"frame": {"x":1136,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10033":
		{
			"frame": {"x":1704,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10034":
		{
			"frame": {"x":2272,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10035":
		{
			"frame": {"x":2840,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10036":
		{
			"frame": {"x":3408,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10037":
		{
			"frame": {"x":3976,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10038":
		{
			"frame": {"x":4544,"y":1945,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10039":
		{
			"frame": {"x":0,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10040":
		{
			"frame": {"x":568,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10041":
		{
			"frame": {"x":1136,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10042":
		{
			"frame": {"x":1704,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10043":
		{
			"frame": {"x":2272,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10044":
		{
			"frame": {"x":2840,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10045":
		{
			"frame": {"x":3408,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10046":
		{
			"frame": {"x":3976,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10047":
		{
			"frame": {"x":4544,"y":2581,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10048":
		{
			"frame": {"x":0,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10049":
		{
			"frame": {"x":568,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10050":
		{
			"frame": {"x":1136,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10051":
		{
			"frame": {"x":1704,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10052":
		{
			"frame": {"x":568,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10053":
		{
			"frame": {"x":2272,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10054":
		{
			"frame": {"x":2840,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10055":
		{
			"frame": {"x":1136,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10056":
		{
			"frame": {"x":3408,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10057":
		{
			"frame": {"x":3976,"y":3217,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10058":
		{
			"frame": {"x":2840,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10059":
		{
			"frame": {"x":3408,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		},
		"character10060":
		{
			"frame": {"x":3976,"y":1309,"w":568,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":568,"h":673},
			"sourceSize": {"w":568,"h":673}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "f여아1_1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
		}
		
		
}
