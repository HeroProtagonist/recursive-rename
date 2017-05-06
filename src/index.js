#! /usr/bin/env node

import Traverser from './traverse'
import Validator from './validator'
import excludes from './excludes'

const argv = require('minimist')(process.argv.slice(2))

console.log(argv)
const validator = new Validator(argv)

function recursiveRename (initialPath) {
  const traverser = new Traverser(excludes, initialPath)
  traverser.traverse()
}

export default recursiveRename
