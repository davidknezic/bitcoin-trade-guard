define(['lib/monetary'], function (monetary) {
  return monetary.currency('BTC', {
    symbol: '฿',
    precision: 8,
    base: 1
  });
});
