const webpack = require("webpack");
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "customer.js",
  },
};
