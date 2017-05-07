import expect from 'expect'
import mock from 'mock-fs'
import Traverser from '../src/traverser'


mock({
  'path/to/fake/dir': {
    'some-file.txt': 'file content here',
    'empty-dir': {/** empty directory */},
  },
  'path/to/some.png': new Buffer([8, 6, 7, 5, 3, 0, 9]),
  'some/other/path': {/** another empty directory */},
})

describe('Traverse', () => {

  it('should exist', () => {

    const excludes = new Set()

    excludes.add('node_modules')
    excludes.add('.git')

    const traverser = new Traverser(excludes, 'path/to/fake/dir')
    traverser.traverse()

    expect(traverser).toExist()
  })

  after(() => {
    mock.restore()
  })

})
