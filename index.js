import path from 'path'
import Promise from 'bluebird'
const argv = require('minimist')(process.argv.slice(2))
const fs = Promise.promisifyAll(require('fs'))

const exludePaths = new Set()

exludePaths.add('node_modules')
exludePaths.add('.git')

const recursiveRename = async rootPath => {
  const files = await fs.readdirAsync(rootPath)

  files.forEach(async file => {
    let filePath = makePath(rootPath, file)

    const stats = await fs.statAsync(filePath)

    if (stats.isDirectory() && !exludePaths.has(file)) {
      console.log('Folder: ', file)
      recursiveRename(filePath)
    } else {
      console.log('This file is: ', file)
    }

  })
}

const makePath = (base = __dirname, file) => path.join(base, file)

const initialPath = '.'
recursiveRename(initialPath)
