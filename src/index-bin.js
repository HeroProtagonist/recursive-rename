#! /usr/bin/env node
import { version } from '../package.json'
import Traverser from './traverser'
import Validator from './validator'
import excludes from './excludes'

const argv = require('minimist')(process.argv.slice(2))

console.log(argv)
console.log(version)

