const path = require('path')

module.exports = {
  target: 'webworker',
  mode: 'production',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
