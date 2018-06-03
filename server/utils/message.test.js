const {expect, assert, should} = require('chai');
const {generateMessage, generateLocationMessage} = require('./message');

describe('Messages', () => {
  describe('generateMessage', () => {
    it('should generate a message', () => {
      const from = 'Test User';
      const text = 'Test text';
      const message = generateMessage(from, text);

      expect(message.createdAt).to.be.a('number');

      expect(message.from).to.be.equal(from);
      expect(message.text).to.be.equal(text);
    })
  });


  describe('generateLocationMessage', () => {
    it('should generate a location message', () => {
      const from = 'Test User';
      const lat = 23.04;
      const lng = 15.23;
      const url = `https://www.google.com/maps?q=${lat},${lng}`;

      const locationMessage = generateLocationMessage(from, lat, lng);

      expect(locationMessage.createdAt).to.be.a('number');

      expect(locationMessage).to.have.property('from',`${from}`);
      expect(locationMessage).to.have.property('url',`${url}`);
    })
  })
})
