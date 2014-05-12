define(function(require, exports, module) {
/**
 * @author lxm
 * @exception $(selecter).imgSlide({
 *                showBtns : true,// 是否显示btns showClickBtns : false,// 是否显示切换按钮
 *                showText : false,// 是否显示text showTextSize : 4,// 显示字符个数
 *                switchTime : 4500,//切换时间 onImgStop : false//鼠标经过是否停止播放 });
 */
(function($) {
	$.fn.imgSlide = function(options) {
		var elm = $(this);
		var elmId = elm.attr('id');
		var thisUl = elm.find('ul:first');
		var liNum = thisUl.find('li').length;
		var elmCn = elmId + '-cn', elmCnHeight = thisUl.find('img').height();
		var elmTt = elmId + '-tt';
		var elmText = elmId + '-text';
		var index = 0, animateTime = 450, animateTime1 = 450, animateTime2 = 250;
		// 追加一个包装
		thisUl.wrap('<div id="' + elmCn + '"></div>');
		var elmCnId = $('#' + elmCn);
		elmCnId.css({
			position : 'position',
			overflow : 'hidden'
		});
		// 默认属性
		defaults = {
			showBtns : true,// 是否显示btns
			showClickBtns : false,// 是否显示切换按钮
			showText : false,// 是否显示text
			mode : 'up',
			showTextSize : 4,// 显示字符个数
			switchTime : 4500,// 切换时间
			onImgStop : false
		// 鼠标经过是否停止播放
		};
		opt = $.extend(defaults, options);

		// 如果显示btns
		if (opt.showBtns) {
			createBtns();
		}

		// 如果显示text
		if (opt.showText) {
			createText();
		}

		// 如果显示左右切按钮
		if (opt.showClickBtns) {
			createClickBtns();
		}

		// 创建btns
		function createBtns() {// 创建外部btns模块
			var btns = '';
			for ( var i = 1; i <= liNum; i++) {
				btns += '<span>' + i + '</span>';
			}
			btns = '<div id="' + elmTt + '" class="' + elmTt + '">' +'<div class="inner">'+ btns
					+ '</div>'+'</div>';

			// 追加btns
			elm.append(btns);
			$('#' + elmTt).find('span').hover(function() {
				index = $(this).index();
				animateTime = animateTime2;
				slideX.slideStop();
				slideX.slideAuto2();
			}, function() {
				animateTime = animateTime1;
				slideX.slideStop2();
				slideX.slideAuto();
			});
			curBtn();
		}

		// 创建text
		function createText() {
			var elmTextCn = '';
			var text = new Array();

			for ( var i = 0; i < liNum; i++) {
				text[i] = elm.find('li').eq(i).find('img').attr('alt')
						.substring(0, opt.showTextSize);
				elmTextCn += '<li><a>' + text[i] + '</a></li>';
			}
			elmTextCn = '<div id="' + elmText + '"><ol>' + elmTextCn
					+ '</ol></div>';

			// 追加text
			elm.append(elmTextCn);
			$('#' + elmText).find('li').hover(function() {
				index = $(this).index();
				animateTime = animateTime2;
				slideX.slideStop();
				slideX.slideAuto2();
			}, function() {
				animateTime = animateTime1;
				slideX.slideStop2();
				slideX.slideAuto();
			});
			curText();
		}

		// 创建上一张下一张按钮
		function createClickBtns() {
			// p上一张、n下一张
			elm.append('<div id="' + elmId + '-btn-p" class="' + elmId
					+ '-btn-p">&lt;&lt;</div><div id="' + elmId
					+ '-btn-n" class="' + elmId + '-btn-n">&gt;&gt;</div>');
		}

		// 显示当前btns
		function curBtn() {
			$('#' + elmTt).find('span').removeClass('cur');
			$('#' + elmTt).find('span').eq(index).addClass('cur');
		}

		// 显示当前text
		function curText() {
			$('#' + elmText).find('li').removeClass('cur');
			$('#' + elmText).find('li').eq(index).addClass('cur');
		}

		var slideX = {
			init : function() {
				// 如果向下切换
				if (opt.mode == 'down') {
					thisUl.css('marginTop', -(liNum - 1) * elmHeight);
				}

				// 如果横向切换
				if (opt.mode == 'left' || opt.mode == 'right') {
					thisUl.width(liNum * elmWidth).find('li').css('float',
							'left');
					if (opt.mode == 'right') {
						thisUl.css('marginLeft', -(liNum - 1) * elmWidth);
					}
				}

				// 如果淡入淡出
				if (opt.mode == 'fade') {
					thisUl.find('li').css({
						position : 'absolute',
						top : 0,
						left : 0,
						display : 'none'
					});
					thisUl.find('li:first').css('display', 'block');
				}

				// 如果点击切换上下一张
				if (opt.showClickBtns) {
					$('#' + elmId + '-btn-p').hover(slideX.slideStop,
							slideX.slideAuto).click(function() {
						--index;
						if (index < 0) {
							index = liNum - 1;
						}
						slideX.slideAnimate();
					});
					$('#' + elmId + '-btn-n').hover(slideX.slideStop,
							slideX.slideAuto).click(function() {
						++index;
						if (index >= liNum) {
							index = 0;
						}
						slideX.slideAnimate();
					});
				}

				// 默认滚动
				slideX.slideAuto();
			},
			slideAuto : function() {
				setIntervalId = setInterval(function() {
					index++;
					if (index == liNum) {
						index = 0;
					}
					slideX.slideAnimate();
				}, opt.switchTime);

			},
			slideAuto2 : function() {
				setTimeoutId2 = setTimeout(function() {
					slideX.slideAnimate();
				}, 200);
			},
			slideStop : function() {
				clearInterval(setIntervalId);
			},
			slideStop2 : function() {
				clearTimeout(setTimeoutId2);
			},
			slideAnimate : function() {
				switch (opt.mode) {
				case 'up':

					thisUl.animate({
						marginTop : -index * elmCnHeight
					}, animateTime, function() {
						curBtn();
						curText();

					});

					break;
				case 'down':
					thisUl.animate({
						marginTop : -(liNum - 1 - index) * elmHeight
					}, 450, function() {
						curBtn();
						curText();
					});
					break;
				case 'left':
					thisUl.animate({
						marginLeft : -index * elmWidth
					}, 450, function() {
						curBtn();
						curText();
					});
					break;
				case 'right':
					thisUl.animate({
						marginLeft : -(liNum - 1 - index) * elmWidth
					}, 450, function() {
						curBtn();
						curText();
					});
					break;
				case 'fade':
					thisUl.find('li').fadeOut(500);
					thisUl.find('li:eq(' + index + ')').fadeIn(800);
					curBtn();
					curText();
					break;
				default:
					return;
				}
			}
		};

		// 开始滚动
		slideX.init();

		// 鼠标经过图片是否停止播放
		if (opt.onImgStop) {
			thisUl.find('li img').hover(slideX.slideStop, slideX.slideAuto);
		}
	};
})(jQuery);
});
