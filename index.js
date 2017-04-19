const testFolder = '.'
const fs = require('fs')
const path = require('path')

fs.readdir(testFolder, (err, files) => {

  files.forEach(file => {

    fs.stat(path.join(__dirname, file), (err, stats) => {
      if (stats) console.log(file, stats.isDirectory())
    })

  })

})
