import expect from 'expect'
import {
  createTestDirectory,
  findTestDirectory,
  removeTestDirectory,
} from './lib'

import Traverser from '../src/traverser'

const generateExpectedOutput = (files, src, dest) => files.replace(
  new RegExp(`^([a-zA-Z0-9.\\-\\/]*)\\.${src}$`, 'gm'),
  `$1.${dest}`
)

describe('Traverser', () => {
  let traverseSpy
  beforeEach(done => {
    traverseSpy = expect.spyOn(Traverser.prototype, 'traverse').andCallThrough()
    createTestDirectory(done)
  })

  afterEach(done => {
    removeTestDirectory(done)
    traverseSpy.restore()
  })

  // erroring

  it('does not rename if dry flag is present', async () => {
    return new Promise(resolve => {
      findTestDirectory(async filesBefore => {
        const traverser = new Traverser('test/mock', {
          src: 'jsx',
          dest: 'js',
          excludes: new Set(),
        })

        await traverser.traverse({ dry: true })

        findTestDirectory(filesAfter => {
          expect(filesBefore).toBe(filesAfter)
          expect(traverseSpy.calls.length).toBe(5)

          resolve()
        })
      })
    })
  })

  it('renames source files to destination extension jsx -> js', async () => {
    return new Promise(resolve => {
      findTestDirectory(async filesBefore => {
        const expectedOutput = generateExpectedOutput(filesBefore, 'jsx', 'js')

        const traverser = new Traverser('test/mock', {
          src: 'jsx',
          dest: 'js',
          excludes: new Set(),
        })

        await traverser.traverse()

        findTestDirectory(filesAfter => {
          expect(filesAfter).toBe(expectedOutput)
          expect(traverseSpy.calls.length).toBe(5)

          resolve()
        })
      })
    })
  })

  it('renames source files to destination extension txt -> doc', async () => {
    return new Promise(resolve => {
      findTestDirectory(async filesBefore => {
        const expectedOutput = generateExpectedOutput(filesBefore, 'txt', 'doc')

        const traverser = new Traverser('test/mock', {
          src: 'txt',
          dest: 'doc',
          excludes: new Set(),
        })

        await traverser.traverse()

        findTestDirectory(filesAfter => {
          expect(filesAfter).toBe(expectedOutput)
          expect(traverseSpy.calls.length).toBe(5)

          resolve()
        })
      })
    })
  })

  it('respects excludes flag when renaming', async () => {
    return new Promise(resolve => {
      findTestDirectory(async filesBefore => {
        const beforeArray = filesBefore.split('\n')

        let expectedOutput = beforeArray.map(path => {
          if (!path.includes('do-not-touch')) {
            return generateExpectedOutput(path, 'jsx', 'js')
          }

          return path
        })

        expectedOutput = expectedOutput.join('\n')

        const excludes = new Set()
        excludes.add('do-not-touch')

        const traverser = new Traverser('test/mock', {
          src: 'jsx',
          dest: 'js',
          excludes,
        })

        await traverser.traverse()

        findTestDirectory(filesAfter => {
          expect(filesAfter).toBe(expectedOutput)
          expect(traverseSpy.calls.length).toBe(4)

          resolve()
        })
      })
    })
  })
})
