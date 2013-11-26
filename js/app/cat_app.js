var CatApp = new Marionette.Application();

CatApp.addRegions({
    p1Hand: "#p1hand",
    p1Played: '#p1played',
    p2Played: '#p2played'
});

CatApp.getCurrentRoute = function () {
    return Backbone.history.fragment
};

CatApp.on("initialize:after", function () {
    if (Backbone.history) {
        Backbone.history.start();

        if (this.getCurrentRoute() === "") {
            CatApp.vent.trigger("game:begin");
        }
    }
});


$(function () {
    CatApp.start();
});