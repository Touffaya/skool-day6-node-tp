const hapi = require('hapi');
const swagger = require('hapi-swagger');
const vision = require('vision');
const inert = require('inert');
const pokemons = require('./pokemons.json');

var server = new hapi.Server();
server.connection({port:3000});

server.route([
  {
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply('Hello world!');
      },
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/pokemons',
    config: {
      handler: function (request, reply) {
        reply(require('./pokemons'));
      },
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/pokemons',
    config: {
      handler: function (request, reply) {
        if(!request.payload) {
          return reply().code(400);
        }
        pokemons.push(request.payload);
        reply(pokemons).code(201);
      },
      tags: ['api']
    }
  }
]);

server.register([inert, vision, swagger], (err) => {
  if (err) {
    console.log(err);
  }
})

server.start(function (err) {
  if (err) throw err;
  console.log('server listening on port 3000');
});

module.exports = server;
