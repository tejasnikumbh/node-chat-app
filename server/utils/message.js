const moment = require('moment');

const generateMessage = function(from, text) {
  return {
    from,
    text,
    createdAt: moment.valueOf()
  };
};

const generateLocationMessage = function(from, lat, lng) {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: moment.valueOf()
  }
}

module.exports = {generateMessage, generateLocationMessage}
