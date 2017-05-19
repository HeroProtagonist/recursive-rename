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
        await handleFile(file, filePath, dry)
      }
    }

    return Promise.resolve()
  }

}

const handleFile = async (file, filePath, dry) => {

  if (dry) {
    console.log(`Untouched: ${file}`.green)
  } else {
    const filePathNoExt = filePath.split('.')[0]
    console.log(`Renaming: ${filePathNoExt}`.green)
    await renameAsync(filePath, `${filePathNoExt}.js`)
  }

}

const makePath = (base = __dirname, file) => path.join(base, file)

export default Traverser
