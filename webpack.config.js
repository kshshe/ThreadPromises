const path = require("path");

module.exports = {
  entry: "./browsers.js",
  mode: "production",
  output: {
    path: path.resolve("lib"),
    filename: "thread-promises.min.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
};
