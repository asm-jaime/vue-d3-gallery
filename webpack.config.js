var path = require('path')
var vue = require('vue-loader')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var cssLoader = ExtractTextPlugin.extract("style-loader", "css-loader")

const productionURL = "http://localhost:8081"
const developmentURL = "http://localhost:8081"

var URL = process.env.NODE_ENV === 'production' ? productionURL : developmentURL;

module.exports = {
  entry: './src/main.js',
  output: {
    path: "./public",
    publicPath: "/public/",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin("build.css")
  ],
  module: {
    loaders: [
    { test: /\.vue$/, loader: 'vue' },
    { test: /\.js$/, exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//, loader: 'babel' },
    { test: /\.css$/, loader: cssLoader },
    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    { test: /\.ttf$/,    loader: "file?mimetype=application/octet-stream" },
    { test: /\.eot$/,    loader: "file" },
    { test: /\.svg$/,    loader: "file?mimetype=image/svg+xml" },
    { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
    { test: /\.woff2$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2" }
  ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      stylus: ExtractTextPlugin.extract("css!stylus")
    },
    devtool: '#source-map',
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(URL),
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(URL),
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
  ])

}
