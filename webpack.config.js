
var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          [
            'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader'
          ]
        )
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.(png)$/,
        loader: 'url-loader?limit=1'
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      },
      {
        test: /\.(yaml)$/,
        loaders: [
          'json-loader',
          'yaml-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname),
    alias: {
      TweenLite: 'gsap/src/uncompressed/TweenLite',
      Easing: 'gsap/src/uncompressed/easing/EasePack',
      ScrollToPlugin: 'gsap/src/uncompressed/plugins/ScrollToPlugin',
      TextPlugin: 'gsap/src/uncompressed/plugins/TextPlugin'
    }
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new ExtractTextPlugin('build.css')
  ],
  devServer: {
    contentBase: './src',
    hot: true
  }
}
