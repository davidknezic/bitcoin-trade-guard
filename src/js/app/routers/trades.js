define([
    'channel',
    'marionette'
  ], function (channel, Marionette) {
  return Marionette.AppRouter.extend({
    routes: {
      'trades': 'list',
      'trades/new': 'newTrade',
      'trades/:id': 'show',
      'trades/:id/edit': 'edit'
    },

    list: function () {
      channel.commands.execute('app:show:trades');
    },

    show: function (id) {
      channel.commands.execute('app:show:trade', id);
    },

    newTrade: function () {
      channel.commands.execute('app:show:add-trade');
    },

    edit: function (id) {
    }
  });
});
