$(function () {
	// 鼠标悬停事件
	var $lis = $(".slideContent li")
	var $tis = $("a.slideTitle")
	
	
	// 轮播
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
	
	
	
	
	
});	