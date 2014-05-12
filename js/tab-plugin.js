define(function(require, exports, module) {
/**
 * @author lxm
 * 基于jquery-1.7.2
 */
(function(){
    $.fn.bk_tabSwitch = function(options){
        var elm = $(this);
        var thisLi = elm.find('ul.tab li');
        var liLength = thisLi.length;
        var curIndex = elm.find('ul.tab li.cur').index();
        
        
        //为内容部分追加相应类名
        elm.find('.cn > div').each(function(){
            var thisIndex = $(this).index();
            $(this).addClass('cn' + thisIndex);
        });
        
        //显示默认内容部分
        showCn(curIndex);
        
        
        //默认属性defaults
        var defaults = {
            switchEvent: 'click', //切换事件、默认为鼠标经过切换(hover、click)
            switchMode: 'normal',//默认值normal、(fade属性为淡入淡出效果)
            bgSlide: false
        }
        
        //合并默认值并修改
        options = $.extend(defaults, options);
        
        //为切换按钮绑定相应事件
        thisLi.bind(options.switchEvent, getIndex);
        
        //获取当前索引值
        function getIndex(){
            var curIndex = $(this).index();
            if (options.switchMode == 'normal') {
                showCn(curIndex);
            }
            else 
                if (options.switchMode == 'fade') {
                    showCn2(curIndex);
                }
                else {
                    alert("您所输入的属性超出了范围");
                }
        }
        
        //通过判断索引值显示相应内容部分并隐藏其他内容
        function showCn(num){
            for (i = 0; i < liLength; i++) {
                if (i == num) {
                    elm.find('ul.tab li:eq(' + i + ')').addClass('cur');
                    elm.find('.cn' + i).css('display', 'block');
                }
                else {
                    elm.find('ul.tab li:eq(' + i + ')').removeClass('cur');
                    elm.find('.cn' + i).css('display', 'none');
                }
            }
        }
        
        function showCn2(num){
            elm.find('.cn > div').each(function(){
                $(this).css('position', 'absolute');
            });
            for (i = 0; i < liLength; i++) {
                if (i == num) {
                    elm.find('ul.tab li:eq(' + i + ')').addClass('cur');
                    elm.find('.cn' + i).fadeIn();
                }
                else {
                    elm.find('ul.tab li:eq(' + i + ')').removeClass('cur');
                    elm.find('.cn' + i).fadeOut();
                }
            }
        }
    }
})(jQuery)
});
