import { exec } from 'child_process'

// test/mock
// ├── empty
// ├── file1.jsx
// ├── file2.jsx
// └── inner
//     ├── deep
//     │   ├── do-not-touch
//     │   │   ├── file8.jsx
//     │   │   └── file9.jsx
//     │   ├── file6.js
//     │   └── file7.jsx
//     ├── file3.txt
//     ├── file4.jsx
//     └── file5.js

function createTestDirectory (cb) {
  exec('mkdir -p test/mock && touch test/mock/file1.jsx ' +
        '&& touch test/mock/file2.jsx && mkdir -p test/mock/empty ' +
        '&& mkdir -p test/mock/inner && touch test/mock/inner/file3.txt ' +
        '&& touch test/mock/inner/file4.jsx && ' +
        'touch test/mock/inner/file5.js && ' +
        'touch test/mock/inner/file6.ext.js.map && ' +
        'mkdir test/mock/inner/deep && ' +
        'touch test/mock/inner/deep/file6.js && ' +
        'touch test/mock/inner/deep/file7.jsx && ' +
        'mkdir -p test/mock/inner/deep/do-not-touch && ' +
        'touch test/mock/inner/deep/do-not-touch/file8.jsx && ' +
        'touch test/mock/inner/deep/do-not-touch/file9.jsx ', (err, stdout, stderr) => {
    if (err) {
      console.log('Child process exited with error code', err)
      return
    }
    // console.log(stdout)
    if (cb) cb()
  })
}

function removeTestDirectory (cb) {
  exec('rm -rf test/mock', (err, stdout, stderr) => {
    if (err) {
      console.log('Child process exited with error code', err)
      return
    }
    // console.log(stdout)
    if (cb) cb()
  })
}

function findTestDirectory (cb) {
  exec('find test/mock | sort -n', (err, stdout, stderr) => {
    if (err) {
      console.log('Child process exited with error code', err)
      return
    }
    // console.log(stdout)
    if (cb) cb(stdout)
  })
}

export {
  createTestDirectory,
  findTestDirectory,
  removeTestDirectory,
}
