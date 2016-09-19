const chai = require('chai');
const expect = chai.expect;
const server = require('./index.js');

describe('Server', () => {
  describe('/', () => {
    it('Should return hello world!', (done) => {
      server.inject('/', (res) => {
        expect(res.payload).to.equal('Hello world!');
        done();
      });
    });
  });
  describe('/pokemons', () => {
    it('Should return a list of pokemons', (done) => {
      server.inject('/pokemons', (res) => {
        expect(res.result).to.deep.equal([
          {'name':'pikachu'},
          {'name':'carapuce'},
          {'name': 'salameche'}
        ]);
        done();
      });
    });
  });
});
