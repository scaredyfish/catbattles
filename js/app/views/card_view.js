CatApp.module('Views', function (Views, App, Backbone, Marionette, $, _) {
    Views.CardView = Marionette.ItemView.extend({
        template: '#card-item',
        tagName: 'div',
        className: 'card-item',
        events: {
            'click': 'click'
        },
        click: function (e) {
            App.vent.trigger('game:playcard', this.model);
        }
    });

    Views.HandView = Marionette.CollectionView.extend({
        itemView: Views.CardView,
        tagName: 'div',
        className: 'hand',

        events: {
        },
        initialize: function () {
            this.collection.on('change', this.render, this);

        }
    });
});