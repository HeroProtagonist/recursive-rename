#! /usr/bin/env node
import { version as packageVersion } from '../package.json'
import Traverser from './traverser'
import Validator from './validator'
import Excludes from './excludes'

// -h, --help
// -d, --dry
// -s, --src
// -D?, --dest
// -e, --exclude
// -o, --override
// -v, --version
// -p, --path

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

  const { excludes } = new Excludes(exclude)

  const options = {
    excludes,
    override,
    path, // validate path
  }

  const validator = new Validator(src, dest, options)

  return executeCommand(validator, dry)
}

const executeCommand = async (validator, dry) => {
  const {
    src,
    dest,
    excludes,
    path,
  } = validator

  const traverser = new Traverser(path, {
    src,
    dest,
    excludes,
  })

  await traverser.traverse({ dry })
}

rename(argv)
