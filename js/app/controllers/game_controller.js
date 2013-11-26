CatApp.module('Controllers.Game', function (Game, App, Backbone, Marionette, $, _) {

    


    App.vent.on("game:begin", function () {
        var hand = App.request('game:getdeck');

        $.when(hand).done(function (data) {
            Game.deck = new App.Models.CardCollection(data.shuffle());

            Game.p1hand = new App.Models.CardCollection(Game.deck.take(5));

            Game.deck.remove(Game.p1hand.models);
            Game.p2hand = new App.Models.CardCollection(Game.deck.take(5));
            Game.deck.remove(Game.p2hand.models);
            Game.p1played = new App.Models.CardCollection([]);
            Game.p2played = new App.Models.CardCollection([]);


            var p1HandView = new App.Views.HandView({ collection: Game.p1hand });
            var p1PlayedView = new App.Views.HandView({ collection: Game.p1played });
            var p2PlayedView = new App.Views.HandView({ collection: Game.p2played });
            App.p1Hand.show(p1HandView);
            App.p1Played.show(p1PlayedView);
            App.p2Played.show(p2PlayedView);
        });


    });

    App.vent.on("game:playcard", function (model) {
        if (Game.state == "Attack") {
            Game.log(Game.attackCard.get('title') + " attacks " + model.get('title'));

            if (Game.attackCard.get('attack') > model.get('defence')) {
                Game.log(Game.attackCard.get('title') + " defeats " + model.get('title'));
                Game.p2played.remove(model);
            } else {
                Game.log(Game.attackCard.get('title') + " defeats " + model.get('title'));
                Game.p1played.remove(Game.attackCard);
            }

            Game.state = "Play";
            App.vent.trigger('game:enemyturn');
        } else if (model.get('played')) {
            Game.state = "Attack";
            Game.attackCard = model;
            Game.log("Select a card to attack");
        } else {
            Game.p1hand.remove(model);
            Game.p1played.add(model);
            model.set('played', true);

            var card = Game.deck.pop();
            Game.p1hand.add(card);

            App.vent.trigger('game:enemyturn');
        }
    });


    App.vent.on("game:enemyturn", function (model) {
        var rand = Math.random(2);

        if (rand < 1 && Game.p2played.length >0 && Game.p1played.length > 0) {

            var attackcard = Game.p2played.at(Math.floor((Math.random()*Game.p2played.length)));
            var defencecard = Game.p1played.at(Math.floor((Math.random() * Game.p1played.length)));

            Game.log("Computer attacks " + defencecard.get('title') + " with " + attackcard.get('title'));

            if (attackcard.get('attack') > defencecard.get('defence')) {
                Game.log(attackcard.get('title') + " defeats " + defencecard.get('title'));
                Game.p1played.remove(defencecard);
            } else {
                Game.log(defencecard.get('title') + " defeats " + attackcard.get('title'));
                Game.p2played.remove(attackcard);
            }

        } else {
            var card = Game.p2hand.pop();
            Game.p2played.add(card);

            Game.log("Computer plays " + card.get('title'));

            card = Game.deck.pop();
            Game.p2hand.add(card);

        }
      
        Game.log("Your turn...");
    });

    Game.sleep = function(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    Game.log = function (text, delay) {
        $('#log').prepend(text + "<br />");
        alert(text);
        if (delay) {
        Game.sleep(delay);
    }
    }

});

