define([
    'channel',
    'marionette',
    'keen',
    'uuid',
    'ua-parser-js'
    //'localforage'
  ], function (
    channel,
    Marionette,
    Keen,
    uuid,
    UAParser
    //localforage
  ) {
  return Marionette.Controller.extend({
    initialize: function (options) {
      this.client = new Keen({
        projectId: '53ea7af8ce5e4357c900000f',
        writeKey: 'e471fb326e634a712f034fe2f50458f907570f46540f788c5e33c609de5bbdb91ce587abc52d332f83a049eb577e450b53a08a8d956e26d61d63323303f181e2c0e2533e753bb16f2569df508ee6a4d5f2bce6019ae375b959a0d6d67ddb47551141e750f379b2f0bbccb8096149ec71',
        readKey: '33cf2c4defdb26431533bb8451c1d14b31679780e6c621fcfe2e63db215ebb4915369cdfd9887a351fbd130663f341ad2025429fc966ab4b5523e51ec723264518a21ffbdbfb7a6f44b65c797d5eeb6bcdba3615a33e5cb4ab55f357bf9fa1a7c9d32d2e2ab3723080571b1422c4aa0e'
      });

      this.parser = new UAParser();
    },

    onClose: function () {
      // nothing to do yet
    },

    _getPermanentID: function (callback, context) {
      localforage.getItem('permanentID', function (value) {
        if (value !== null)
          return callback.call(context, value);

        var newPermanentID = uuid.v4();

        localforage.setItem('permanentID', newPermanentID, function () {
          return callback.call(context, newPermanentID);
        });
      });
    },

    trackPageView: function () {
      this._getPermanentID(function (permanentID) {
        var pageview = {
          permanent_id: permanentID,
          user_agent: {
            browser: this.parser.getBrowser(),
            engine: this.parser.getEngine(),
            os: this.parser.getOS()
          }
        };

        this.client.addEvent('pageviews', pageview);
      }, this);
    }
  });
});
