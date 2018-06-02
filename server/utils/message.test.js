const {expect, assert, should} = require('chai');
const {generateMessage} = require('./message');

describe('Message Generator Tests', () => {
  it('should generate a message', () => {
    var from = 'Test User';
    var text = 'Test text';
    const message = generateMessage(from, text);

    expect(message.createdAt).to.be.a('number');

    expect(message.from).to.be.equal(from);
    expect(message.text).to.be.equal(text);
  })
})
