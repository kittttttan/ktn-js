'use strict';

let fileNames = [
  'enc',
  'date',
  'fft',
  'integer',
  'math-expression',
  'matrix',
  'quaternion',
  'random',
  'rational',
  'strconv',
  'string',
  'uuid',
  'vector',
];

let entry = {};
for (let fileName of fileNames) {
  entry[`${fileName}`] = [
    `${fileName}/src/${fileName}.js`
  ];
}
//console.log(entry);

module.exports = {
  entry: entry,
  devtool: 'inline-source-map',
  output: {
    path: './dist/',
    filename: '[name].js',
//    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
//        include: ['node_modules/babel-core'],
        loader: 'babel-loader?presets[]=latest'
//        loaders: ['babel'],
//        query: {
//          presets: ['latest']
//        }
      }
    ]
  }
};
