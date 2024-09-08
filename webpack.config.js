const path = require("path");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: path.resolve(__dirname, "./compiled.js"),
  output: {
    path: buildPath,
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: "babel-loader",
      },
    ],
  },

  devServer: {
    host: "127.0.0.1",
    port: 9000,
    contentBase: path.resolve(__dirname, "public"),
  },
};
