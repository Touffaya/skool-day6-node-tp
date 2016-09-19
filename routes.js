const joi = require('joi');

const handlers = require('./handlers.js');

const pokemons = require('./res/pokemons.json');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.sayHello,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/pokemons',
    config: {
      handler: handlers.getAllPokemons,
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/pokemons',
    config: {
      handler: handlers.createPokemon,
      tags: ['api'],
      validate: {
        payload: {
          name: joi.string()
        }
      }
    }
  }
]
