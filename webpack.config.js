var path = require('path');

module.exports = {
  entry: "./lib/main.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "kevin_domination.js"
  }
};
