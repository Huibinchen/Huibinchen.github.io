$(function () {
	//	鼠标悬停事件
	var $lis = $(".slideContent li")
	var $tis = $("a.slideTitle")
	
	
	//	轮播
	var s = 0
	
	
	$tis[0].style.color = "#52e2c0"
	$lis.eq(0).css({"zIndex":"1","opacity":"1"})
	function step(){
		$tis[s].style.color = "#fff"
		$lis.css({"zIndex":"0","opacity":"0"})
		s++;
		if(s == $lis.length){
			s = 0;
		}
		$lis.eq(s).css({"zIndex":"1","opacity":"1"})
		$tis[s].style.color = "#52e2c0"
		
		$tis.mouseover(function(){
			var i = $(this).index()
			$tis[s].style.color = "#fff"
			$lis.css({"zIndex":"0","opacity":"0"})
			s = i;
			$tis[s].style.color = "#52e2c0"
			$lis.eq(s).css({"zIndex":"1","opacity":"1"})
		})	
	}
	setInterval(step,3000);
	
	//	首播  小轮播
	
	var $slider = $(".firstMvList .slider") 
	var $mvp = $(".mv-prev")  
	var $mvn = $(".mv-next") 
	var f = -470
	function slider(){
		var $sml = parseFloat($slider.css("margin-left"))
		if($sml == '-470'){
			$slider.css({
				"margin-left" : "0px"
			})
		}else{
			$slider.css({
				"margin-left" : "-470px"
			})
		}
		$mvp.click(function(){
			mvp()
		})
		$mvn.click(function(){
			mvn()
		})
		function mvp(){ 
			var $sml = parseFloat($slider.css("margin-left"))
			if($sml == '-470'){
				$slider.css({
					"margin-left" : "0px"
				})
			}else{
				$slider.css({
					"margin-left" : "-470px"
				})
			}
			
		}
		function mvn(){
			var $sml = parseFloat($slider.css("margin-left"))
			if($sml == '0'){
				$slider.css({
					"margin-left" : "-470px"
				})
			}else{
				$slider.css({
					"margin-left" : "0px"
				})
			}
		}
	}
	setInterval(slider,3000);
	
	//	音乐V榜
	var index = 0
	$(".vchart_item:eq(0)").addClass("vchart_item_active").parent().addClass("d5")
	$(".vchart_item:eq(3)").addClass("vchart_item_active").parent().addClass("d4")
	$(".vchart_item:eq(6)").addClass("vchart_item_active").parent().addClass("d3")
	
	$("li.d5 .vchart_item").mouseover(function(){
		$("li.d5 .vchart_item").removeClass("vchart_item_active")
		$(this).addClass("vchart_item_active")
	})
	$("li.d4 .vchart_item").mouseover(function(){
		$("li.d4 .vchart_item").removeClass("vchart_item_active")
		$(this).addClass("vchart_item_active")
	})
	$("li.d3 .vchart_item").mouseover(function(){
		$("li.d3 .vchart_item").removeClass("vchart_item_active")
		$(this).addClass("vchart_item_active")
	})


  	//	自制节目
	var index = 0
	$(".program_item:eq(0)").addClass("program_item_active").parent().addClass("d5")
	$(".program_item:eq(3)").addClass("program_item_active").parent().addClass("d4")
	$(".program_item:eq(6)").addClass("program_item_active").parent().addClass("d3")
	
	$("li.d5 .program_item").mouseover(function(){
		$("li.d5 .program_item").removeClass("program_item_active")
		$(this).addClass("program_item_active")
	})
	$("li.d4 .program_item").mouseover(function(){
		$("li.d4 .program_item").removeClass("program_item_active")
		$(this).addClass("program_item_active")
	})
	$("li.d3 .program_item").mouseover(function(){
		$("li.d3 .program_item").removeClass("program_item_active")
		$(this).addClass("program_item_active")
	})
	
	

});	










//	$mvp.click(function(){ 
//		var $sml = parseFloat($slider.css("margin-left"))
//		if($sml == '-470'){
//			$slider.css({
//				"margin-left" : "0px"
//			})
//		}else{
//			$slider.css({
//				"margin-left" : "-470px"
//			})
//		}
//		
//	})
//	$mvn.click(function(){
//		var $sml = parseFloat($slider.css("margin-left"))
//		if($sml == '0'){
//			$slider.css({
//				"margin-left" : "-470px"
//			})
//		}else{
//			$slider.css({
//				"margin-left" : "0px"
//			})
//		}
//	})




//	懒加载
	
//	var loadingImgs = [
//	 	["img/3.png","img/2.gif","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","arrow.png"], //首播
//	 	[], //娱乐
//	 	[], //热播推荐
//	 	[], //音悦V榜
//	 	[], //自制节目
//	 	[], //精品悦单
//	 	[], //猜你喜欢
//	]
//	var loadingedNum = 0;
//	var imgs = $(".index_box_turn")
//	$(window).on("scroll",function (){
//    // 获取滚动条移动的距离
//	    var t = $("body").scrollTop();
//	      // 获取浏览器窗口底边的位置:t+可视区的高度
//	    var b = t + $(window).height();
//	    for (var i=0; i<imgs.length; i++){
//	        // 如果图片距离文档头部的距离大于了b(浏览器底边)的距离说明就是能看到图片了
//	        if (b>imgs.eq(i).offset().top){
//	          //将data-src的地址赋值给src-》渲染
//		        for(var j = 0; j < loadingImgs[i].length; i ++){
//		          	var imgObj = new Image();
//			        imgObj.src = loadingImgs[i][j];
//			        imgObj.onload = function() {
//			        	loadingedNum++;
//			            if (loadingedNum >= loadingImgs[i].length - 2) {
//			                $(".loading").css("display" : "none");
//			            }
//			        }
//		        }
//	        }
//	    }
//  })
//	