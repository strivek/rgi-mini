require(["jquery"], function () {

    if (!window.requestAnimFrame) {
        window.requestAnimFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 17 /*~ 1000/60*/);
            });
    }

    var Stars = {
        Time: 0,
        SETS: {
            STARS_COUNT:30

        },
        time: 0,
        step1: 0,
        ctx: document.getElementById('c').getContext('2d'),
        canvas: document.getElementById('c'),
        width: 0,
        height: 0,
        tw: 0,
        Cnt: 0,
        STOR: {
            stars: [],
            cycle: 0
        },


        init: function() {
            var ctx = null,
                dims = function() {
                    var Wid=$('#c').width();
                    var Hei=$('#c').height();
                    Stars.width = Stars.canvas.width = Wid;
                    Stars.height = Stars.canvas.height = Hei;
                    Stars.clearProp.inner.offs = Math.min(100, Stars.height / 20);

                };

            Stars.ctx.webkitImageSmoothingEnabled = Stars.ctx.mozImageSmoothingEnabled = false;

            dims();

            Stars.SETS.COUNT = Stars.width >> 1;

            Stars.ctx.shadowColor = 'black';

            Stars.build();
            Stars.main();

            window.addEventListener('resize', function() {
                dims();
            });

        },

        main: function() {

            for (var x = 0; x < Stars.SETS.STARS_COUNT; x++) {
                Stars.draw(Stars.STOR.stars[x]);
            }

            requestAnimFrame(function(){
                Stars.Cnt++;
                Stars.move();
                Stars.clear();
                Stars.main();

                Stars.time++;
            });
        },

        move: function() {
            var p = null,
                r = Stars.STOR.cycle / 2 + Math.sin(Stars.STOR.cycle / 32),
                dv = Stars.time % 100,
                s = 0;

            for (var x = 0; x < Stars.SETS.STARS_COUNT; x++) {

                p = Stars.STOR.stars[x];
                s = (r + p.rz);

                p.y = p.x * Math.sin(s) - p.y * Math.cos(s);
                p.x = p.x * Math.cos(s) - p.y * Math.sin(s);

                p.z = p.z + 16;

                Stars.step1 = Stars.step1 + 0.01;

                if (p.z > 2000) {
                    Stars.buildOne(x);
                }

            }
        },

        clearProp: {
            inner: {
                offs: 100
            }
        },

        clear: function() {
            var c1 = Math.floor(Math.sin(Stars.STOR.cycle) * 30) + 10,
                c2 = Math.floor(Math.sin(Stars.STOR.cycle + 1.8) * 30) + 10,
                c3 = Math.floor(Math.sin(Stars.STOR.cycle + 2.1) * 40) + 10;

            Stars.ctx.fillStyle = "rgba(10,10,10,0.2)";
            Stars.ctx.fillRect(0, 0, Stars.canvas.width, Stars.canvas.height);
            Stars.STOR.cycle += 0.01;
        },

        lpos: 900,
        draw: function(point) {
            var ctx = Stars.ctx,
                lpos = Stars.lpos;

            x = point.x / lpos * (point.z + lpos) + Stars.width / 2 - 1 || Math.sin(Stars.step1) * Math.sin(Stars.STOR.cycle / 8) ,
                y = point.y / lpos * (point.z + lpos) + Stars.height / 2 + 1 || Math.sin(Stars.step1) * Math.sin(Stars.STOR.cycle / 16 ),

                op = point.z / 250;

            if (x < Stars.width / 9 || x > Stars.width - Stars.width / 9 || y < Stars.height / 9 || y >= Stars.height - Stars.height / 9) {
                Stars.buildOne(x);
                return;
            }

            ctx.fillStyle = "rgba(255,255,255, " + op  + ")";
            Stars.ctx.globalAlpha = 1;
            ctx.moveTo(x, y);
            ctx.fillRect(x ,y, 1, 1);

        },

        build: function() {
            for (var x = 0; x < Stars.SETS.STARS_COUNT; x++) {
                Stars.buildOne(x, 1);
            }
        },

        buildOne: function(x) {
            Stars.STOR.stars[x] = {
                x: (Math.floor(Math.random() * Stars.width) - Stars.width / 2) / 4,
                y: (Math.floor(Math.random() * Stars.height) - Stars.height / 2) / 4,
                z: (Math.floor(Math.random() * 1000)),
                rz: Math.random() * -Math.PI * 2
            };
        }


    };

    Stars.init();


})