define([
    'channel',
    'marionette'
  ], function (
    channel,
    Marionette
  ) {
  return Marionette.Controller.extend({
    initialize: function () {
    },

    onClose: function () {
    },

    sync: function (syncs) {
      var toSync = [];

      if (_.isUndefined(syncs)) {
        toSync = channel.reqres.request('app:data:syncs').models;
      } else if (_.isArray(syncs)) {
        toSync = syncs;
      } else {
        toSync.push(syncs);
      }

      _.each(toSync, function (sync) {
        this.syncOne(sync);
      }, this);

      this.trigger('all:completed');
    },

    syncOne: function (sync) {
      var reqName = sync.get('name') + ':sync',
          syncController = channel.reqres.request(reqName, sync.get('data'));

      syncController.on('complete', function () {
        this.trigger('completed');
      }, this);

      syncController.on('failed', function () {
        this.trigger('failed');
      }, this);

      syncController.sync();
    }
  });
});
