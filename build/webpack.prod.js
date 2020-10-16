const path = require('path')
const dir = __dirname

module.exports = {
  mode: 'production',
  entry: path.resolve(dir, '../src/main.js'),
  output: {
    path: path.resolve(dir, '../dist'), // 指定构建生成文件所在路径
    filename: 'iboot.min.js', // 指定构建生成的文件名
    libraryTarget: 'umd',
    library: 'Iboot',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { // 指定使用的 loader
          loader: 'babel-loader', // babel-loader 可以使用 babel 来将 ES6 代码转译为浏览器可以执行的的 ES5 代码
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [

  ]
}
