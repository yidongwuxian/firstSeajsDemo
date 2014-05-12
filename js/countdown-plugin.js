define(function(require, exports, module) {
/**
 * @author lxm 已知参数： 商品id： goodsId 商品倒计时总数： goodsTime(单位秒)
 * @goodsId 商品ID
 * @goodsTime 商品倒计时总数(毫秒)
 * @exception $(document).bk_countDown();
 * @param defaults[
 *            style :{""},//显示时间格式，【normal:00天00时00分00秒,style2:剩余天数:00<br />
 *            天00<br />
 *            时00<br />
 *            分00<br />
 *            秒,style3:剩余天数：00天00时00分00秒，style4：000000】 startChange :
 *            true//开始数字是否跳动、默认true ]
 */
(function($) {
	$.fn.bk_countDown = function(options) {
		var opt = $.extend( {
			style : 'normal',
			startChange : true,
			overMsg:'\u56e2\u8d2d\u7ed3\u675f'
		}, options);
		
		return this.each(function(){
			var tt, ss;		
			var elm = $(this);
			var gt = elm.attr('goodsTime');
			
			showTimeDate();

			if (opt.startChange) {
				ss = window.setInterval(showTimeDate, 1000);
			} else {
				// 默认只改变参数值不做html替代
				tt = window.setInterval(function() {
					gt--;
				}, 1000);

				// 鼠标经过改变参数值并在页面做html替代显示
				elm.hover(function() {
					clearInterval(tt);
					ss = window.setInterval(showTimeDate,  1000);
				}, function() {
					if(ss)
						clearInterval(ss);
					tt = window.setInterval(function() {
						gt--;
					}, 1000);
				});
			}

			function showTimeDate() {
				//当前到结束时间
				var overTime=elm.attr('overTime');
				if(overTime && overTime!='undefined' && overTime.length ){
					var d = new Date(Date.parse(overTime.replace(/-/g, "/"))).getTime();
					gt=Math.floor((d-new Date())/1000);
				}
				
				var s = Math.floor(gt % 60);// 秒
				if (s < 10) {
					s = '0' + s;
				}

				var m = Math.floor(gt / 60 % 60);// 分钟
				if (m < 10) {
					m = '0' + m;
				}

				var h = Math.floor(gt / 60 / 60 % 24);// 小时
				if (h < 10) {
					h = '0' + h;
				}

				var d = Math.floor(gt / 60 / 60 / 24);// 取整数部分
				if (gt == 0) {
					clearInterval(ss);
					elm.html(opt.overMsg);
				} else {
					switch (opt.style) {
					case "normal":// 显示时间格式：1天1时1分1秒
						elm.html('<span class="countdown-d">' + d
								+ '天</span><span  class="countdown-h">' + h
								+ '时</span><span  class="countdown-m">' + m
								+ '分</span><span  class="countdown-s">' + s
								+ '秒</span>');
						break;
					case "style2":
						elm
								.html('<span class="countdown-text">剩余天数</span><span class="countdown-d">'
										+ d
										+ '<br />天</span><span  class="countdown-h">'
										+ h
										+ '<br />时</span><span  class="countdown-m">'
										+ m
										+ '<br />分</span><span  class="countdown-s">'
										+ s + '<br />秒</span>');
						break;
					case "style3":
						elm
								.html('<span class="countdown-text">剩余天数</span><span class="countdown-d">'
										+ d
										+ '天</span><span class="countdown-h">'
										+ h
										+ '时</span><span class="countdown-m">'
										+ m
										+ '分</span><span class="countdown-s">'
										+ s + '秒</span>');
						break;
					case "style4":
						elm.html('<span class="countdown-d">' + d
								+ '</span><span class="countdown-h">' + h
								+ '</span><span class="countdown-m">' + m
								+ '</span><span class="countdown-s">' + s
								+ '</span>');
						break;
					case "style5":
						elm.html('<span class="countdown-d">' + d
								+ ':</span><span class="countdown-h">' + h
								+ ':</span><span class="countdown-m">' + m
								+ ':</span><span class="countdown-s">' + s
								+ '</span>');
						break;
					case "style6":
						elm.html('<span class="countdown-text">剩余时间:</span><span class="countdown-h">'
										+ h
										+ '</span>时<span class="countdown-m">'
										+ m
										+ '</span>分<span class="countdown-s">'
										+ s + '</span>秒');
						break;
					case "style7":
						elm.html('<span class="countdown-text">离结束仅剩</span><span class="countdown-h">'
										+ h
										+ '</span>时<span class="countdown-m">'
										+ m
										+ '</span>分<span class="countdown-s">'
										+ s + '</span>秒');
						break;
					case "style8":
						elm.html('<span class="countdown-text">剩余</span><span class="countdown-h">'
										+ h
										+ '</span>时<span class="countdown-m">'
										+ m
										+ '</span>分<span class="countdown-s">'
										+ s + '</span>秒');
						break;
					default:
						clearInterval(ss);
						alert('样式属性超出范围123');
						break;
					}
					gt--;
				}
			}
		});
		
	};
})(jQuery);
});
