const path = require('path');
const APP_PATH = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);

  return path.join.apply(path, [APP_PATH].concat(args));
}

exports.root = root;