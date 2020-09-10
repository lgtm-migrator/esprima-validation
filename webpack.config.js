const { join } = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: join(__dirname, "./src/index.ts"),
  mode: "production",
  output: {
    path: __dirname,
    filename: "jsv.umd.js",
    library: "jsv",
    libraryTarget: "umd",
    globalObject: 'this' // make it run on nashorn & nodejs
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
