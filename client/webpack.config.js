const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

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

    plugins: [ // Add plugins for HtmlWebpackPlugin, InjectManifest, and WebpackPwaManifest
      new HtmlWebpackPlugin({ // Create a new instance of HtmlWebpackPlugin
        template: './index.html', // Set the template to index.html
        title: 'Contact Cards' // Set the title of the page to 'Contact Cards'
      }),
     
      new InjectManifest({ // Create a new instance of InjectManifest
        swSrc: './src-sw.js', // Set the service worker source to src-sw.js
        swDest: 'src-sw.js', // Set the service worker destination to src-sw.js
      }),

      new WebpackPwaManifest({ // Create a new instance of WebpackPwaManifest
        fingerprints: false, // Set fingerprints to false
        inject: true, // Set inject to true
        name: 'Jate', // Set the name of the app to 'Jate'
        short_name: 'Text editor', // Set the short name of the app to 'Text editor'
        description: 'simple text editor.', // Set the description of the app to 'simple text editor.'
        background_color: '#225ca3', // Set the background color to '#225ca3'
        theme_color: '#225ca3', // Set the theme color to '#225ca3'
        start_url: './', // Set the start URL to './'
        publicPath: './', // Set the public path to './'
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Set the source of the icon to the logo.png file
            sizes: [96, 128, 192, 256, 384, 512], // Set the sizes of the icon
            destination: path.join('assets', 'icons'), // Set the destination of the icon
          },
        ],
      }),
    ],

    module: { // Add a module with rules for CSS and JavaScript files with the extensions .css and .js
      rules: [ // Add rules for CSS and JavaScript files with the extensions .css and .js
        {
          test: /\.css$/i, // Add a rule for CSS files with the extension .css 
          use: ['style-loader', 'css-loader'], // Add the style-loader and css-loader to the rule
        },
        {
          test: /\.m?js$/, // Add a rule for JavaScript files with the extension .js
          exclude: /node_modules/, // Exclude the node_modules directory from the rule
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader', // Add the babel-loader
            options: {
              presets: ['@babel/preset-env'], // Add the preset-env preset
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Add the transform-runtime plugin
            },
          },
        },
      ],
    },
  };
};
