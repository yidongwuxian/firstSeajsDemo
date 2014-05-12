define(function(require, exports,module) {

	 	function fnHeader(){
	 		/*头部下拉菜单*/
			$('.n-list li').hover(function(){
				$(this).find('.navLi').css('color','#fcff7e');
				$(this).find('.pop').find('dt').find('a').css('color','#ffffff');
				$(this).find('.pop').slideDown(400);	
				$(this).addClass('on');

			},function(){
				$(this).find('.navLi').css('color','#fff');
				$(this).find('.pop').css('display','none');	
				$(this).removeClass('on');
			});

			$('.pop').find('dl:last').css('borderRight','none');
	 	}

	  exports.header = fnHeader

});