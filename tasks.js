const { restart } = require('re-start');
const { default: standard } = require('start-standard');

module.exports = restart({
  lint: () => standard('semistandard', { ignore: ['templates'] })
});
