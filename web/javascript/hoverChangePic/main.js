require(["jquery","hoverChangePic/jquery.lightbox-0.5"], function () {
   var $main=$(".m-main-chy");
   var $mn_f=$(".mn_f");
   var $block=$mn_f.find(".block"); //获取block块
   var $Cradio=$block.find(".radio");//点击按钮
   var $hd_show=$(".header .head_show");
    var $menu= $hd_show.find(".radio");
    var $logo=$hd_show.find(".logo");
    var $s_rg=$hd_show.find(".slide_rg");
    var $hd_link=$hd_show.find(".link");
    var $mid=$(".middle .f_wrap5");//获取logo块
    var $logoBlock=$mid.find(".LogoBlock");
    var $hd_list=$main.find(".header_list");
    var $hd_h1=$hd_show.find(".title");
    var $t_h1=$hd_list.find(".tit_h1");
    var $t_tex=$hd_list.find(".tex");
    var $ydhl=$hd_list.find(".ydhl");
    var $d_radio=$hd_list.find(".d_radio");

   /* $("body").animate({'scrollTop':0},1000);*/

    //点击页面顶部按钮，页面下拉
    $d_radio.on("click",function(){
    $("body").animate({'scrollTop':800},1000);
    });

    //顶部菜单按钮，单击展开下拉菜单
    $menu.on("click",function(){
        if($hd_list.height()==0)
        { $(this).find(".icon").hide().siblings(".icon2").show(); //鼠标点击，按钮旋转90度
            $logo.css({"left":"20px","margin-left":"0"});//瑞观logo移动到左边
            $hd_h1.fadeOut(1000); //页面顶部文字“移动互联时代的海豚梦”逐渐隐藏

            $hd_list.animate({"height":"291px"},function(){ //下拉框的高度逐渐变大
                $t_h1.animate({"margin-top":"42px"},function(){
                    $t_tex.animate({"margin-top":"16px"},function(){//下拉框中的yi段文字逐渐显示
                        $d_radio.animate({"margin-top":"28px"});
                    });
                });
            });
            $hd_link.css({"right":"16%","opacity":100});//页面顶部的两个导航从右边划入溅显
        }
        else{
            $(this).find(".icon2").hide().siblings(".icon").show(); //鼠标点击，按钮旋转90度
            $logo.css({"left":"50%","margin-left":"-97px"});
            $hd_h1.fadeIn(1000);//页面顶部文字“移动互联时代的海豚梦”逐渐显示
            $d_radio.animate({"margin-top":"-235px"},function(){
                $t_tex.animate({"margin-top":"-200px"},function(){//下拉框中的三段文字逐渐消失
                    $t_h1.animate({"margin-top":"-72px"},function(){
                        $hd_list.animate({"height":0});
                    });
                });
            });
            $hd_link.css({"right":"-16%","opacity":0});//页面顶部的两个导航从左边滑出
        }
    });

   //点击放大图片效果
    $Cradio.lightBox();

   //鼠标移入彩色图片显示，灰色图片隐藏
   $block.on("mouseenter",enter);
    //鼠标移出灰色图片显示，彩色图片隐藏
   $block.on("mouseleave",leave);

    //block10、block9鼠标滑过左右拉开,文字溅隐溅显
    var $yunj=$(".yunj");
    var $pic9=$(".block_9 .pic");
    var $pic10=$(".block_10 .pic");
    var $msg10=$(".block_10 .message .text");
    var $msg9=$(".block_9 .message .text");

    $pic9.on("mouseenter",function(){
        $yunj.data("sld","pic10");
        $pic10.css('left',"100%");
        $msg10.fadeIn(2000);
    });

    $pic10.on("mouseenter",function(){
        $yunj.data("sld","pic9");
        $pic9.css('left',"-100%");
        $msg9.fadeIn(2000);

    });

    $yunj.on("mouseleave",function(){
        var sld=$(this).data("sld");
        if(sld=="pic10")
        {
            $pic10.css('left',"0");
            $msg10.fadeOut();
        }
     else if(sld=="pic9")
        {
            $pic9.css("left","0");
            $msg9.fadeOut();
        }
    });


    //鼠标滑过logo商标变换图片
    $logoBlock.on("mouseenter",function(){
        $(this).find(".showPic2").css({"opacity":1});
    });
    $logoBlock.on("mouseleave",function(){
        $(this).find(".showPic2").css({"opacity":0});
    });

   function enter(){
       var $radio=$(this).find(".radio");
       //鼠标移入灰色图片隐藏，彩色图片显示
       $(this).find(".showPic2").css("opacity",1);
       $(this).find(".shade .bg").stop(true,true);
       $(this).find(".shade .tex").stop(true,true);
        //定义Deffered
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        //定义when与回调
        $.when(d1,d2).done(function(){
            $radio.fadeIn(500);
            $(this).find(".shade .bg").attr("top","100%");
            $(this).find(".shade .tex").attr("top","200%");
        })
        //动画
       $(this).find(".shade .bg").animate({
            top:"0"
        },800,function(){
            //释放d1
            d1.resolve();
        });
       $(this).find(".shade .tex").animate({
            top:"0"
        },800,function(){
            //释放d2
            d2.resolve();
        })
    }

    function leave(){
        var $radio=$(this).find(".radio");
        $(this).find(".showPic2").css("opacity",0)/*.siblings(".showPic1").css("display","block")*/;

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
