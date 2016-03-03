const entDir = './examples/ts';
module.exports = {
  entry: {
    complex: `${entDir}/complex.js`,
    'csv-json': `${entDir}/csv-json.js`,
    fib: `${entDir}/fib.js`,
    integer: `${entDir}/integer.js`,
    iter: `${entDir}/iter.js`,
    'math-expression': `${entDir}/math-expression.js`,
    primality: `${entDir}/primality.js`,
    rational: `${entDir}/rational.js`,
  },
  devtool: '#source-map',
  output: {
    path: './examples/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
