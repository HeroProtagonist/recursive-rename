const argv = require('minimist')(process.argv.slice(2))

import Traverser from './traverse'
import excludes from './excludes'

const initialPath = '.'

const traverser = new Traverser(excludes, initialPath)

traverser.traverse()
