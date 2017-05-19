import colors from 'colors'
import path from 'path'
import Promise from 'bluebird'

const fs = Promise.promisifyAll(require('fs'))

const {
  readdirAsync,
  renameAsync,
  statAsync,
} = fs

class Traverser {
  constructor (initialPath, options) {
    const { excludes, dest, src } = options

    this.initialPath = initialPath
    this.excludes = excludes
    this.dest = dest
    this.src = src
  }

  async traverse (options = {}, rootPath = this.initialPath) {
    const { dry } = options
    const files = await readdirAsync(rootPath)

    for (let file of files) {
      const filePath = makePath(rootPath, file)

      const stats = await statAsync(filePath)

      if (stats.isDirectory() && !this.excludes.has(file)) {
        // console.log(`Folder:  ${file}`.red)
        await this.traverse(options, filePath)
      } else {
        console.log(`This file is: ${file}`.green)
      }
    }

    return Promise.resolve()
  }

}

  }

}

const makePath = (base = __dirname, file) => path.join(base, file)

export default Traverser
