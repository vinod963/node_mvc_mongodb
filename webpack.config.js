var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  devtool:'cheap-module-source-map',  //sourcemap - debugging purpose
  entry: './src/server.ts',
  mode:'development',
  output: {
    path: __dirname + '/dist',
    filename: 'server.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx'
      // extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  target: 'node',
  externals: nodeModules,
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};