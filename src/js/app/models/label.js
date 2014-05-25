define([
    'backbone'
  ], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      text: null,
      color: '#dddddd'
    },

    calculateFrontColor: function () {
      var hex = this.get('color').substr(1, 6),
          r = parseInt(hex.substr(0, 2), 16),
          g = parseInt(hex.substr(2, 2), 16),
          b = parseInt(hex.substr(4, 2), 16),
          yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

      return (yiq >= 128) ? 'black' : 'white';
    }
  });
});
