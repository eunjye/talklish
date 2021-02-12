/**
 * 
 * @param {String} status (stop, play)
 * @param {String} type (hi, wrong, speak ...) 
 * @param {function} callback
 */
window.speakUp.animationTimer = {};
window.speakUp.animationStatus = function(status, type, callback) {
	var $character = document.querySelector('.img-character');
	var jsonSource = window.speakUp.sequence[type];
	
	$character.style.width = jsonSource.frames.character10000.frame.w * 100 / 1280 + 'vw';
	$character.style.height = jsonSource.frames.character10000.frame.h * 100 / 1280 + 'vw';
	$character.style.backgroundImage = 'url("img/ani/' + type + '.png")';
	$character.style.backgroundSize = jsonSource.meta.size.w * 1.5 + 'px auto';
	$character.style.backgroundPosition = '0 0';

	var frame = 10000;
	doAnimation();

	function doAnimation() {
		clearTimeout(window.speakUp.animationTimer);
		if (frame - 10000 < Object.keys(jsonSource.frames).length - 1) {
			frame++;
			$character.style.backgroundPosition = (-jsonSource.frames['character'+frame].frame.x*1.5 + 'px ') + (-jsonSource.frames['character'+frame].frame.y*1.5 + 'px');
			window.speakUp.animationTimer = setTimeout(function(){
				doAnimation();
			}, 50)
		} else {
			clearTimeout(window.speakUp.animationTimer);
		}
	}
	
}
window.speakUp.sequence = {
	hi: {
		"frames": {

	"character10000":
	{
		"frame": {"x":0,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10001":
	{
		"frame": {"x":532,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10002":
	{
		"frame": {"x":1064,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10003":
	{
		"frame": {"x":1596,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10004":
	{
		"frame": {"x":2128,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10005":
	{
		"frame": {"x":2660,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10006":
	{
		"frame": {"x":3192,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10007":
	{
		"frame": {"x":3724,"y":0,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10008":
	{
		"frame": {"x":4256,"y":0,"w":534,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":8,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10009":
	{
		"frame": {"x":4790,"y":0,"w":538,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":4,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10010":
	{
		"frame": {"x":0,"y":614,"w":540,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":2,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10011":
	{
		"frame": {"x":540,"y":614,"w":541,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":1,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10012":
	{
		"frame": {"x":1081,"y":614,"w":542,"h":614},
		"rotated": false,
		"trimmed": false,
		"spriteSourceSize": {"x":0,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10013":
	{
		"frame": {"x":1623,"y":614,"w":541,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":1,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10014":
	{
		"frame": {"x":0,"y":614,"w":540,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":3,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10015":
	{
		"frame": {"x":2164,"y":614,"w":536,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":6,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10016":
	{
		"frame": {"x":2700,"y":614,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10017":
	{
		"frame": {"x":3232,"y":614,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10018":
	{
		"frame": {"x":3764,"y":614,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10019":
	{
		"frame": {"x":4296,"y":614,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10020":
	{
		"frame": {"x":4828,"y":614,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10021":
	{
		"frame": {"x":0,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10022":
	{
		"frame": {"x":532,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10023":
	{
		"frame": {"x":1064,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10024":
	{
		"frame": {"x":1596,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10025":
	{
		"frame": {"x":2128,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10026":
	{
		"frame": {"x":2660,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10027":
	{
		"frame": {"x":3192,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10028":
	{
		"frame": {"x":3724,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10029":
	{
		"frame": {"x":4256,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10030":
	{
		"frame": {"x":4788,"y":1228,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10031":
	{
		"frame": {"x":0,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10032":
	{
		"frame": {"x":532,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10033":
	{
		"frame": {"x":1064,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10034":
	{
		"frame": {"x":1596,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10035":
	{
		"frame": {"x":2128,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10036":
	{
		"frame": {"x":2660,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10037":
	{
		"frame": {"x":3192,"y":1842,"w":535,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":7,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10038":
	{
		"frame": {"x":3727,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10039":
	{
		"frame": {"x":4259,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10040":
	{
		"frame": {"x":4791,"y":1842,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10041":
	{
		"frame": {"x":0,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10042":
	{
		"frame": {"x":532,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10043":
	{
		"frame": {"x":1064,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10044":
	{
		"frame": {"x":1596,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10045":
	{
		"frame": {"x":2128,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10046":
	{
		"frame": {"x":2660,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10047":
	{
		"frame": {"x":3192,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10048":
	{
		"frame": {"x":3724,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
	},
	"character10049":
	{
		"frame": {"x":4256,"y":2456,"w":532,"h":614},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":10,"y":0,"w":542,"h":614},
		"sourceSize": {"w":542,"h":614}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "b남1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":4000},
			"scale": "1"
		}
	},
	speak: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
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
			"frame": {"x":2128,"y":0,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":666},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10010":
		{
			"frame": {"x":0,"y":668,"w":532,"h":666},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10011":
		{
			"frame": {"x":532,"y":668,"w":532,"h":666},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":668,"w":532,"h":666},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":668,"w":532,"h":666},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":668,"w":532,"h":666},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":668,"w":532,"h":666},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":668,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":668,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":668,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":668,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1335,"w":532,"h":667},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1335,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10030":
		{
			"frame": {"x":0,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10031":
		{
			"frame": {"x":532,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10034":
		{
			"frame": {"x":2128,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":2003,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10045":
		{
			"frame": {"x":2660,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10046":
		{
			"frame": {"x":3192,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10047":
		{
			"frame": {"x":3724,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10048":
		{
			"frame": {"x":4256,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		},
		"character10049":
		{
			"frame": {"x":4788,"y":2671,"w":532,"h":668},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":668},
			"sourceSize": {"w":532,"h":668}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "c남아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
	},
	question: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10010":
		{
			"frame": {"x":0,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10011":
		{
			"frame": {"x":532,"y":627,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":627,"w":532,"h":628},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":627,"w":532,"h":628},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":627,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":627,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":627,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1255,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10031":
		{
			"frame": {"x":532,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10034":
		{
			"frame": {"x":2128,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":1882,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10045":
		{
			"frame": {"x":2660,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10046":
		{
			"frame": {"x":3192,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10047":
		{
			"frame": {"x":3724,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10048":
		{
			"frame": {"x":4256,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10049":
		{
			"frame": {"x":4788,"y":2509,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10050":
		{
			"frame": {"x":0,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10051":
		{
			"frame": {"x":532,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10052":
		{
			"frame": {"x":1064,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10053":
		{
			"frame": {"x":1596,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10054":
		{
			"frame": {"x":2128,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10055":
		{
			"frame": {"x":2660,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10056":
		{
			"frame": {"x":3192,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10057":
		{
			"frame": {"x":3724,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10058":
		{
			"frame": {"x":4256,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10059":
		{
			"frame": {"x":4788,"y":3136,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10060":
		{
			"frame": {"x":0,"y":3763,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10061":
		{
			"frame": {"x":532,"y":3763,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10062":
		{
			"frame": {"x":1064,"y":3763,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		},
		"character10063":
		{
			"frame": {"x":1596,"y":3763,"w":532,"h":627},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":1,"w":532,"h":628},
			"sourceSize": {"w":532,"h":628}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "d남아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":5000},
			"scale": "1"
		}
	},
	wrong1: 
	{"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10010":
		{
			"frame": {"x":0,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10011":
		{
			"frame": {"x":532,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":635,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1270,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10031":
		{
			"frame": {"x":532,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10034":
		{
			"frame": {"x":2128,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":1905,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10045":
		{
			"frame": {"x":2660,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10046":
		{
			"frame": {"x":3192,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10047":
		{
			"frame": {"x":3724,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10048":
		{
			"frame": {"x":4256,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10049":
		{
			"frame": {"x":4788,"y":2540,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10050":
		{
			"frame": {"x":0,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10051":
		{
			"frame": {"x":532,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10052":
		{
			"frame": {"x":1064,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10053":
		{
			"frame": {"x":1596,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10054":
		{
			"frame": {"x":2128,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10055":
		{
			"frame": {"x":2660,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10056":
		{
			"frame": {"x":3192,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10057":
		{
			"frame": {"x":3724,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10058":
		{
			"frame": {"x":4256,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10059":
		{
			"frame": {"x":4788,"y":3175,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10060":
		{
			"frame": {"x":0,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10061":
		{
			"frame": {"x":532,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10062":
		{
			"frame": {"x":1064,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10063":
		{
			"frame": {"x":1596,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10064":
		{
			"frame": {"x":2128,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10065":
		{
			"frame": {"x":2660,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10066":
		{
			"frame": {"x":3192,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10067":
		{
			"frame": {"x":3724,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10068":
		{
			"frame": {"x":4256,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10069":
		{
			"frame": {"x":4788,"y":3810,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10070":
		{
			"frame": {"x":0,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10071":
		{
			"frame": {"x":532,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10072":
		{
			"frame": {"x":1064,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10073":
		{
			"frame": {"x":1596,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10074":
		{
			"frame": {"x":2128,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10075":
		{
			"frame": {"x":2660,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10076":
		{
			"frame": {"x":3192,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10077":
		{
			"frame": {"x":3724,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10078":
		{
			"frame": {"x":4256,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10079":
		{
			"frame": {"x":4788,"y":4445,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10080":
		{
			"frame": {"x":0,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10081":
		{
			"frame": {"x":532,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10082":
		{
			"frame": {"x":1064,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10083":
		{
			"frame": {"x":1596,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10084":
		{
			"frame": {"x":2128,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10085":
		{
			"frame": {"x":2660,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10086":
		{
			"frame": {"x":3192,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10087":
		{
			"frame": {"x":3724,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10088":
		{
			"frame": {"x":4256,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10089":
		{
			"frame": {"x":4788,"y":5080,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10090":
		{
			"frame": {"x":0,"y":5715,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10091":
		{
			"frame": {"x":532,"y":5715,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10092":
		{
			"frame": {"x":1064,"y":5715,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		},
		"character10093":
		{
			"frame": {"x":1596,"y":5715,"w":532,"h":635},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":635},
			"sourceSize": {"w":532,"h":635}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "e1남아1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":6500},
			"scale": "1"
		}
	},
	wrong2: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10001":
		{
			"frame": {"x":532,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10002":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10003":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10004":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10005":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10006":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10007":
		{
			"frame": {"x":3724,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10008":
		{
			"frame": {"x":4256,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10009":
		{
			"frame": {"x":4788,"y":0,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10010":
		{
			"frame": {"x":0,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10011":
		{
			"frame": {"x":532,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10012":
		{
			"frame": {"x":1064,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10013":
		{
			"frame": {"x":1596,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10014":
		{
			"frame": {"x":2128,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10015":
		{
			"frame": {"x":2660,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10016":
		{
			"frame": {"x":3192,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10017":
		{
			"frame": {"x":3724,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10018":
		{
			"frame": {"x":4256,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10019":
		{
			"frame": {"x":4788,"y":629,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10021":
		{
			"frame": {"x":532,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10022":
		{
			"frame": {"x":1064,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10023":
		{
			"frame": {"x":1596,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10024":
		{
			"frame": {"x":2128,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10025":
		{
			"frame": {"x":2660,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10026":
		{
			"frame": {"x":3192,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10027":
		{
			"frame": {"x":3724,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10028":
		{
			"frame": {"x":4256,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10029":
		{
			"frame": {"x":4788,"y":1258,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10031":
		{
			"frame": {"x":532,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10032":
		{
			"frame": {"x":1064,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10033":
		{
			"frame": {"x":1596,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10034":
		{
			"frame": {"x":2128,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10035":
		{
			"frame": {"x":2660,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10036":
		{
			"frame": {"x":3192,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10037":
		{
			"frame": {"x":3724,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10038":
		{
			"frame": {"x":4256,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10039":
		{
			"frame": {"x":4788,"y":1887,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10040":
		{
			"frame": {"x":0,"y":2516,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10041":
		{
			"frame": {"x":532,"y":2516,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10042":
		{
			"frame": {"x":1064,"y":2516,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":2516,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		},
		"character10044":
		{
			"frame": {"x":2128,"y":2516,"w":532,"h":629},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":629},
			"sourceSize": {"w":532,"h":629}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "e2남1.png",
			"format": "RGBA8888",
			"size": {"w":5500,"h":4000},
			"scale": "1"
		}
	},
	answer: {"frames": {

		"character10000":
		{
			"frame": {"x":0,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10001":
		{
			"frame": {"x":0,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10002":
		{
			"frame": {"x":0,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10003":
		{
			"frame": {"x":0,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10004":
		{
			"frame": {"x":0,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10005":
		{
			"frame": {"x":532,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10006":
		{
			"frame": {"x":1064,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10007":
		{
			"frame": {"x":1596,"y":0,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10008":
		{
			"frame": {"x":2128,"y":0,"w":532,"h":660},
			"rotated": false,
			"trimmed": false,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10009":
		{
			"frame": {"x":2660,"y":0,"w":532,"h":653},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10010":
		{
			"frame": {"x":3192,"y":0,"w":532,"h":642},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10011":
		{
			"frame": {"x":0,"y":660,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10012":
		{
			"frame": {"x":532,"y":660,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10013":
		{
			"frame": {"x":1064,"y":660,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10014":
		{
			"frame": {"x":1596,"y":660,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10015":
		{
			"frame": {"x":2128,"y":660,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10016":
		{
			"frame": {"x":2660,"y":660,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10017":
		{
			"frame": {"x":3192,"y":660,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10018":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10019":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10020":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10021":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10022":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10023":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10024":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10025":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10026":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10027":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10028":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10029":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10030":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10031":
		{
			"frame": {"x":1064,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10032":
		{
			"frame": {"x":1596,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10033":
		{
			"frame": {"x":2128,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10034":
		{
			"frame": {"x":2660,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10035":
		{
			"frame": {"x":3192,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10036":
		{
			"frame": {"x":2660,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10037":
		{
			"frame": {"x":2128,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10038":
		{
			"frame": {"x":0,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10039":
		{
			"frame": {"x":532,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10040":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10041":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10042":
		{
			"frame": {"x":532,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10043":
		{
			"frame": {"x":1596,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10044":
		{
			"frame": {"x":1596,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10045":
		{
			"frame": {"x":2128,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10046":
		{
			"frame": {"x":2660,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10047":
		{
			"frame": {"x":2128,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10048":
		{
			"frame": {"x":3192,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10049":
		{
			"frame": {"x":0,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10050":
		{
			"frame": {"x":532,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10051":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10052":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10053":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10054":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10055":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10056":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10057":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10058":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10059":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10060":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10061":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10062":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10063":
		{
			"frame": {"x":532,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10064":
		{
			"frame": {"x":0,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10065":
		{
			"frame": {"x":1596,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10066":
		{
			"frame": {"x":2128,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10067":
		{
			"frame": {"x":2660,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10068":
		{
			"frame": {"x":2128,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10069":
		{
			"frame": {"x":1596,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10070":
		{
			"frame": {"x":1596,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10071":
		{
			"frame": {"x":1064,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10072":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10073":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10074":
		{
			"frame": {"x":3192,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10075":
		{
			"frame": {"x":0,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10076":
		{
			"frame": {"x":3192,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10077":
		{
			"frame": {"x":2128,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10078":
		{
			"frame": {"x":2660,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10079":
		{
			"frame": {"x":2128,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10080":
		{
			"frame": {"x":1596,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10081":
		{
			"frame": {"x":1596,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10082":
		{
			"frame": {"x":532,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10083":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10084":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10085":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10086":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10087":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10088":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10089":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10090":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10091":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10092":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10093":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10094":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10095":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10096":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10097":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10098":
		{
			"frame": {"x":3192,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10099":
		{
			"frame": {"x":0,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10100":
		{
			"frame": {"x":3192,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10101":
		{
			"frame": {"x":1064,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10102":
		{
			"frame": {"x":2660,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10103":
		{
			"frame": {"x":2128,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10104":
		{
			"frame": {"x":1596,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10105":
		{
			"frame": {"x":1596,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10106":
		{
			"frame": {"x":1064,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10107":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10108":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10109":
		{
			"frame": {"x":532,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10110":
		{
			"frame": {"x":1596,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10111":
		{
			"frame": {"x":2128,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10112":
		{
			"frame": {"x":2128,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10113":
		{
			"frame": {"x":2660,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10114":
		{
			"frame": {"x":2128,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10115":
		{
			"frame": {"x":1596,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10116":
		{
			"frame": {"x":0,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10117":
		{
			"frame": {"x":1064,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10118":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10119":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10120":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10121":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10122":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10123":
		{
			"frame": {"x":2128,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10124":
		{
			"frame": {"x":2128,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10125":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10126":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10127":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10128":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10129":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10130":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10131":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10132":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10133":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10134":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10135":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10136":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10137":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10138":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10139":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10140":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10141":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10142":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10143":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10144":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10145":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10146":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10147":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10148":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10149":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10150":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10151":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10152":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10153":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10154":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10155":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10156":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10157":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10158":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10159":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10160":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10161":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10162":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10163":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10164":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10165":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10166":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10167":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10168":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10169":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10170":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10171":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10172":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10173":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10174":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10175":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10176":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10177":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10178":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10179":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10180":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10181":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10182":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10183":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10184":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10185":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10186":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10187":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10188":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10189":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10190":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10191":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10192":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10193":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10194":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10195":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10196":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10197":
		{
			"frame": {"x":2128,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10198":
		{
			"frame": {"x":2128,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10199":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10200":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10201":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10202":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10203":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10204":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10205":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10206":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10207":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10208":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10209":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10210":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10211":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10212":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10213":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10214":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10215":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10216":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10217":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10218":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10219":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10220":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10221":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10222":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10223":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10224":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10225":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10226":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10227":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10228":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10229":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10230":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10231":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10232":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10233":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10234":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10235":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10236":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10237":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10238":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10239":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10240":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10241":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10242":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10243":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10244":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10245":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10246":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10247":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10248":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10249":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10250":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10251":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10252":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10253":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10254":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10255":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10256":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10257":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10258":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10259":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10260":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10261":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10262":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10263":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10264":
		{
			"frame": {"x":1064,"y":1916,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10265":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10266":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10267":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10268":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10269":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10270":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10271":
		{
			"frame": {"x":2128,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10272":
		{
			"frame": {"x":2128,"y":3172,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10273":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10274":
		{
			"frame": {"x":532,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10275":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10276":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10277":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10278":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10279":
		{
			"frame": {"x":0,"y":1288,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10280":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10281":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		},
		"character10282":
		{
			"frame": {"x":1064,"y":2544,"w":532,"h":628},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {"x":0,"y":0,"w":532,"h":660},
			"sourceSize": {"w":532,"h":660}
		}},
		"meta": {
			"app": "Adobe Animate",
			"version": "21.0.2.37893",
			"image": "f남아1.png",
			"format": "RGBA8888",
			"size": {"w":4096,"h":4096},
			"scale": "1"
		}
	}
}
