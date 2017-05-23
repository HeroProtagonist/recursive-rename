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
        await this.traverse(options, filePath)
      } else {
        await handleFile(file, filePath, this.src, this.dest, dry)
      }
    }

    return Promise.resolve()
  }

}

const handleFile = async (file, filePath, src, dest, dry) => {
  const splitFilePath = filePath.split('.')
  const filePathNoExt = splitFilePath[0]
  const srcExt = splitFilePath[1]

  if (srcExt === src) {
    if (dry) {
      console.log(`${filePath}`.red + ' --> '.yellow + `${filePathNoExt}.${dest}`.green)
    } else {
      console.log('Renaming: '.blue + `${filePath}`.red + ' --> '.yellow + `${filePathNoExt}.${dest}`.green)
      await renameAsync(filePath, `${filePathNoExt}.${dest}`)
    }
  }
}

const makePath = (base = __dirname, file) => path.join(base, file)

export default Traverser
