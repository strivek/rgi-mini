require(["jquery","hoverChangePic/jquery.lightbox-0.5"], function () {
   var $mn_f=$(".mn_f");
   var $block=$mn_f.find(".block"); //获取block块
   var $bg=$block.find(".shade .bg"); //鼠标划入block块遮罩
   var $txt=$block.find(".shade .tex"); //鼠标划入block飞入的文字
   var $radio=$block.find(".radio");//点击按钮
   var $menu=$(".header .head_show .radio");

    //顶部菜单按钮，单击展开下拉菜单

    $menu.on("click",function(){
        $(this).parents(".header").toggleClass("aft-click");
    });
   $block.on("mouseenter",enter);
    //鼠标移出灰色图片显示，彩色图片隐藏
   $block.on("mouseleave",leave);

   $radio.lightBox();
   function enter(){
       //鼠标移入灰色图片隐藏，彩色图片显示
       $(this).find(".showPic1").css("display","none").siblings(".showPic2").css("display","block");
       $bg.stop(true,true);
       $txt.stop(true,true);
        //定义Deffered
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        //定义when与回调
        $.when(d1,d2).done(function(){
            $radio.fadeIn(1000);
            $bg.attr("top","100%");
            $txt.attr("top","200%");
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
        },2000,function(){
            //释放d2
            d2.resolve();
        })
    }

    function leave(){
        $(this).find(".showPic2").css("display","none").siblings(".showPic1").css("display","block");

        $radio.stop(true,true);
        $bg.stop(true,true);
        $txt.stop(true,true);

        var d1 = $.Deferred();
        var d2 = $.Deferred();

        $radio.fadeOut(1000);
        $bg.animate({
            top:"100%"
        },-2000,function(){
            //释放d1
            d1.resolve();
        });
        $txt.animate({
            top:"200%"
        },-2000,function(){
            //释放d2
            d2.resolve();
        })
    }



});
