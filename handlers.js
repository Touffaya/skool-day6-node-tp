/* ------- MOD -------*/


/* ------- FS ------- */


/* ------- RES ------- */
const pokemons = require('./res/pokemons');

/* ------- SRC ------- */
module.exports.sayHello = function (request, reply) {
  reply('Hello world!');
};

module.exports.getAllPokemons = function (request, reply) {
  reply(pokemons);
};

module.exports.createPokemon = function (request, reply) {
  if(!request.payload) {
    return reply().code(400);
  }
  pokemons.push(request.payload);
  reply(pokemons).code(201);
};
