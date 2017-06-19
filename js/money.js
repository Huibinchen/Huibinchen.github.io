

//数钱榜
touch.on('.ranking', "tap", function(e) {
    $("#ranking").show();
});
//活动奖品
touch.on(".prize", "tap", function() {
    $("#prize").show();
});
//活动规则
touch.on(".activity_rule", "tap", function() {
    $("#activity_rule").show();
});
//使用说明
touch.on(".shiyong", "tap", function() {
    $("#shiyong").show();
});

//关闭弹窗
$(".close").on("touchstart", function() {
    $(this).parent().hide();
});

//开始游戏
touch.on("#start_btn","tap",function (e) {
    //开始游戏填写个人资料
    $("#user_data").show();
    $(".sub").on("touchstart",function (e) {
        e.preventDefault();
        succ();
    });
    function succ() {
        $(".p1").fadeOut();
        $("#p2").fadeIn();
        var txtIndex = 0;
        var txtArr = ["img/p2_txt1.png", "img/p2_txt2.png", "img/p2_txt3.png"];
        setInterval(function(){
            txtIndex++;
            if(txtIndex > txtArr.length - 1){
                txtIndex = 0;
            }
            $(".p2_txt").attr({
                src : txtArr[txtIndex]
            });
        },2000)
    }

});