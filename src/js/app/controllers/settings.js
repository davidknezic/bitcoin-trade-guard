define([
    'channel',
    'marionette',
    'app/views/settings',
    'app/views/syncs/list',
    'app/views/syncs/new',
    'app/views/syncs/edit'
  ], function (
    channel,
    Marionette,
    SettingsView,
    SyncListView,
    NewSyncView,
    EditSyncView
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      channel.commands.setHandler('app:show:settings', this.settings, this);
      channel.commands.setHandler('app:show:settings:syncs', this.sync, this);
      channel.commands.setHandler('app:show:settings:syncs:new', this.newSync, this);
      channel.commands.setHandler('app:show:settings:syncs:edit', this.editSync, this);

      this.syncs = channel.reqres.request('app:data:syncs');
    },

    onClose: function () {
    },

    settings: function () {
      var layout = new SettingsView();

      channel.commands.execute('app:title:set', 'Settings');
      channel.commands.execute('app:current-nav:set', 'settings');
      channel.commands.execute('app:content:show', layout);

      layout.setCurrentNav('account');

      Backbone.history.navigate('/settings');
    },

    sync: function () {
      var layout,
          syncListView;

      layout = new SettingsView();
      syncListView = new SyncListView({
        collection: this.syncs,
        services: channel.reqres.request('app:data:services')
      });

      syncListView.on('add:sync', function (service) {
        this.newSync(service);
      }, this);

      syncListView.on('edit:sync', function (sync) {
        this.editSync(sync);
      }, this);

      channel.commands.execute('app:title:set', 'Settings » Synchronizations');
      channel.commands.execute('app:current-nav:set', 'settings');
      channel.commands.execute('app:content:show', layout);

      layout.content.show(syncListView);
      layout.setCurrentNav('sync');

      Backbone.history.navigate('/settings/syncs');
    },

    newSync: function (service) {
      var layout,
          newSyncView,
          reqName = service.get('slug') + ':view:new',
          innerView = channel.reqres.request(reqName);

      layout = new SettingsView();
      newSyncView = new NewSyncView({
        model: service,
        inner: innerView
      });

      newSyncView.on('cancel', function () {
        this.sync();
      }, this);

      newSyncView.on('save', function (sync) {
        this.syncs.add(sync);
        this.sync();
      }, this);

      channel.commands.execute('app:title:set', 'Settings » New Synchronization');
      channel.commands.execute('app:current-nav:set', 'settings');
      channel.commands.execute('app:content:show', layout);

      layout.content.show(newSyncView);
      layout.setCurrentNav('sync');

      Backbone.history.navigate('/settings/syncs/new?service=bitstamp');
    },

    editSync: function (sync) {
      var layout,
          editSyncView,
          reqName = sync.get('service') + ':view:edit',
          innerView = channel.reqres.request(reqName);

      layout = new SettingsView();
      editSyncView = new EditSyncView({
        model: sync,
        inner: innerView
      });

      editSyncView.on('cancel', function () {
        this.sync();
      }, this);

      editSyncView.on('save', function (sync) {
        sync.save();
        this.sync();
      }, this);

      editSyncView.on('trigger', function (sync) {
      }, this);

      editSyncView.on('delete', function (sync) {
        this.syncs.remove(sync);
        this.sync();
      }, this);

      channel.commands.execute('app:title:set', 'Settings » Edit Synchronization');
      channel.commands.execute('app:current-nav:set', 'settings');
      channel.commands.execute('app:content:show', layout);

      layout.content.show(editSyncView);
      layout.setCurrentNav('sync');

      Backbone.history.navigate('/settings/syncs/' + sync.cid + '/edit');
    }
  });
});
