#! /usr/bin/env node
import { version as packageVersion } from '../package.json'
import Traverser from './traverser'
import Validator from './validator'
import excludes from './excludes'

const argv = require('minimist')(process.argv.slice(2))

const rename = args => {
  const {
    _,
    dry,
    exclude,
    help,
    override,
    path,
    version,
  } = args

  if (version) {
    return console.log(packageVersion)
  }

  if (help) {
    return console.log('TODO')
  }
  const src = _[0]
  const dest = _[1]

  const options = {
    dry,
    excludes,
    override,
    path,
  }

  console.log(exclude.split(','))

  const validator = new Validator(src, dest, options)

  return
}

rename(argv)
