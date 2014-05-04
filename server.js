/**
 * This is a productive web server, which serves the built web application.
 */

var colors = require('colors'),
    connect = require('connect'),
    middleware = require('./lib/middleware'),
    http = require('http'),
    path = require('path');

var host = process.env.npm_package_config_host,
    port = process.env.npm_package_config_port,
    root = process.env.npm_package_config_root;

console.info([
  'Options received:',
  '  host: ' + host.yellow,
  '  port: ' + port.toString().yellow,
  '  root: ' + root.yellow,
  ''
].join('\n'));

var app = connect();

app.use(middleware.staticFiles({
  root: path.resolve(root),
  maxAge: 3600,
  hidden: false
}));

app.use(middleware.deadEnd({
  file: path.resolve(root, './index.html'),
  maxAge: 3600
}));

var server = http.createServer(app);

console.info('Starting server...\n');

server
  .listen(port, host)
  .on('listening', function () {
    console.info([
      'Listening on:',
      '  host: ' + host.yellow,
      '  port: ' + port.toString().yellow,
      ''
    ].join('\n'));

    console.info('Hit CTRL-C to stop server.');
  })
  .on('error', function (err) {
    console.error('Error occured.'.red);
    console.error(err.message.red);

    console.info('Server stopped!'.red);

    process.exit(1);
  });

if (process.platform !== 'win32') {
  // Signal handlers don't work on Windows!
  process.on('SIGINT', function () {
    console.info('Server stopped through signal handler!'.red);

    process.exit();
  });
}
