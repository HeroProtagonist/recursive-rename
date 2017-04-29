import path from 'path'
import Promise from 'bluebird'

const fs = Promise.promisifyAll(require('fs'))

class Traverser {
  constructor (excludes, initialPath) {
    this.excludes = excludes
    this.initialPath = initialPath
  }

  async traverse (rootPath = this.initialPath) {
    const files = await fs.readdirAsync(rootPath)

    files.forEach(async file => {
      const filePath = makePath(rootPath, file)

      const stats = await fs.statAsync(filePath)

      if (stats.isDirectory() && !this.excludes.has(file)) {
        console.log('Folder: ', file)
        this.traverse(filePath)
      } else {
        console.log('This file is: ', file)
      }
    })
  }

}

const makePath = (base = __dirname, file) => path.join(base, file)

export default Traverser
