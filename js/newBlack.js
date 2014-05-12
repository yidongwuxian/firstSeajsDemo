(function(){
	/*list tip start*/
	$('.g-list .pic').stop(true).mouseover(function(){
		$(this).css('borderColor','#bdbf77');	
		$(this).find('.btn').show().stop(true).animate({
			bottom:0
		});
	});
	$('.g-list .pic').stop(true).mouseout(function(){
		$(this).css('borderColor','#ffffff');	
		$(this).find('.btn').stop(true).animate({
			bottom:-20	
		});
	});
	/*list tip end*/
	$('.g-bd .cn').find('li:last').css('marginLeft','1px');
	$('.g-bd1 .cn').find('li:last').css('marginLeft','0px');
	$('.g-bd2 .cn').find('li:last').css('marginLeft','0px');
	
	/*首页新品推荐图-位置以及鼠标移入出现下面的黑色透明文字说明*/
	$('#newList').each(function(){
		$(this).find('li:eq(0)').addClass('pic-ico1');
		$(this).find('li:eq(1)').addClass('pic-ico2');
		$(this).find('li:eq(2)').addClass('pic-ico3');
		$(this).find('li:eq(3)').addClass('pic-ico4');
		$(this).find('li:eq(4)').addClass('pic-ico5');
		$(this).find('li:eq(5)').addClass('pic-ico6');	
		$(this).find('li:eq(6)').addClass('pic-ico7');	
	});

	 $("#newList li").mouseover(function(){
               $(this).find(".hideBox").animate({bottom:0,opacity:0.65},{queue:false,duration:180});
	  });
	  $("#newList li").mouseout(function(){
			  $(this).find(".hideBox").animate({bottom:-68,opacity:0.65},{queue:false,duration:180});
	  });
	/*首页通栏每行最后一个li的borderRight等于1px solid #fff*/
	$('.g-bd1 .cn').find('li:nth-child(3n)').css('borderRight','none');
	/*热销排行左右滚动*/	
	/*热销排行左右滚动 end*/
	/*列表页左侧伸缩菜单*/
	$('#menu li').find('dl').hide();
	$('#menu li:first').find('dl').show();
	$('#menu li:first').find('b').find('span').addClass('redTri');
	$('#menu b').click(function(){
		$('#menu li').find('dl').hide();
		$('#menu b').find('span').removeClass('redTri').addClass('grayTri');
		$(this).find('span').addClass('redTri');
		$(this).parent().find('dl').toggle().silbings().hide();
	});
	/*列表页左侧伸缩菜单 end*/
	
	/*列表页排序组件*/
	$('.fore dd:last').css('borderRight','1px solid #adb1b4');
	$('.fore dd').click(function(){
		$(this).find('b').addClass('UpIco').silbings().removeClass();
	});
	/*列表页排序组件 end*/
})();






























