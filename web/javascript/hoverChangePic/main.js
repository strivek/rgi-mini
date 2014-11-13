require(["jquery","hoverChangePic/jquery.lightbox-0.5"], function () {
   var $main=$(".m-main-chy");
   var $mn_f=$(".mn_f");
   var $block=$mn_f.find(".block"); //获取block块
   var $Cradio=$block.find(".radio");//点击按钮
   var $hd_show=$(".header .head_show");
   var $menu= $hd_show.find(".radio");
   var $s_rg=$hd_show.find(".slide_rg");
    var $hd_link=$hd_show.find(".link");
    var $mid=$(".middle .f_wrap5");//获取logo块
    var $logoBlock=$mid.find(".LogoBlock");
    var $hd_list=$main.find(".header_list");
    var $t_con=$hd_list.find(".con");
    var $t_h1=$hd_list.find(".tit_h1");
    var $t_h2=$hd_list.find(".tit_h2");
    var $hd_h1=$hd_show.find(".title");
    var $d_radio=$t_con.find(".d_radio");

    $("body").animate({'scrollTop':0},1000);

    //点击页面顶部按钮，页面下拉
    $d_radio.on("click",function(){
    $("body").animate({'scrollTop':800},1000);


    });

    //顶部菜单按钮，单击展开下拉菜单
    $menu.on("click",function(){

        if($hd_list.height()==0)
        { $(this).find(".icon").hide().siblings(".icon2").show(); //鼠标点击，按钮旋转90度
            $s_rg.animate({"margin-top":"33px","color":"#fff"},//褐色rgi_brand 文字下落
            function(){
                   //白色文字接着下落，同时改变颜色字体
                    $t_h1.css({"margin-top":"0px","font-size":"30px","color":"#fff"});
                   //下拉框文字“移动互联时代的海豚梦”逐渐显示
                    $t_h2.fadeIn(1000);
            });
            $hd_h1.fadeOut(1000); //页面顶部文字“移动互联时代的海豚梦”逐渐隐藏

            $hd_list.animate({"height":"291px"},function(){ //下拉框的高度逐渐变大
                $t_con.css({"opacity":100});//下拉框中的三段文字逐渐显示
            });
            $hd_link.css({"right":"16%","opacity":100});//页面顶部的两个导航从右边划入溅显

        }
        else{
            $(this).find(".icon2").hide().siblings(".icon").show(); //鼠标点击，按钮旋转90度
            $s_rg.animate({"margin-top":"10px","color":"#92818d"},function(){//褐色rgi_brand 文字上行
                $t_h1.css({"margin-top":"-72px","font-size":"14px","color":"#92818d"});//白色文字接着上滑，同时改变颜色字体
                $t_h2.fadeOut();// //下拉框文字“移动互联时代的海豚梦”逐渐消失
            })
            $hd_h1.fadeIn(1000);//页面顶部文字“移动互联时代的海豚梦”逐渐显示
            $hd_list.animate({"height":0},function(){//下拉框的高度逐渐变小
                $t_con.css({"opacity":0});//下拉框中的三段文字逐渐消失
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

    //block10、block9鼠标滑过左右拉开
    var $yunj=$(".yunj");
    var $pic9=$(".block_9 .pic");
    var $pic10=$(".block_10 .pic");

    $pic9.on("mouseenter",function(){
        $pic10.css('left',"100%");
        $yunj.data("sld","pic10");
    });

    $pic10.on("mouseenter",function(){
        $pic9.css('left',"-100%");
        $yunj.data("sld","pic9");
    });

    $yunj.on("mouseleave",function(){
        var sld=$(this).data("sld");
        if(sld=="pic10")
        {
            $pic10.css('left',"0");
        }
     else if(sld=="pic9")
        {
            $pic9.css("left","0");
        }
    });



   /* $yunj.on("mouseleave",function(){
        $pic9.css('left',"0");
    });*/

    //鼠标滑过logo商标变换图片
    $logoBlock.on("mouseenter",function(){
        $(this).find(".showPic1").css("display","none").siblings(".showPic2").css("display","block");
    });
    $logoBlock.on("mouseleave",function(){
        $(this).find(".showPic2").css("display","none").siblings(".showPic1").css("display","block");
    });

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
            $radio.fadeIn(500);
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
