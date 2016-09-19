'use strict';
const tsDir = './ts';
const testDir = './test';

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
let entry = {
  'import-babel-polyfill': `${testDir}/import-babel-polyfill.ts`
};
for (let fileName of fileNames) {
  entry[`${fileName}-test`] = [
    `${testDir}/${fileName}-test.ts`,
    `${tsDir}/${fileName}.ts`
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
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
//        include: ['node_modules/babel-core'],
        loader: 'babel-loader?presets[]=latest!ts-loader'
//        loaders: ['babel', 'ts'],
//        query: {
//          presets: ['latest']
//        }
      }
    ]
  },
//  externals: {
//    'babel-polyfill': 'babel-polyfill'
//  }
};
