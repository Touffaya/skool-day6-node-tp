/* ------- MOD -------*/
const hapi = require('hapi');
const swagger = require('hapi-swagger');
const vision = require('vision');
const inert = require('inert');

/* ------- FS ------- */
const config = require('./config');
const routes = require('./routes.js');
const logger = require('./logger');

/* ------- RES ------- */

/* ------- SRC ------- */
const server = new hapi.Server();

server.connection({port: config.port});

server.route(routes);

server.register([inert, vision, swagger], (err) => {
  if (err) {
    logger.error(err);
  }
});

server.ext('onRequest', (request, reply) => {
  logger.info({
    id: request.id,
    method: request.method,
    path: request.path
  });
  reply.continue();
});

server.ext('onPreResponse', (request, reply) => {
  logger.info({
    id: request.id,
    statusCode: request.response.statusCode
  });
  reply.continue();
});

server.start(function (err) {
  if (err) throw err;
  logger.info('server listening on port ' + config.port);
});

module.exports = server;
