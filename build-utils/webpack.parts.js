const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()]
});

exports.defineEnv = ({ env }) => {
  const plugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  });

  return {
    plugins: [plugin]
  };
};

exports.loadTypescript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include,
        exclude
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
});

exports.loadSass = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'fast-sass-loader'],
        include
      }
    ]
  }
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g)$/,
        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    open: true
  }
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});
