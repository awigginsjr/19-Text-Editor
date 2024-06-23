const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js', 
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ // array of plugins to generate service worker and manifest
      new HtmlWebpackPlugin({ // plugin for inserting scripts into html
        template: './index.html',
        filename: 'J.A.T.E Webpack Plugin',
      }),
      new InjectManifest({ // plugin for generating a service worker
        swSrc: './src-sw.js',
        swDest: 'sw.js'
      }),
      new WebpackPwaManifest({ // plugin for generating a manifest file
        fingerprints: false, // remove fingerprints for build
        inject: true, // inject manifest into html
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/', // start URL when app is opened
        icons: [ // array of icons for manifest
          {
            src: path.resolve('src/images/logo.png'), // path to icon file
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'), // destination folder
          },
        ],
      }),
    ],

    // TODO: Add CSS loaders and babel to webpack.

    module: {
      rules: [ // array of rules for loaders
        {
          test:/\.css$/i, // regex for css files
          use: ['style-loader', 'css-loader'], // use style and css loaders
        },
        {
          test: /\.m?js$/, // regex for js files
          exclude: /node_modules/, // exclude node_modules folder
          use: { // use babel loader with options
            loader: 'babel-loader', // use babel loader
            options: {  // options for babel loader
              presets: ['@babel/preset-env'], // use env preset for ES6+ features
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', // use object spread plugin
                '@babel/transform-runtime'// use runtime transform plugin
              ],
            },
          },
        },
      ],
    },
  };
};
