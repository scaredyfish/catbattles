CatApp.module('Models', function (Models, App, Backbone, Marionette, $, _) {

    Models.Card = Backbone.Model.extend({
        urlRoot: '/api/Card',
        defaults: {
            name: 'Card',
            attack: '1',
            defence: '1'
        }

    });


    Models.CardCollection = Backbone.Collection.extend({
        model: Models.Card,
        url: 'json/SampleCatCardsImage.json'
    });

    App.reqres.setHandler("game:getdeck", function () {
        var catList = new Models.CardCollection();

        var defer = $.Deferred();

  //      catList.fetch({
  //          reset: true,
  //          success: function (data) {
  //              defer.resolve(catList);

 //           }
 //       });

        defer.resolve(new Models.CardCollection(cardData));

        return defer.promise();
    });

    
});

