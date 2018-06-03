const {expect, assert, should} = require('chai');
const {isRealString} = require('./validation');

describe('Validation', () => {
  describe('isRealString', () => {
    it('should reject non-string values', () => {
      var res = isRealString(98);
      expect(res).to.be.false;
    });

    it('should reject string with only spaces', () => {
      var res = isRealString('    ');
      expect(res).to.be.false;
    });

    it('should allow string with non-space characters', () => {
      var res = isRealString('D');
      expect(res).to.be.true;
    });
  });
});
