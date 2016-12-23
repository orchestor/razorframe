const chai = require('chai');
const mocha = require('mocha');
// const should = chai.should();
const { expect } = require('chai');
const { rz } = require('../../lib/Razorframe.js');

const io = require('socket.io-client');

describe("echo", function () {

  let server,
    options = {
      transports: ['websocket'],
      'force new connection': true
    };

  beforeEach(function (done) {
    // start the server
    const {http, rzConfig, dbConfig } = require('./app.js');
    server = rz.init(http, rzConfig, dbConfig);
    done();
  });

  it("Client socket emissions should return in full circuit", function (done) {
    let client = io.connect("http://localhost:3000", options);

    client.on('msgBack', (message) => {
      // message.should.equal('heyo');
      expect(message).to.equal('heyo');
      client.disconnect();
      done();
    });

    client.emit('msgSent', { contents: 'heyo', eventOut: 'msgBack' });

    // client.once("connection", function () {
    //   client.once("msgSent", function (message) {
    //     message.should.equal("echo");

    //     client.disconnect();
    //     done();
    //   });

    //   client.emit("msgSent", "Hello World");
    // });
  });
});