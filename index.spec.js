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
});
