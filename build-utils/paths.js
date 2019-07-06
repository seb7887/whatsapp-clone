const path = require('path');

const PATHS = {
  entry: path.join(__dirname, '../src'),
  output: path.join(__dirname, '../dist'),
  html: path.join(__dirname, '../public/index.html')
};

module.exports = { PATHS };
