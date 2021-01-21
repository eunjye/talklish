/*--------------------------------------------------------------
    ______   __  __    _   __       ____  __    ______
   / ____/  / / / /   / | / /      / /\ \/ /   / ____/
  / __/    / / / /   /  |/ /  __  / /  \  /   / __/
 / /___   / /_/ /   / /|  /  / /_/ /   / /   / /___
/_____/   \____/   /_/ |_/   \____/   /_/   /_____/
--------------------------------------------------------------*/
/*--------------------------------------------------------------
	분류순서
	@Variables  : 전역변수
	@Init       : 초기실행
	@Settings   : 기본설정
	@Utility    : 유틸리티
	@Layout     : 레이아웃
	@Components : 공통모듈
	@Content    : 컨텐츠
--------------------------------------------------------------*/
;(function ($, win, doc, undefined) {
	
	var namespace = 'milkT';

	win[namespace] = {
		status: {
			scrollY: 0,
			scrollDirection: '',
			scrollIsHome: function(){
				return win[namespace].status.scrollY === 0 ? true : false;
			},
			scrollIsEnd: function(){
				return win[namespace].status.scrollY + $(win).outerHeight() === $(doc).outerHeight() ? true : false;
			},
			scrollCheck: {
				beforeScrollY: 0,
				direction: function(){
					return win[namespace].status.scrollCheck.beforeScrollY < win[namespace].status.scrollY ? 
						'down' : 'up';
				},
				init: function(){
					function bodyAddClass() {
						var $body = $('body');
						if (!!win[namespace].status.scrollIsHome()) {
							$body.addClass('is-home');
						} else if (!!win[namespace].status.scrollIsEnd()) {
							$body.addClass('is-end');
						} else {
							$body.removeClass('is-home is-end');
						}
					}
					win[namespace].status.scrollY = $('html').prop('scrollTop');
					win[namespace].status.scrollIsHome();
					win[namespace].status.scrollIsEnd();
					bodyAddClass();

					$(doc).off('scroll.scrollCheck').on('scroll.scrollCheck', function(){
						win[namespace].status.scrollY = $('html').prop('scrollTop');
						win[namespace].status.scrollDirection = win[namespace].status.scrollCheck.direction();
						win[namespace].status.scrollCheck.beforeScrollY = win[namespace].status.scrollY;
						win[namespace].status.scrollIsHome();
						win[namespace].status.scrollIsEnd();
						bodyAddClass();
					});

				}
			}
		},
		navLoad: function(){
			(function () {
				return new Promise(function(resolve, reject) {
					$.get('../_include/header.html', function(response) {
						if (response) {
							resolve(response);
						}
						reject(new Error('Request is failed'));
					});
				});
			})()
			.then(function(data) {
				$('.header-area').html(data);
				win[namespace].nav.hoverMenu(); // hover evt on nav
				win[namespace].nav.slidingMenu(); // show/hide evt on nav
				win[namespace].nav.openDepth2(); // 2depth links evt on nav
				
			}).catch(function(err) {
				console.error('win.'+namespace+'.navLoad failed!!');
			});
		},
		footerLoad: function(){
			(function () {
				return new Promise(function(resolve, reject) {
					$.get('../_include/footer.html', function(response) {
						if (response) {
							resolve(response);
						}
						reject(new Error('Request is failed'));
					});
				});
			})().then(function(data) {
				$('.footer-area').html(data);
			}).catch(function(err) {
				console.error('win.'+namespace+'.footerLoad failed!!');
			});
		},
		nav: {
			hoverMenu: function(){
				var $header = $('.header-area');
				var $links = $header.find('.gnb-area a');
				var flag = {};

				$links
          .off('.openMenuPC')
          .on('mouseenter.openMenuPC focus.openMenuPC', function () {
						$header.addClass('hover');
						clearTimeout(flag);
            $header
              .off('.closeMenuPC')
              .on('mouseleave.closeMenuPC', removeHover);
            $links.off('.closeMenuPC').on('blur.closeMenuPC', removeHover);
          });
					
				function removeHover() {
					flag = setTimeout(function () {
            $header.removeClass('hover');
          }, 1);
        }
			},
			slidingMenu: function(){
				var $header = $('.header-area');
				var $btnMenu = $header.find('.btn-menu');
				
				$btnMenu
					.off('.openMenu')
					.on('click.openMenu', function(){
						$header.toggleClass('open');
					});
			},
			openDepth2: function(){
				var $header = $('.header-area');
				var $listDepth1 = $header.find('.nav-d1 > li');
				var $btnDepth1 = $listDepth1.children('a');

				console.log($btnDepth1)
				$btnDepth1.on('click', function(e){
					if ($(win).outerWidth() < 1025 && !!$(this).siblings('.nav-d2').length) {
						var $parentList = $(this).closest('li');
						e.preventDefault();
						$listDepth1.not($parentList).removeClass('on');
						$parentList.toggleClass('on');
					}
				})

			}
		},
		mainSlider: {
			slide: {},
			init: function(){
				win[namespace].mainSlider.slide = $('.slider-visual .slider-inner').slick({
					infinite: true,
					speed: 400,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: false,
					pauseOnHover: false,
					dots: true,
					appendDots: '.slider-pagination',
					customPaging : function(slider, idx) {
							return '<a href="#">'+ ((idx < 9)?'0'+ ++idx : ++idx) +'</a>';
					},
				})
			}
		},
		kakaomap: {
			init: function(){
				var container = document.getElementById('map');
				var lating = [37.42815615851663, 126.98949376928282];
				var mark = new kakao.maps.LatLng(lating[0], lating[1]);
				var map = new kakao.maps.Map(container, {
					center: mark,
					level: 3
				}); // create map
				var marker = new kakao.maps.Marker({
					position: mark
				});
				marker.setMap(map);
			}
		},
		cookieControl: {
			setCookie: function ( name, value, expiredays ) {
				var todayDate = new Date();
				todayDate.setDate( todayDate.getDate() + expiredays );
				document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
				console.log(document.cookie);
			},
			isHasCookie: function () {
				var cookiedata = document.cookie;
				console.log(cookiedata);
				if ( cookiedata.indexOf('todayCookie=done') < 0 ){
						return false;
				}
				else {
						return true;
				}
			}
		},
		answer: null,
		checkAnswer: {
			timer: null,
			run: function(){
				var flag = !!win[namespace].answer;
				if (flag) {
					clearTimeout(win[namespace].checkAnswer.timer);
					console.log('has data!');
				} else {
					win[namespace].checkAnswer.timer = setTimeout(function(){
						win[namespace].checkAnswer.run();
						console.log('checking data...');
					}, 1000)
				}
			}
		},
		callSpeechApp: function(){
			console.log('run!!');
			location.href = '/home/resource/apk/SpeechRecognition-0.0.6-release.apk '; // 안드로이드 앱 실행

		},
		init: function(){

			$(win).off('.'+namespace);

			$(doc).on('ready.'+namespace, function(){
				win[namespace].navLoad();
				win[namespace].footerLoad();
				win[namespace].status.scrollCheck.init();

				win[namespace].nav.hoverMenu(); // hover evt on nav
				win[namespace].nav.slidingMenu(); // show/hide evt on nav
				win[namespace].nav.openDepth2(); // 2depth links evt on nav

			})
			$(doc).on('scroll.'+namespace, function(){

			})
		}
	}
	
	win[namespace].init();
})(jQuery, window, document);