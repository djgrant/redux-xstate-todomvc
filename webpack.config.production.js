var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./index",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loaders: ["style", "raw"],
        include: __dirname
      }
    ]
  }
};
