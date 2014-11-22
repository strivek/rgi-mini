require.config({
    baseUrl: "javascript",
    packages: ["hoverChangePic","crs",'canvas'],
    paths: {
        jquery: 'lib/jquery.min'
    }
});
require(['hoverChangePic']);
require(['crs']);
require(['canvas']);

