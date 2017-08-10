$(function(){
	

	var mySwiper = new Swiper ('.swiper-container', {
	//  direction: 'vertical',
	    loop: true,
	    
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    paginationClickable :true,
	    
	    // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    
	    autoplay: 3000,//可选选项，自动滑动
	    autoplayDisableOnInteraction:false,
	    speed:1000
	})
	function goPAGE() {
		if ((window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
			//移动端浏览
	//		$(".swiper-lazy").eq(1).css({"background-image": "url(img/4.jpg)";})
	//		$(".swiper-lazy").eq(2).css({"background-image": "url(img/5.jpg)"})
	//		$(".swiper-lazy").eq(3).css({"background-image": "url(img/6.jpg)"})
			
			var img = document.createElement("img")
			//清空所有子元素
			$(".swiper-slide>a").empty()
			$(".swiper-slide>a").append(img)
			$(".swiper-slide img").eq(0).attr("src","img/4.jpg")
			$(".swiper-slide img").eq(1).attr("src","img/5.jpg")
			$(".swiper-slide img").eq(2).attr("src","img/6.jpg")
			$(".swiper-slide img").eq(3).attr("src","img/4.jpg")
			$(".swiper-slide img").eq(4).attr("src","img/5.jpg")
		}
	}
	goPAGE()
	

	
})