const path = require('path')

module.exports = {
  target: 'webworker',
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
