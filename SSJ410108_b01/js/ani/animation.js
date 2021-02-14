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
	var $characters = document.querySelectorAll('.img-character');
	var $character = document.querySelector('.img-character.type-'+type);
	var jsonSource = window.speakUp.sequence[type];
	
	// $character.style.width = jsonSource.frames.character10000.frame.w + 'px';
	// $character.style.height = jsonSource.frames.character10000.frame.h * 100 / 1280 + 'vw';
	// $character.style.height = 600 + 'px';
	// $character.style.backgroundImage = 'url("img/ani/' + type + '.png")';
	// console.log(jsonSource.meta.size.w + 'px auto')
	// $character.style.backgroundSize = jsonSource.meta.size.w + 'px ' + jsonSource.meta.size.h + 'px';
	
	$characters.forEach(function(item, index){
		item.style.display = 'none';
	})
	$character.style.display = 'block';
	$character.style.backgroundPosition = '0 0';

	if (status === 'play'){
		var frame = 10000;
		var frameLength = Object.keys(jsonSource.frames).length;
		clearTimeout(window.speakUp.animationStop);
		doAnimation();

		function doAnimation() {
			clearTimeout(window.speakUp.animationTimer);
			if (frame - 10000 < frameLength - 1) {
				frame++;
				setBgAndTimer();
			} else if (!duration) { // duration이 없을 땐 1세트만
				clearTimeout(window.speakUp.animationTimer);
			} else { // duration이 있고 시간이 아직 남았으면
				frame = 10000;
				setBgAndTimer();
			}

			function setBgAndTimer() {
				$character.style.backgroundPosition = (-jsonSource.frames['character'+frame].frame.x + 'px ') + (-jsonSource.frames['character'+frame].frame.y + 'px');
				window.speakUp.animationTimer = setTimeout(function(){
					doAnimation();
				}, 60)
			}
		}

		function endMotion() {
			if (type === 'f'){
				frame = 10030;
			} else {
				frame = frameLength - 1 + 10000;
			}
			console.log(frame);
			$character.style.backgroundPosition = (-jsonSource.frames['character'+frame].frame.x + 'px ') + (-jsonSource.frames['character'+frame].frame.y + 'px');
		}

		if (!!duration && duration !== 'infinite') {
			window.speakUp.animationStop = setTimeout(function(){
				clearTimeout(window.speakUp.animationTimer);
				endMotion();
			}, duration)
		} 
	}
	
}
window.speakUp.sequence = {
	b: {
		"frames": {

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
			"frame": {"x":2128,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":1818,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10045":
		{
			"frame": {"x":2660,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10046":
		{
			"frame": {"x":3192,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10047":
		{
			"frame": {"x":3724,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10048":
		{
			"frame": {"x":4256,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10049":
		{
			"frame": {"x":4788,"y":2422,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10050":
		{
			"frame": {"x":0,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10051":
		{
			"frame": {"x":532,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10052":
		{
			"frame": {"x":1064,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10053":
		{
			"frame": {"x":1596,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10054":
		{
			"frame": {"x":2128,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10055":
		{
			"frame": {"x":2660,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10056":
		{
			"frame": {"x":3192,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10057":
		{
			"frame": {"x":3724,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10058":
		{
			"frame": {"x":4256,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10059":
		{
			"frame": {"x":4788,"y":3026,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10060":
		{
			"frame": {"x":0,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10061":
		{
			"frame": {"x":532,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10062":
		{
			"frame": {"x":1064,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10063":
		{
			"frame": {"x":1596,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10064":
		{
			"frame": {"x":2128,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10065":
		{
			"frame": {"x":2660,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10066":
		{
			"frame": {"x":3192,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10067":
		{
			"frame": {"x":3724,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		},
		"character10068":
		{
			"frame": {"x":4256,"y":3630,"w":532,"h":604},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":3,"w":532,"h":607},
			"sourceSize": {"w":532,"h":607}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "b여1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":6000},
			"scale": "1"
		}
	},
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
	e1: {
		"frames": {

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
			"frame": {"x":0,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10011":
		{
			"frame": {"x":532,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":614,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1228,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10031":
		{
			"frame": {"x":532,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10034":
		{
			"frame": {"x":2128,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":1842,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10045":
		{
			"frame": {"x":2660,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10046":
		{
			"frame": {"x":3192,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10047":
		{
			"frame": {"x":3724,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10048":
		{
			"frame": {"x":4256,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10049":
		{
			"frame": {"x":4788,"y":2456,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10050":
		{
			"frame": {"x":0,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10051":
		{
			"frame": {"x":532,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10052":
		{
			"frame": {"x":1064,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10053":
		{
			"frame": {"x":1596,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10054":
		{
			"frame": {"x":2128,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10055":
		{
			"frame": {"x":2660,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10056":
		{
			"frame": {"x":3192,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10057":
		{
			"frame": {"x":3724,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10058":
		{
			"frame": {"x":4256,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10059":
		{
			"frame": {"x":4788,"y":3070,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10060":
		{
			"frame": {"x":0,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10061":
		{
			"frame": {"x":532,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10062":
		{
			"frame": {"x":1064,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10063":
		{
			"frame": {"x":1596,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10064":
		{
			"frame": {"x":2128,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10065":
		{
			"frame": {"x":2660,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10066":
		{
			"frame": {"x":3192,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10067":
		{
			"frame": {"x":3724,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10068":
		{
			"frame": {"x":4256,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10069":
		{
			"frame": {"x":4788,"y":3684,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10070":
		{
			"frame": {"x":0,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10071":
		{
			"frame": {"x":532,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10072":
		{
			"frame": {"x":1064,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10073":
		{
			"frame": {"x":1596,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10074":
		{
			"frame": {"x":2128,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10075":
		{
			"frame": {"x":2660,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10076":
		{
			"frame": {"x":3192,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10077":
		{
			"frame": {"x":3724,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10078":
		{
			"frame": {"x":4256,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10079":
		{
			"frame": {"x":4788,"y":4298,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10080":
		{
			"frame": {"x":0,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10081":
		{
			"frame": {"x":532,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10082":
		{
			"frame": {"x":1064,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10083":
		{
			"frame": {"x":1596,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10084":
		{
			"frame": {"x":2128,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10085":
		{
			"frame": {"x":2660,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10086":
		{
			"frame": {"x":3192,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10087":
		{
			"frame": {"x":3724,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10088":
		{
			"frame": {"x":4256,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10089":
		{
			"frame": {"x":4788,"y":4912,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10090":
		{
			"frame": {"x":0,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10091":
		{
			"frame": {"x":532,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10092":
		{
			"frame": {"x":1064,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10093":
		{
			"frame": {"x":1596,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10094":
		{
			"frame": {"x":2128,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10095":
		{
			"frame": {"x":2660,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10096":
		{
			"frame": {"x":3192,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10097":
		{
			"frame": {"x":3724,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10098":
		{
			"frame": {"x":4256,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10099":
		{
			"frame": {"x":4788,"y":5526,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		},
		"character10100":
		{
			"frame": {"x":0,"y":6140,"w":532,"h":614},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":614},
			"sourceSize": {"w":532,"h":614}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "e1여아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":7000},
			"scale": "1"
		}
	},
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
	f: {
		"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10001":
		{
			"frame": {"x":0,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10002":
		{
			"frame": {"x":0,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10003":
		{
			"frame": {"x":0,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10004":
		{
			"frame": {"x":532,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10005":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":657},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10006":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":664},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10007":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":669},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10008":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":673},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10009":
		{
			"frame": {"x":3192,"y":0,"w":553,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10010":
		{
			"frame": {"x":3745,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10011":
		{
			"frame": {"x":4277,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10012":
		{
			"frame": {"x":4809,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10013":
		{
			"frame": {"x":5341,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10014":
		{
			"frame": {"x":5873,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10015":
		{
			"frame": {"x":6405,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10016":
		{
			"frame": {"x":6937,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10017":
		{
			"frame": {"x":7469,"y":0,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10018":
		{
			"frame": {"x":0,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10019":
		{
			"frame": {"x":532,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10020":
		{
			"frame": {"x":1064,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10021":
		{
			"frame": {"x":1596,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10022":
		{
			"frame": {"x":2128,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10023":
		{
			"frame": {"x":2660,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10024":
		{
			"frame": {"x":3192,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10025":
		{
			"frame": {"x":3724,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10026":
		{
			"frame": {"x":4256,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10027":
		{
			"frame": {"x":4788,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10028":
		{
			"frame": {"x":5320,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10029":
		{
			"frame": {"x":5852,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10030":
		{
			"frame": {"x":6384,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10031":
		{
			"frame": {"x":6916,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10032":
		{
			"frame": {"x":7448,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10033":
		{
			"frame": {"x":0,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10034":
		{
			"frame": {"x":532,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10035":
		{
			"frame": {"x":1064,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10036":
		{
			"frame": {"x":1596,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10037":
		{
			"frame": {"x":2128,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10038":
		{
			"frame": {"x":2660,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10039":
		{
			"frame": {"x":3192,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10040":
		{
			"frame": {"x":3724,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10041":
		{
			"frame": {"x":4256,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10042":
		{
			"frame": {"x":4788,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10043":
		{
			"frame": {"x":5320,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10044":
		{
			"frame": {"x":5852,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10045":
		{
			"frame": {"x":6384,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10046":
		{
			"frame": {"x":6916,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10047":
		{
			"frame": {"x":7448,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10048":
		{
			"frame": {"x":0,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10049":
		{
			"frame": {"x":532,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10050":
		{
			"frame": {"x":1064,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10051":
		{
			"frame": {"x":1596,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10052":
		{
			"frame": {"x":2128,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10053":
		{
			"frame": {"x":2128,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10054":
		{
			"frame": {"x":2660,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10055":
		{
			"frame": {"x":2660,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10056":
		{
			"frame": {"x":3192,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10057":
		{
			"frame": {"x":3724,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10058":
		{
			"frame": {"x":4256,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10059":
		{
			"frame": {"x":4788,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10060":
		{
			"frame": {"x":5320,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10061":
		{
			"frame": {"x":4256,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10062":
		{
			"frame": {"x":4788,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10063":
		{
			"frame": {"x":5320,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10064":
		{
			"frame": {"x":5852,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10065":
		{
			"frame": {"x":6384,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10066":
		{
			"frame": {"x":2660,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10067":
		{
			"frame": {"x":2128,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10068":
		{
			"frame": {"x":1596,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10069":
		{
			"frame": {"x":2128,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10070":
		{
			"frame": {"x":2660,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10071":
		{
			"frame": {"x":6916,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10072":
		{
			"frame": {"x":7448,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10073":
		{
			"frame": {"x":0,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10074":
		{
			"frame": {"x":532,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10075":
		{
			"frame": {"x":1064,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10076":
		{
			"frame": {"x":1596,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10077":
		{
			"frame": {"x":2128,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10078":
		{
			"frame": {"x":6916,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10079":
		{
			"frame": {"x":7448,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10080":
		{
			"frame": {"x":0,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10081":
		{
			"frame": {"x":2660,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10082":
		{
			"frame": {"x":3192,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10083":
		{
			"frame": {"x":3724,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10084":
		{
			"frame": {"x":4256,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10085":
		{
			"frame": {"x":4788,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10086":
		{
			"frame": {"x":5320,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10087":
		{
			"frame": {"x":5852,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10088":
		{
			"frame": {"x":3192,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10089":
		{
			"frame": {"x":3724,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10090":
		{
			"frame": {"x":4256,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10091":
		{
			"frame": {"x":6384,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10092":
		{
			"frame": {"x":6916,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10093":
		{
			"frame": {"x":4256,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10094":
		{
			"frame": {"x":4788,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10095":
		{
			"frame": {"x":5320,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10096":
		{
			"frame": {"x":7448,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10097":
		{
			"frame": {"x":0,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10098":
		{
			"frame": {"x":2660,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10099":
		{
			"frame": {"x":2128,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10100":
		{
			"frame": {"x":1596,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10101":
		{
			"frame": {"x":532,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10102":
		{
			"frame": {"x":1064,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10103":
		{
			"frame": {"x":1596,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10104":
		{
			"frame": {"x":2128,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10105":
		{
			"frame": {"x":0,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10106":
		{
			"frame": {"x":4256,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10107":
		{
			"frame": {"x":2660,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10108":
		{
			"frame": {"x":1596,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10109":
		{
			"frame": {"x":2128,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10110":
		{
			"frame": {"x":6916,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10111":
		{
			"frame": {"x":3192,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10112":
		{
			"frame": {"x":3724,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10113":
		{
			"frame": {"x":4256,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10114":
		{
			"frame": {"x":4788,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10115":
		{
			"frame": {"x":5320,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10116":
		{
			"frame": {"x":5320,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10117":
		{
			"frame": {"x":1596,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10118":
		{
			"frame": {"x":5320,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10119":
		{
			"frame": {"x":5852,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10120":
		{
			"frame": {"x":3192,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10121":
		{
			"frame": {"x":3724,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10122":
		{
			"frame": {"x":532,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10123":
		{
			"frame": {"x":5852,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10124":
		{
			"frame": {"x":6384,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10125":
		{
			"frame": {"x":6916,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10126":
		{
			"frame": {"x":6384,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10127":
		{
			"frame": {"x":7448,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10128":
		{
			"frame": {"x":7448,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10129":
		{
			"frame": {"x":0,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10130":
		{
			"frame": {"x":2660,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10131":
		{
			"frame": {"x":1064,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10132":
		{
			"frame": {"x":4788,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10133":
		{
			"frame": {"x":1064,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10134":
		{
			"frame": {"x":532,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10135":
		{
			"frame": {"x":0,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10136":
		{
			"frame": {"x":3724,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10137":
		{
			"frame": {"x":532,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10138":
		{
			"frame": {"x":4256,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10139":
		{
			"frame": {"x":2660,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10140":
		{
			"frame": {"x":1596,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10141":
		{
			"frame": {"x":6384,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10142":
		{
			"frame": {"x":1064,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10143":
		{
			"frame": {"x":3192,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10144":
		{
			"frame": {"x":3724,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10145":
		{
			"frame": {"x":4256,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10146":
		{
			"frame": {"x":1064,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10147":
		{
			"frame": {"x":1596,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10148":
		{
			"frame": {"x":5320,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10149":
		{
			"frame": {"x":1596,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10150":
		{
			"frame": {"x":5320,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10151":
		{
			"frame": {"x":2660,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10152":
		{
			"frame": {"x":3192,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10153":
		{
			"frame": {"x":2128,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10154":
		{
			"frame": {"x":2660,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10155":
		{
			"frame": {"x":5852,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10156":
		{
			"frame": {"x":5320,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10157":
		{
			"frame": {"x":5852,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10158":
		{
			"frame": {"x":6384,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10159":
		{
			"frame": {"x":7448,"y":3217,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10160":
		{
			"frame": {"x":7448,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10161":
		{
			"frame": {"x":6384,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10162":
		{
			"frame": {"x":3192,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10163":
		{
			"frame": {"x":3724,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10164":
		{
			"frame": {"x":4256,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10165":
		{
			"frame": {"x":3724,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10166":
		{
			"frame": {"x":2660,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10167":
		{
			"frame": {"x":3192,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10168":
		{
			"frame": {"x":3724,"y":1309,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10169":
		{
			"frame": {"x":532,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10170":
		{
			"frame": {"x":4256,"y":673,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10171":
		{
			"frame": {"x":1064,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10172":
		{
			"frame": {"x":4788,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10173":
		{
			"frame": {"x":5320,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10174":
		{
			"frame": {"x":5852,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10175":
		{
			"frame": {"x":6384,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10176":
		{
			"frame": {"x":0,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10177":
		{
			"frame": {"x":532,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10178":
		{
			"frame": {"x":1064,"y":1945,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10179":
		{
			"frame": {"x":1596,"y":3853,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10180":
		{
			"frame": {"x":5320,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		},
		"character10181":
		{
			"frame": {"x":4788,"y":2581,"w":532,"h":636},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":553,"h":673},
			"sourceSize": {"w":553,"h":673}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "f여아1.png",
			"format": "RGBA8888",
			"size": {"w":8192,"h":8192},
			"scale": "1"
		}
		}
		
}
