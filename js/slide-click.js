define(function(require, exports, module) {
/**
 * @author lxm
 */
(function() {
$.fn.bk_slideClick = function(options){
    var elem = $(this);
    //获取li的长度给予ul宽度
    var liLength = elem.find('ul li').length;
    var liWidth = elem.find('ul li').width();
    var liMarginRight = elem.find('ul li').css('marginRight') || '0px';//读取值带单位px的、
    var liMarginRight2 = liMarginRight.substring(0, liMarginRight.length - 2) - 0 + 2;
    
    //为ul赋值
    elem.find('.cn ul').width(liLength * (liWidth + liMarginRight2));
    
    var defaults = {
        sldie_Start: false
    }
    var opt = $.extend(defaults, options);
    
    var slideClick = {
        init: function(){
            //判断开始是否自动滚动
            if (opt.sldie_Start) {
                slideClick.slideAuto();
                elem.hover(slideClick.slideStop, slideClick.slideAuto);
            }
            elem.find('div.btn-l').live('click', slideClick.slideLeft);
            elem.find('div.btn-r').live('click', slideClick.slideRight);
            
        },
        slideAuto: function(){
            slideClick.slideId = window.setInterval(slideClick.slideRight, 4500);
        },
        slideLeft: function(){
            elem.find('div.btn-l').die('click', slideClick.slideLeft);
            elem.find('ul').css('marginLeft', -liWidth - liMarginRight2);
            elem.find('ul li:last').prependTo(elem.find('ul'));
            elem.find('ul').animate({
                marginLeft: 0
            }, 200, function(){
                elem.find('div.btn-l').live('click', slideClick.slideLeft);
            });
        },
        slideRight: function(){
            elem.find('div.btn-r').die('click', slideClick.slideRight);
            elem.find('ul').animate({
                marginLeft: -liWidth - liMarginRight2
            }, 200, function(){
                $(this).css('marginLeft', 0);
                $(this).find('li:first').appendTo(this);
                elem.find('div.btn-r').live('click', slideClick.slideRight);
            });
        },
        slideStop: function(){
            window.clearInterval(slideClick.slideId);
        }
    }
    slideClick.init();
}
})(jQuery);
});