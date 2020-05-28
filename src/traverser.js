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
    this.src = src.split('.')
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

  let match = true
  for (let i = src.length - 1; i >= 0 && match; i--) {
    if (src[i] !== splitFilePath.pop()) {
      match = false
    }
  }

  const filePathNoExt = splitFilePath.join('.')

  if (match) {
    if (dry) {
      console.log('Will Rename: '.blue + `${filePath}`.red + ' --> '.yellow + `${filePathNoExt}.${dest}`.green)
    } else {
      console.log('Renamed: '.blue + `${filePath}`.red + ' --> '.yellow + `${filePathNoExt}.${dest}`.green)
      await renameAsync(filePath, `${filePathNoExt}.${dest}`)
    }
  }
}

const makePath = (base = __dirname, file) => path.join(base, file)

export default Traverser
