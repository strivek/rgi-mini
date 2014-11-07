require(["jquery"], function () {
   var $mn_f=$(".mn_f");
   var $block=$mn_f.find(".block"); //获取block块
   var $bg=$block.find(".shade .bg"); //鼠标划入block块遮罩
   var $txt=$block.find(".shade .tex"); //鼠标划入block飞入的文字
   var $radio=$block.find(".radio");//点击按钮

    //鼠标移入灰色图片隐藏，彩色图片显示
   $block.on("mouseenter",function(){
       $(this).find(".showPic1").css("display","none").siblings(".showPic2").css("display","block");

   },move);
    //鼠标移出灰色图片显示，彩色图片隐藏
    $block.on("mouseleave",function(){
       $(this).find(".showPic1").css("display","block").siblings(".showPic2").css("display","none");
    });

   function move(){
        $bg.stop();
       $txt.stop();
        //定义Deffered
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        //定义when与回调
        $.when(d1,d2).done(function(){
            $radio.taggle();
            $bg.top("100%");
           $txt.top("150%");
        })
        //动画
        $bg.animate({
            top:"0"
        },2000,function(){
            //释放d1
            d1.resolve();
        });
        $txt.animate({
            top:"0"
        },1000,function(){
            //释放d2
            d2.resolve();
        })
    }

});
