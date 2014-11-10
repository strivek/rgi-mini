require(["jquery","hoverChangePic/jquery.lightbox-0.5"], function () {
   var $mn_f=$(".mn_f");
   var $block=$mn_f.find(".block"); //获取block块
   var $Cradio=$block.find(".radio");//点击按钮
   var $menu=$(".header .head_show .radio");

   //获取logo块
    var $mid=$(".middle .f_wrap5");
    var $logoBlock=$mid.find(".LogoBlock");

    //鼠标滑过logo按钮变换图片
    $logoBlock.on("mouseenter",function(){
        $(this).find(".showPic1").css("display","none").siblings(".showPic2").css("display","block");
    });
    $logoBlock.on("mouseleave",function(){
        $(this).find(".showPic2").css("display","none").siblings(".showPic1").css("display","block");
    });

    //顶部菜单按钮，单击展开下拉菜单
    $menu.on("click",function(){
        $(this).parents(".header").toggleClass("aft-click");
    });

//点击放大图片效果
    $Cradio.lightBox();

   $block.on("mouseenter",enter);
    //鼠标移出灰色图片显示，彩色图片隐藏
   $block.on("mouseleave",leave);


   function enter(){
       var $radio=$(this).find(".radio");
       //鼠标移入灰色图片隐藏，彩色图片显示
       $(this).find(".showPic1").css("display","none").siblings(".showPic2").css("display","block");
       $(this).find(".shade .bg").stop(true,true);
       $(this).find(".shade .tex").stop(true,true);
        //定义Deffered
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        //定义when与回调
        $.when(d1,d2).done(function(){
            $radio.fadeIn(1000);
            $(this).find(".shade .bg").attr("top","100%");
            $(this).find(".shade .tex").attr("top","200%");
        })
        //动画
       $(this).find(".shade .bg").animate({
            top:"0"
        },600,function(){
            //释放d1
            d1.resolve();
        });
       $(this).find(".shade .tex").animate({
            top:"0"
        },600,function(){
            //释放d2
            d2.resolve();
        })
    }

    function leave(){
        var $radio=$(this).find(".radio");
        $(this).find(".showPic2").css("display","none").siblings(".showPic1").css("display","block");

        $radio.stop(true,true);
        $(this).find(".shade .bg").stop(true,true);
        $(this).find(".shade .tex").stop(true,true);

        var d1 = $.Deferred();
        var d2 = $.Deferred();

       $radio.hide();
        $(this).find(".shade .bg").animate({
            top:"100%"
        },-2000,function(){
            //释放d1
            d1.resolve();
        });
        $(this).find(".shade .tex").animate({
            top:"200%"
        },-2000,function(){
            //释放d2
            d2.resolve();
        })
    }



});
