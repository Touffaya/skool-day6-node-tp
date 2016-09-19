var hapi = require('hapi');

var server = new hapi.Server();
server.connection({port:3000});

server.route([
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply('Hello world!');
    }
  }
]);

server.start(function (err) {
  if (err) throw err;
  console.log('server listening on port 3000');
});

module.exports = server;
