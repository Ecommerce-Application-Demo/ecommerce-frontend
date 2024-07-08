const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      'small-components': path.resolve(__dirname, 'src/small-components/'),
      redux: path.resolve(__dirname, 'node_modules/redux'),
      error: path.resolve(__dirname, 'src/error/')
    },
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new ModuleFederationPlugin({
      name: "ecommerceFrontend",
      filename: "remoteEntry.js",
      remotes: {
        MicroFrontend: "MicroFrontend@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        './Navbar': './src/components/Navbar',
        './FooterPage': './src/pages/footer-page',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.2.0',
        },
        redux: {
          singleton: true,
          requiredVersion: '5.0.1',
        },
        '@reduxjs/toolkit': {
          singleton: true,
          requiredVersion: '2.2.6',
        },
      }
    })
  ]
};
    // "start": "webpack serve --config webpack.config.js",
