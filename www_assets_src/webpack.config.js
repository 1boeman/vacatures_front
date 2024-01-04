const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname,'../www_assets/js')
  },
  //mode:'development',
  mode:'production',
  devtool: false
};
