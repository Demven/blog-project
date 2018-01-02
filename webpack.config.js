require('envkey');

let config;
if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION MODE');
  console.log('ENV VALUES:', process.env);
  config = require('./config/webpack.prod.js');
} else {
  console.log('DEVELOPMENT MODE');
  config = require('./config/webpack.dev.js');
}

module.exports = config;
