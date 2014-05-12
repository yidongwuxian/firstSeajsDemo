define(function(require, exports,module) {

	 $(function() { 
	 		$('#header').load('header.html');

	 		require('./header');

	 		/*首页新品推荐图-位置以及鼠标移入出现下面的黑色透明文字说明*/
	 		$('#newList').find('li').eq(1).css('left','180px');
	 		$('#newList').find('li').eq(2).css('left','180px');
			$('#newList').find('li').eq(4).css({'bottom':'-180px','left':'0'});
			$('#newList').find('li').eq(5).css({'bottom':'-180px','left':'0'});
			
			$("#newList li").mouseover(function(){
              $(this).find(".hideBox").animate({bottom:0,opacity:0.65},{queue:false,duration:180});
			});
			$("#newList li").mouseout(function(){
			  $(this).find(".hideBox").animate({bottom:-68,opacity:0.65},{queue:false,duration:180});
			});
			

			/*首页通栏每行最后一个li的borderRight等于1px solid #fff*/
			$('.g-bd1 .cn').find('li:nth-child(3n)').css('borderRight','none');
	 
	 })

});