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
	var _minHeight = 730;

	var _dx = 370;

	switch (type)	{
		case 'b':
		 _dx = 240;
		 break;

		case 'd':
		 _dx = 270;
		 break;

		case 'f':
		 _dx = 380;
		 break;
	}

	var _img = new Image();
	_img.src = 'img/ani/'+type+'.png';
	_img.onload = function(e) {
		_cvs.width = 1200;
		_cvs.height = _minHeight;

		_ctx.drawImage(_img, 0, 0, 700, _minHeight, _dx, 0, 700, _minHeight); // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		_cvs.classList = 'type-'+type;

		!!callback && callback();
	}

	if (status === 'play'){
		_img.onload = function(e) {
			_cvs.classList = 'type-'+type;
			doAnimation();
			!!callback && callback();
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
				_ctx.drawImage(_img, frameInfo.x, frameInfo.y, frameInfo.w, _minHeight, _dx, 0, frameInfo.w, _minHeight); // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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
				frame = frameLength - 5 + 10000;
				break;

			}
			var frameInfo = jsonSource.frames['character'+frame].frame;

			_cvs.width = _cvs.width;
			_ctx.drawImage(_img, frameInfo.x, frameInfo.y, frameInfo.w, _minHeight, _dx, 0, frameInfo.w, _minHeight);
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
			"frame": {"x":0,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10001":
		{
			"frame": {"x":621,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10002":
		{
			"frame": {"x":1242,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10003":
		{
			"frame": {"x":1863,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10004":
		{
			"frame": {"x":2484,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10005":
		{
			"frame": {"x":3105,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10006":
		{
			"frame": {"x":3726,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10007":
		{
			"frame": {"x":4347,"y":0,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10008":
		{
			"frame": {"x":0,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10009":
		{
			"frame": {"x":621,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10010":
		{
			"frame": {"x":1242,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10011":
		{
			"frame": {"x":1863,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10012":
		{
			"frame": {"x":2484,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10013":
		{
			"frame": {"x":3105,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10014":
		{
			"frame": {"x":3726,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10015":
		{
			"frame": {"x":4347,"y":751,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10016":
		{
			"frame": {"x":0,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10017":
		{
			"frame": {"x":621,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10018":
		{
			"frame": {"x":1242,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10019":
		{
			"frame": {"x":1863,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10020":
		{
			"frame": {"x":2484,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10021":
		{
			"frame": {"x":3105,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10022":
		{
			"frame": {"x":3726,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10023":
		{
			"frame": {"x":4347,"y":1502,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10024":
		{
			"frame": {"x":0,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10025":
		{
			"frame": {"x":621,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10026":
		{
			"frame": {"x":1242,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10027":
		{
			"frame": {"x":1863,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10028":
		{
			"frame": {"x":2484,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10029":
		{
			"frame": {"x":3105,"y":2253,"w":622,"h":751},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10030":
		{
			"frame": {"x":3727,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10031":
		{
			"frame": {"x":4348,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10032":
		{
			"frame": {"x":0,"y":3004,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10033":
		{
			"frame": {"x":621,"y":2253,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10034":
		{
			"frame": {"x":621,"y":3004,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10035":
		{
			"frame": {"x":1242,"y":3004,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10036":
		{
			"frame": {"x":1863,"y":3004,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10037":
		{
			"frame": {"x":2484,"y":3004,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10038":
		{
			"frame": {"x":3105,"y":3004,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		},
		"character10039":
		{
			"frame": {"x":3726,"y":3004,"w":621,"h":751},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":1,"y":0,"w":622,"h":751},
			"sourceSize": {"w":622,"h":751}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "b여2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		,
	c:{"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10001":
		{
			"frame": {"x":483,"y":0,"w":483,"h":815},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10002":
		{
			"frame": {"x":966,"y":0,"w":483,"h":815},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10003":
		{
			"frame": {"x":1449,"y":0,"w":483,"h":815},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10004":
		{
			"frame": {"x":1932,"y":0,"w":483,"h":816},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10005":
		{
			"frame": {"x":2415,"y":0,"w":483,"h":816},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10006":
		{
			"frame": {"x":2898,"y":0,"w":483,"h":816},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10007":
		{
			"frame": {"x":3381,"y":0,"w":483,"h":817},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10008":
		{
			"frame": {"x":3864,"y":0,"w":483,"h":817},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10009":
		{
			"frame": {"x":4347,"y":0,"w":483,"h":817},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10010":
		{
			"frame": {"x":0,"y":817,"w":483,"h":817},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10011":
		{
			"frame": {"x":483,"y":817,"w":483,"h":817},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10012":
		{
			"frame": {"x":966,"y":817,"w":483,"h":816},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10013":
		{
			"frame": {"x":1449,"y":817,"w":483,"h":816},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10014":
		{
			"frame": {"x":1932,"y":817,"w":483,"h":816},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10015":
		{
			"frame": {"x":2415,"y":817,"w":483,"h":816},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10016":
		{
			"frame": {"x":2898,"y":817,"w":483,"h":815},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10017":
		{
			"frame": {"x":3381,"y":817,"w":483,"h":815},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10018":
		{
			"frame": {"x":3864,"y":817,"w":483,"h":815},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10019":
		{
			"frame": {"x":4347,"y":817,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10021":
		{
			"frame": {"x":483,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10022":
		{
			"frame": {"x":966,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10023":
		{
			"frame": {"x":1449,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10024":
		{
			"frame": {"x":1449,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10025":
		{
			"frame": {"x":4347,"y":817,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10026":
		{
			"frame": {"x":4347,"y":817,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10027":
		{
			"frame": {"x":4347,"y":817,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10028":
		{
			"frame": {"x":4347,"y":817,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10029":
		{
			"frame": {"x":1932,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10030":
		{
			"frame": {"x":1932,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10031":
		{
			"frame": {"x":1932,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10032":
		{
			"frame": {"x":1932,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10033":
		{
			"frame": {"x":4347,"y":817,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10034":
		{
			"frame": {"x":4347,"y":817,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10035":
		{
			"frame": {"x":2415,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10036":
		{
			"frame": {"x":2898,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10037":
		{
			"frame": {"x":3381,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10038":
		{
			"frame": {"x":3864,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10039":
		{
			"frame": {"x":4347,"y":1634,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10040":
		{
			"frame": {"x":0,"y":0,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10041":
		{
			"frame": {"x":0,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10042":
		{
			"frame": {"x":483,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10043":
		{
			"frame": {"x":0,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10044":
		{
			"frame": {"x":966,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10045":
		{
			"frame": {"x":1449,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10046":
		{
			"frame": {"x":1449,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10047":
		{
			"frame": {"x":1449,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10048":
		{
			"frame": {"x":1449,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10049":
		{
			"frame": {"x":966,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10050":
		{
			"frame": {"x":966,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10051":
		{
			"frame": {"x":966,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10052":
		{
			"frame": {"x":966,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10053":
		{
			"frame": {"x":1932,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10054":
		{
			"frame": {"x":1932,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10055":
		{
			"frame": {"x":1932,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		},
		"character10056":
		{
			"frame": {"x":1932,"y":2448,"w":483,"h":814},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":483,"h":817},
			"sourceSize": {"w":483,"h":817}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "c여아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		,
	d: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10001":
		{
			"frame": {"x":692,"y":0,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10002":
		{
			"frame": {"x":1384,"y":0,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10003":
		{
			"frame": {"x":2076,"y":0,"w":692,"h":752},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10004":
		{
			"frame": {"x":2768,"y":0,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10005":
		{
			"frame": {"x":3460,"y":0,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10006":
		{
			"frame": {"x":4152,"y":0,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10007":
		{
			"frame": {"x":0,"y":752,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10008":
		{
			"frame": {"x":692,"y":752,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10009":
		{
			"frame": {"x":1384,"y":752,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10010":
		{
			"frame": {"x":2076,"y":752,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10011":
		{
			"frame": {"x":2768,"y":752,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10012":
		{
			"frame": {"x":3460,"y":752,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10013":
		{
			"frame": {"x":4152,"y":752,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10014":
		{
			"frame": {"x":0,"y":1504,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10015":
		{
			"frame": {"x":692,"y":1504,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10016":
		{
			"frame": {"x":1384,"y":1504,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10017":
		{
			"frame": {"x":2076,"y":1504,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10018":
		{
			"frame": {"x":2768,"y":1504,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10019":
		{
			"frame": {"x":3460,"y":1504,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10020":
		{
			"frame": {"x":4152,"y":1504,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10021":
		{
			"frame": {"x":0,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10022":
		{
			"frame": {"x":692,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10023":
		{
			"frame": {"x":1384,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10024":
		{
			"frame": {"x":1384,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10025":
		{
			"frame": {"x":2076,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10026":
		{
			"frame": {"x":2768,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10027":
		{
			"frame": {"x":3460,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10028":
		{
			"frame": {"x":4152,"y":2256,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10029":
		{
			"frame": {"x":0,"y":3008,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10030":
		{
			"frame": {"x":692,"y":3008,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10031":
		{
			"frame": {"x":1384,"y":3008,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10032":
		{
			"frame": {"x":2076,"y":3008,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10033":
		{
			"frame": {"x":2768,"y":3008,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10034":
		{
			"frame": {"x":3460,"y":3008,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10035":
		{
			"frame": {"x":4152,"y":3008,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10036":
		{
			"frame": {"x":0,"y":3760,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10037":
		{
			"frame": {"x":692,"y":3760,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10038":
		{
			"frame": {"x":1384,"y":3760,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10039":
		{
			"frame": {"x":2076,"y":3760,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10040":
		{
			"frame": {"x":2768,"y":3760,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10041":
		{
			"frame": {"x":2076,"y":3760,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		},
		"character10042":
		{
			"frame": {"x":3460,"y":3760,"w":692,"h":752},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":692,"h":752},
			"sourceSize": {"w":692,"h":752}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "d여아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		,
	e1: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10001":
		{
			"frame": {"x":597,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10002":
		{
			"frame": {"x":1194,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10003":
		{
			"frame": {"x":1791,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10004":
		{
			"frame": {"x":2388,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10005":
		{
			"frame": {"x":2985,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10006":
		{
			"frame": {"x":3582,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10007":
		{
			"frame": {"x":4179,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10008":
		{
			"frame": {"x":4776,"y":0,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10009":
		{
			"frame": {"x":0,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10010":
		{
			"frame": {"x":597,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10011":
		{
			"frame": {"x":1194,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10012":
		{
			"frame": {"x":1791,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10013":
		{
			"frame": {"x":2388,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10014":
		{
			"frame": {"x":2985,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10015":
		{
			"frame": {"x":3582,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10016":
		{
			"frame": {"x":4179,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10017":
		{
			"frame": {"x":4776,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10018":
		{
			"frame": {"x":0,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10019":
		{
			"frame": {"x":597,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10020":
		{
			"frame": {"x":1194,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10021":
		{
			"frame": {"x":597,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10022":
		{
			"frame": {"x":1791,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10023":
		{
			"frame": {"x":4776,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10024":
		{
			"frame": {"x":2388,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10025":
		{
			"frame": {"x":2985,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10026":
		{
			"frame": {"x":3582,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10027":
		{
			"frame": {"x":4179,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10028":
		{
			"frame": {"x":4179,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10029":
		{
			"frame": {"x":3582,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10030":
		{
			"frame": {"x":4776,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10031":
		{
			"frame": {"x":0,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10032":
		{
			"frame": {"x":4776,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10033":
		{
			"frame": {"x":1791,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10034":
		{
			"frame": {"x":597,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10035":
		{
			"frame": {"x":1194,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10036":
		{
			"frame": {"x":1791,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10037":
		{
			"frame": {"x":2388,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10038":
		{
			"frame": {"x":2985,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10039":
		{
			"frame": {"x":3582,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10040":
		{
			"frame": {"x":2985,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10041":
		{
			"frame": {"x":4179,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10042":
		{
			"frame": {"x":4776,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10043":
		{
			"frame": {"x":4776,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10044":
		{
			"frame": {"x":0,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10045":
		{
			"frame": {"x":597,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10046":
		{
			"frame": {"x":1194,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10047":
		{
			"frame": {"x":1791,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10048":
		{
			"frame": {"x":1791,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10049":
		{
			"frame": {"x":597,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10050":
		{
			"frame": {"x":1194,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10051":
		{
			"frame": {"x":597,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10052":
		{
			"frame": {"x":2388,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10053":
		{
			"frame": {"x":2985,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10054":
		{
			"frame": {"x":3582,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10055":
		{
			"frame": {"x":4179,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10056":
		{
			"frame": {"x":4179,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10057":
		{
			"frame": {"x":4776,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10058":
		{
			"frame": {"x":4776,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10059":
		{
			"frame": {"x":4179,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10060":
		{
			"frame": {"x":4776,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10061":
		{
			"frame": {"x":3582,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10062":
		{
			"frame": {"x":2985,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10063":
		{
			"frame": {"x":2388,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10064":
		{
			"frame": {"x":597,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10065":
		{
			"frame": {"x":1194,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10066":
		{
			"frame": {"x":597,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10067":
		{
			"frame": {"x":1791,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10068":
		{
			"frame": {"x":1791,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10069":
		{
			"frame": {"x":1194,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10070":
		{
			"frame": {"x":597,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10071":
		{
			"frame": {"x":0,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10072":
		{
			"frame": {"x":4776,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10073":
		{
			"frame": {"x":4776,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10074":
		{
			"frame": {"x":4179,"y":2259,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10075":
		{
			"frame": {"x":2985,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10076":
		{
			"frame": {"x":3582,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10077":
		{
			"frame": {"x":2985,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10078":
		{
			"frame": {"x":2388,"y":3012,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10079":
		{
			"frame": {"x":0,"y":3765,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10080":
		{
			"frame": {"x":597,"y":3765,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10081":
		{
			"frame": {"x":1194,"y":3765,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10082":
		{
			"frame": {"x":1791,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10083":
		{
			"frame": {"x":4776,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10084":
		{
			"frame": {"x":2388,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10085":
		{
			"frame": {"x":2985,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10086":
		{
			"frame": {"x":1791,"y":3765,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10087":
		{
			"frame": {"x":2388,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10088":
		{
			"frame": {"x":2388,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10089":
		{
			"frame": {"x":1791,"y":3765,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10090":
		{
			"frame": {"x":2985,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10091":
		{
			"frame": {"x":2388,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10092":
		{
			"frame": {"x":4776,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10093":
		{
			"frame": {"x":1791,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10094":
		{
			"frame": {"x":597,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10095":
		{
			"frame": {"x":1194,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10096":
		{
			"frame": {"x":597,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10097":
		{
			"frame": {"x":0,"y":1506,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		},
		"character10098":
		{
			"frame": {"x":4776,"y":753,"w":597,"h":753},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":597,"h":753},
			"sourceSize": {"w":597,"h":753}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "e1여아2.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
		}
		
		
		,
	e2: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10001":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10002":
		{
			"frame": {"x":461,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10003":
		{
			"frame": {"x":922,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10004":
		{
			"frame": {"x":1383,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10005":
		{
			"frame": {"x":1844,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10006":
		{
			"frame": {"x":2305,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10007":
		{
			"frame": {"x":2766,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10008":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10009":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10010":
		{
			"frame": {"x":3227,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10011":
		{
			"frame": {"x":3688,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10012":
		{
			"frame": {"x":4149,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10013":
		{
			"frame": {"x":0,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10014":
		{
			"frame": {"x":461,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10015":
		{
			"frame": {"x":922,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10016":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10017":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10018":
		{
			"frame": {"x":461,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10019":
		{
			"frame": {"x":922,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10020":
		{
			"frame": {"x":1383,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10021":
		{
			"frame": {"x":1844,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10022":
		{
			"frame": {"x":2305,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10023":
		{
			"frame": {"x":2766,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10024":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10025":
		{
			"frame": {"x":0,"y":0,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10026":
		{
			"frame": {"x":1383,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10027":
		{
			"frame": {"x":1844,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10028":
		{
			"frame": {"x":2305,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10029":
		{
			"frame": {"x":2766,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10030":
		{
			"frame": {"x":3227,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		},
		"character10031":
		{
			"frame": {"x":3688,"y":794,"w":461,"h":794},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":461,"h":794},
			"sourceSize": {"w":461,"h":794}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "e2여아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		,
	f: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10001":
		{
			"frame": {"x":0,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10002":
		{
			"frame": {"x":556,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10003":
		{
			"frame": {"x":556,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10004":
		{
			"frame": {"x":556,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10005":
		{
			"frame": {"x":1112,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10006":
		{
			"frame": {"x":1668,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10007":
		{
			"frame": {"x":2224,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10008":
		{
			"frame": {"x":2780,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10009":
		{
			"frame": {"x":3336,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10010":
		{
			"frame": {"x":3892,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10011":
		{
			"frame": {"x":0,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10012":
		{
			"frame": {"x":556,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10013":
		{
			"frame": {"x":1112,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10014":
		{
			"frame": {"x":1668,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10015":
		{
			"frame": {"x":2224,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10016":
		{
			"frame": {"x":2780,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10017":
		{
			"frame": {"x":3336,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10018":
		{
			"frame": {"x":3892,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10019":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10021":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10022":
		{
			"frame": {"x":556,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10023":
		{
			"frame": {"x":556,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10024":
		{
			"frame": {"x":556,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10025":
		{
			"frame": {"x":556,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10026":
		{
			"frame": {"x":1112,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10027":
		{
			"frame": {"x":1112,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10028":
		{
			"frame": {"x":1112,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10029":
		{
			"frame": {"x":1112,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10030":
		{
			"frame": {"x":1668,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10031":
		{
			"frame": {"x":2224,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10032":
		{
			"frame": {"x":2780,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10033":
		{
			"frame": {"x":1668,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10034":
		{
			"frame": {"x":2224,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10035":
		{
			"frame": {"x":2780,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10036":
		{
			"frame": {"x":3336,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10037":
		{
			"frame": {"x":3892,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10038":
		{
			"frame": {"x":3892,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10039":
		{
			"frame": {"x":3892,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10040":
		{
			"frame": {"x":0,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10041":
		{
			"frame": {"x":556,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10042":
		{
			"frame": {"x":0,"y":2307,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10043":
		{
			"frame": {"x":1668,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10044":
		{
			"frame": {"x":2224,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10045":
		{
			"frame": {"x":2780,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10046":
		{
			"frame": {"x":3336,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10047":
		{
			"frame": {"x":3892,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10048":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10049":
		{
			"frame": {"x":3892,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10050":
		{
			"frame": {"x":0,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10051":
		{
			"frame": {"x":556,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10052":
		{
			"frame": {"x":0,"y":2307,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10053":
		{
			"frame": {"x":1668,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10054":
		{
			"frame": {"x":2224,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10055":
		{
			"frame": {"x":2780,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10056":
		{
			"frame": {"x":3336,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10057":
		{
			"frame": {"x":3892,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10058":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10059":
		{
			"frame": {"x":3892,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10060":
		{
			"frame": {"x":0,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10061":
		{
			"frame": {"x":556,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10062":
		{
			"frame": {"x":0,"y":2307,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10063":
		{
			"frame": {"x":1668,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10064":
		{
			"frame": {"x":2224,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10065":
		{
			"frame": {"x":2780,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10066":
		{
			"frame": {"x":3336,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10067":
		{
			"frame": {"x":3892,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10068":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10069":
		{
			"frame": {"x":3892,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10070":
		{
			"frame": {"x":0,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10071":
		{
			"frame": {"x":556,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10072":
		{
			"frame": {"x":0,"y":2307,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10073":
		{
			"frame": {"x":1668,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10074":
		{
			"frame": {"x":2224,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10075":
		{
			"frame": {"x":2780,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10076":
		{
			"frame": {"x":3336,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10077":
		{
			"frame": {"x":3892,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10078":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10079":
		{
			"frame": {"x":3892,"y":0,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10080":
		{
			"frame": {"x":0,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10081":
		{
			"frame": {"x":556,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10082":
		{
			"frame": {"x":0,"y":2307,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10083":
		{
			"frame": {"x":1668,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10084":
		{
			"frame": {"x":2224,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10085":
		{
			"frame": {"x":2780,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10086":
		{
			"frame": {"x":3336,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10087":
		{
			"frame": {"x":3892,"y":769,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10088":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10089":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10090":
		{
			"frame": {"x":0,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10091":
		{
			"frame": {"x":556,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		},
		"character10092":
		{
			"frame": {"x":556,"y":1538,"w":556,"h":769},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":556,"h":769},
			"sourceSize": {"w":556,"h":769}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.3.38773",
			"image": "f여아2.png",
			"format": "RGBA8888",
			"size": {"w":5000,"h":5000},
			"scale": "1"
		}
		}
		
		
}
