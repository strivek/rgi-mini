require.config({
    baseUrl: "javascript",
    packages: ["hoverChangePic","crs","exper","c",'canvas','yan','canvas2'],
    paths: {
        jquery: 'lib/jquery.min'
    }
});
require(['hoverChangePic']);
require(['crs']);
require(['exper']);
require(['c']);
require(['canvas']);
require(['yan']);
require(['canvas2']);
