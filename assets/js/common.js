$(document).ready(function() {
    'use strict';
    /*-----------------------------------------------------------------
      Detect device mobile
    -------------------------------------------------------------------*/

    var isMobile = false;
    if( /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('touch');
        isMobile = true;
    }
    else {
        $('html').addClass('no-touch');
        isMobile = false;
    }
	//IE, Edge
	var isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent);

    /*-----------------------------------------------------------------
      加载动画
    -------------------------------------------------------------------*/
    anime({//加载skill进度条
        targets: 'body',
        opacity: 1,
        delay: 400,
        complete: function(anim) {
            progressBar(); //Init progress bar
        }
    });

    $('body').imagesLoaded({ background: !0 }).always( function() {
	    preloader(); //Init preloader
    });

    function preloader() {
        var tl = anime.timeline({});
        tl
        .add({
            targets: '.preloader',
            duration: 100,
            opacity: 1
        })
        .add({
            targets: '.circle-pulse',
            duration: 200,
            //delay: 500,
            opacity: 1,
            zIndex: '-1',
            easing: 'easeInOutQuart'
        },'+=200')
        .add({
            targets: '.preloader__progress span',
            duration: 200,
            width: '100%',
			easing: 'easeInOutQuart'
        },'-=200')
        .add({
            targets: '.preloader',
            duration: 200,
            opacity: 0,
            zIndex: '-1',
            easing: 'easeInOutQuart'
        });
    };

    /*-----------------------------------------------------------------
      传送带
    -------------------------------------------------------------------*/	
    
	// 格言，使用了Swiper插件,each() 方法为每个匹配元素规定要运行的函数。
	$('.js-carousel-review').each(function() {
		var carousel = new Swiper('.js-carousel-review', {
            slidesPerView: 1,
			spaceBetween: 30,
			speed: 300,
			grabCursor: true,
			watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
		        clickable: true
            },
			autoplay: {
                delay: 10000,
            },
			breakpoints: {
                580: {
                    spaceBetween: 20
                }
            }
		});
	});
	
	// 友情链接，位于friends
	$('.js-carousel-clients').each(function() {
		var carousel = new Swiper('.js-carousel-clients', {
            slidesPerView: 3,
			spaceBetween: 30,
			//loop: true,
			grabCursor: true,
			watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
		        clickable: true
            },
			breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 0
                },				
                580: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
		});
	});



    /*-----------------------------------------------------------------
      粘性侧边栏,插件sticky kit
    -------------------------------------------------------------------*/
    //定义开启函数
    function activeStickyKit() {
        //设置parent
        $('.sticky-column').stick_in_parent({
            parent: '.sticky-parent'
        });

        // bootstrap col position
        $('.sticky-column')
        .on('sticky_kit:bottom', function() {//在元素底部时parent位置静止
            $(this).parent().css('position', 'static');
        })
        .on('sticky_kit:unbottom', function() {//否则parent位置为相对
            $(this).parent().css('position', 'relative');
        });
    };
    activeStickyKit();

    //定义关闭函数
    function detachStickyKit() {
        $('.sticky-column').trigger("sticky_kit:detach");
    };

    //根据窗口大小关闭sticky kit

    var screen = 992;

    var windowHeight, windowWidth;
    windowWidth = $(window).width();
    if ((windowWidth <= screen)) {
        detachStickyKit();
    } else {
        activeStickyKit();
    }

    // 窗口大小实时感知
    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).resize(debounce(function(){
        windowSize();
        $(document.body).trigger("sticky_kit:recalc");
        if (windowWidth < screen) {
            detachStickyKit();
        } else {
            activeStickyKit();
        }
    }, 250));


    /*-----------------------------------------------------------------
        skill加载条，位于resume
    -------------------------------------------------------------------*/

    function progressBar() {
        $('.progress').each(function() {
            var ctrl = new ScrollMagic.Controller();
            new ScrollMagic.Scene({
                triggerElement: '.progress',
                triggerHook: 'onEnter',
                duration: 300
            })
                .addTo(ctrl)
                .on("enter", function (e) {
                    var progressBar = $('.progress-bar');
                    progressBar.each(function(indx){
                        $(this).css({'width': $(this).attr('aria-valuenow') + '%', 'z-index': '2'});
                    });
                });
        });
    }

    /*-----------------------------------------------------------------
      滚动条指示器，位于blog页面
    -------------------------------------------------------------------*/
  
    function scrollIndicator() {
        $(window).on('scroll', function() {
            var wintop = $(window).scrollTop(), docheight = 
            $(document).height(), winheight = $(window).height();
 	        var scrolled = (wintop/(docheight-winheight))*100;
  	        $('.scroll-line').css('width', (scrolled + '%'));
        });
    }
	
	scrollIndicator(); //Init
	
	
    /*-----------------------------------------------------------------
      视差背景插件
    -------------------------------------------------------------------*/		

    function parallax() {
        $('.js-parallax').jarallax({
			disableParallax: function () {
			  return isIE
			},
            speed: 0.65,
            type: 'scroll'
        });
	};
	
	parallax(); //Init*/
    
	
    /*-----------------------------------------------------------------
      回到首页按钮
    -------------------------------------------------------------------*/
	
    function scrollToTop() {
        var $backToTop = $('.back-to-top'),
            $showBackTotop = $(window).height();
        $backToTop.hide();//先隐藏
        //当滚动到$(window).heigh下时出现
        $(window).scroll( function() {
            var windowScrollTop = $(window).scrollTop();
            if( windowScrollTop > $showBackTotop ) {
                $backToTop.fadeIn('slow');
            } else {
                $backToTop.fadeOut('slow');
            }
        });
        
		$backToTop.on('click', function (e) {
            e.preventDefault();
            $(' body, html ').animate( {scrollTop : 0}, 'slow' );
        });
    }
	scrollToTop(); //Init


    /*-----------------------------------------------------------------
      works类型选择
    -------------------------------------------------------------------*/

    $('.select').on('click','.placeholder',function(){
      var parent = $(this).closest('.select');
      if ( ! parent.hasClass('is-open')){
          parent.addClass('is-open');
          $('.select.is-open').not(parent).removeClass('is-open');
      }else{
          parent.removeClass('is-open');
      }
    }).on('click','ul>li',function(){
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );

	    $('.filter__item').removeClass('active');
	    $(this).addClass('active');
	    var selector = $(this).attr('data-filter');

	    $('.js-filter-container').isotope({
	        filter: selector
	    });
	    return false;
    });


    /*-----------------------------------------------------------------
      works的网格结构
    -------------------------------------------------------------------*/	
	
    // Portfolio grid row
    var $portfolioMasonry = $('.js-grid-row').isotope({
        itemSelector: '.gallery-grid__item',
	    layoutMode: 'fitRows',
        percentPosition: true,
	    transitionDuration: '0.5s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },
        fitRows: {
            gutter: '.gutter-sizer'
        },	
        masonry: {
	        columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true
        }
    });
  
    $portfolioMasonry.imagesLoaded().progress( function() {
        $portfolioMasonry.isotope ({
	        columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true,
	        layoutMode: 'fitRows',
            fitRows: {
                gutter: '.gutter-sizer'
            }
	    });
    });	

	// Portfolio grid irregular
	var $portfolioIrregularMasonry = $('.js-grid').isotope({
        itemSelector: '.gallery-grid__item',
        percentPosition: true,
	    transitionDuration: '0.5s',
        hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.001)'
        },
        visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
        },
        masonry: {
	        columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true
        }
    });
  
    $portfolioIrregularMasonry.imagesLoaded().progress( function() {
        $portfolioIrregularMasonry.isotope ({
	        columnWidth: '.gallery-grid__item',
            gutter: '.gutter-sizer',
            isAnimated: true
	    });
    });

    /*-----------------------------------------------------------------
	  works图片的zoom动画
    -------------------------------------------------------------------*/
  
    mediumZoom('[data-zoom]', {
        margin: 30
    });

});

