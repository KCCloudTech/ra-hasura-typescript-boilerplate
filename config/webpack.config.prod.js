const webpack = require('webpack');
const webpackConfig = require('./webpack.config.base');
const path = require('path');

module.exports = env => {
  const isProd = env && env.NODE_ENV === 'production';
  const config = {
    ...webpackConfig,
    mode: isProd ? 'production' : 'development',
  
    // Enable sourcemaps for debugging webpack's output.
    devtool: isProd ? 'hidden-source-map' : 'source-map',
    output: {
      ...webpackConfig.output,
      chunkFilename: 'js/[name].bundle.js',
    },
    plugins: [
      ...webpackConfig.plugins,
      new webpack.EnvironmentPlugin([
        'VERSION',
        'DATA_DOMAIN',
        'DATA_SCHEME',
        'HASURA_CLIENT_NAME',
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_DATABASE_URL',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID',
        'FIREBASE_APP_ID',
      ]),
    ],
  }

  if (isProd) {
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
        }
      }
    };
  }

  return config;
};
