/* ------- MOD -------*/
const hapi = require('hapi');
const swagger = require('hapi-swagger');
const vision = require('vision');
const inert = require('inert');

/* ------- FS ------- */
const config = require('./config');
const routes = require('./routes.js');

/* ------- RES ------- */

/* ------- SRC ------- */
const server = new hapi.Server();

server.connection({port: config.port});
server.route(routes);
server.register([inert, vision, swagger], (err) => {
  if (err) {
    console.log(err);
  }
});

server.start(function (err) {
  if (err) throw err;
  console.log('server listening on port ' + config.port );
});

module.exports = server;
