const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const fs = require('fs'); // to check if the file exists

module.exports = env => {
   // Get the root path (assuming your webpack config is in the root of your project!)
   const currentPath = path.join(__dirname);

   // Create the fallback path (the production .env)
   const basePath = currentPath + '/.env';

   // We're concatenating the environment name to our filename to specify the correct env file!
   const envPath = basePath + '.' + env.ENVIRONMENT;

   if (env.major || env.minor || env.patch) {
     console.log('Incrementing build number...');
     fs.readFile('package.json', function (err, content) {
       if (err) throw err;
       var metadata = JSON.parse(content);
       const version = metadata.version.split('');
       if (env.major) version[0] = parseFloat(version[0]) + 1;
       if (env.minor) version[2] = parseFloat(version[2]) + 1;
       if (env.patch) version[4] = parseFloat(version[4]) + 1;
       metadata.version = version.join('');
       fs.writeFile('package.json', JSON.stringify(metadata), function (err) {
         if (err) throw err;
         console.log(`Current build number: ${metadata.version}`);
       });
     });
   }
    return {target: 'web',
    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
      },
      optimization: {
        splitChunks: { chunks: 'all' },
      },
      mode: 'development',
      devtool: 'cheap-source-map',
      devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
      },
      resolve: { modules: [path.resolve(__dirname, 'src'), 'node_modules'] },
      plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: path.resolve(__dirname, './src/template.html'),
          filename: 'index.html',
        }),
        new Dotenv({path: envPath})
        // new webpack.EnvironmentPlugin(envKeys),
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(css|scss)$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    }
  }