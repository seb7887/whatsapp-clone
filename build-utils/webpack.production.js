const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const { PATHS } = require('./paths');

module.exports = merge([
  parts.clean(),
  parts.defineEnv({ env: 'production' }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  })
]);
