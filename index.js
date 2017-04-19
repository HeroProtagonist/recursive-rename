import path from 'path'
import Promise from 'bluebird'
const fs = Promise.promisifyAll(require('fs'))

const recursiveRename = async () => {
  const testFolder = '.'
  const files = await fs.readdirAsync(testFolder)

  files.forEach(async file => {
    const filePath = path.join(__dirname, file)

    const stats = await fs.statAsync(filePath)

    if (stats) console.log(file, stats.isDirectory())

  })
}


recursiveRename()
