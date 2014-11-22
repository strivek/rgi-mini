require(["jquery"], function () {
    var experience = {
        page : null,
        resize: null,
        init : function(){
        // SET
        if($('#lines').length){
        this.setLines();
        }
        },
        setLines : function(){
        this.canvas = document.querySelector('canvas');

        var ctx = this.canvas.getContext('2d'),
        color = '#ffffff';

        var experWid=$('#experience').width();
        var experHei=$('#experience').height();

        this.canvas.width = experWid;
        this.canvas.height = experHei;
        this.canvas.style.display = 'block';
        ctx.fillStyle = color;
        ctx.lineWidth = .1;
        ctx.strokeStyle = color;


        this.resize = function(){
        experience.canvas.width = window.innerWidth;
        experience.canvas.height = window.innerHeight;
        ctx.fillStyle = color;
        ctx.lineWidth = .1;
        ctx.strokeStyle = color;
        };

        $(window).on('resize', experience.resize);

        var mousePosition = {
        x: 30 * experience.canvas.width / 100,
        y: 30 * experience.canvas.height / 100
        };

        var dots = {
        nb: 150,
        distance: 60,
        d_radius: 150,
        array: []
        };

        function Dot(){
        this.x = Math.random() * experience.canvas.width;
        this.y = Math.random() * experience.canvas.height;
        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();
        this.radius = Math.random();

        }

        Dot.prototype = {
        create: function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        }
        };

        Dot.animate = function(){
        var i, dot;

        for(i = 0; i < dots.nb; i++){
        dot = dots.array[i];

        if(dot.y < 0 || dot.y > experience.canvas.height){
        dot.vx = dot.vx;
        dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > experience.canvas.width){
        dot.vx = - dot.vx;
        dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
        }
        };

        Dot.line = function(){
        var i, j, i_dot, j_dot;

        for(i = 0; i < dots.nb; i++){
        for(j = 0; j < dots.nb; j++){
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
        ctx.beginPath();
        ctx.moveTo(i_dot.x, i_dot.y);
        ctx.lineTo(j_dot.x, j_dot.y);
        ctx.stroke();
        ctx.closePath();
        }
        }
        }
        }
        };

        function createDots(){
        var i;

        ctx.clearRect(0, 0, experience.canvas.width, experience.canvas.height);

        if(dots.array.length < 1) {
        for(i = 0; i < dots.nb; i++){
        dots.array.push(new Dot());
        }
        }

        for(i = 0; i < dots.nb; i++){
        var dot = dots.array[i];
        dot.create();
        }

        Dot.line();
        Dot.animate();
        }
       var m_left=parseInt($('.m-main-chy').css('marginLeft'));

        $('#experience').on('mousemove mouseleave', function(e){
        if(e.type == 'mousemove'){
        mousePosition.x = e.pageX-m_left;
        mousePosition.y = e.pageY-$(window).scrollTop()-300;

//            console.log('Y坐标'+mousePosition.y+'X坐标'+ mousePosition.x);
        }
        if(e.type == 'mouseleave'){
        mousePosition.x = experience.canvas.width / 3;
        mousePosition.y = experience.canvas.height / 2;
        }
        });

        this.interval = setInterval(createDots, 1000/30);

        },

        destroy : function() {
        if(this.interval) {
        clearInterval(this.interval);
        }
        if(experience.resize){
        $(window).on('resize', experience.resize);
        }

        }
        };

    experience.init();

})