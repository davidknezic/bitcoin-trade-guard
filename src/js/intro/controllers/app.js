define([
    'channel',
    'marionette',
    'intro/models/subscription',
    'intro/views/app',
    'intro/views/header',
    'intro/views/main',
    'intro/views/subscribe',
    'intro/views/footer'
  ], function (
    channel,
    Marionette,
    Subscription,
    AppLayoutView,
    HeaderView,
    MainView,
    SubscribeView,
    FooterView
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.layout = new AppLayoutView({
        el: 'body'
      });
    },

    onClose: function () {
      this.layout.destroy();
    },

    display: function () {
      var header = new HeaderView(),
          main = new MainView(),
          subscribe = new SubscribeView(),
          footer = new FooterView();

      subscribe.model = new Subscription();

      header.on('learn', function () {
        main.scrollToMe();
      }, this);

      subscribe.on('register', function (args) {
        args.view.setLoading(true);

        args.model.save(null, {
          success: function (subscription) {
            subscribe.showSuccess();
            args.view.setLoading(false);
          },
          error: function (subscription, error) {
            subscribe.showFailure();
            args.view.setLoading(false);
          }
        });
      }, this);

      this.layout.render();

      this.layout.header.show(header);
      this.layout.main.show(main);
      this.layout.subscribe.show(subscribe);
      this.layout.footer.show(footer);
    }
  });
});
