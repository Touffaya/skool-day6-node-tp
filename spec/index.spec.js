/* ------- MOD -------*/
const chai = require('chai');
const expect = chai.expect;

/* ------- FS ------- */
const server = require('../index.js');

/* ------- RES ------- */
const pokemons = require('../res/pokemons.json');

/* ------- SRC ------- */
describe('Server', () => {

  describe('/', () => {

    it('should return hello world!', (done) => {
      server.inject('/', (res) => {
        expect(res.payload).to.equal('Hello world!');
        done();
      });
    });
  });

  describe('/pokemons', () => {

    it('should return a list of pokemons', (done) => {
      server.inject('/pokemons', (res) => {
        expect(res.result).to.deep.equal(pokemons);
        done();
      });
    });
  });


  describe('POST', () => {

    describe('When payload is undefined', () => {

      it('should send a 400 status code', (done) => {
        server.inject({url: '/pokemons', method: 'POST'}, (res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
      });

    });

    describe('When payload is undefined', () => {

      it('should send a 201 status code', (done) => {
        server.inject({url: '/pokemons', method: 'POST', payload: {name: 'evoli'}}, (res) => {
          expect(res.statusCode).to.equal(201);
          done();
        });
      });

      it('should create the pokemon given in the payload', (done) => {
        server.inject({url: '/pokemons', method: 'POST', payload: {name: 'bulbizarre'}}, (res) => {
          server.inject({url: '/pokemons'}, (response) => {
            const bulbi = response.result.find((pokemon) => pokemon.name === 'bulbizarre');
            expect(bulbi).to.exist;
            done();
          });
        });
      });
    });
  });
});
