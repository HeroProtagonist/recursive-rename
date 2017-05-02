const argv = require('minimist')(process.argv.slice(2))

import Traverser from './traverse'
import excludes from './excludes'

function recursiveRename (initialPath) {
  const traverser = new Traverser(excludes, initialPath)
  traverser.traverse()
}

export default recursiveRename
