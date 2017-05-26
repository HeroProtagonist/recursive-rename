import expect from 'expect'
import Excludes from '../src/excludes'

describe('Excludes', () => {
  it('should create instance', () => {
    const excludes = new Excludes()

    expect(excludes).toExist()
    expect(excludes.constructor).toBe(Excludes)
  })

  it('includes node_modules and .git by default', () => {
    const excludes = new Excludes()

    expect(excludes.size).toBe(2)
    expect(excludes.has('node_modules')).toBe(true)
    expect(excludes.has('.git')).toBe(true)
  })

  it('does not set default excludes if override is present', () => {
    const excludes = new Excludes(undefined, true)

    expect(excludes.size).toBe(0)
  })

  describe('From node', () => {
    it('adds folders when supplied', () => {
      const folders = ['dist', 'build']
      const excludes = new Excludes(folders)

      expect(excludes.size).toBe(4)
      expect(excludes.has('node_modules')).toBe(true)
      expect(excludes.has('.git')).toBe(true)
      expect(excludes.has('dist')).toBe(true)
      expect(excludes.has('build')).toBe(true)
    })

    it('adds folders when supplied with override', () => {
      const folders = ['dist', 'build']
      const excludes = new Excludes(folders, true)

      expect(excludes.size).toBe(2)
      expect(excludes.has('node_modules')).toBe(false)
      expect(excludes.has('.git')).toBe(false)
      expect(excludes.has('dist')).toBe(true)
      expect(excludes.has('build')).toBe(true)
    })
  })

  describe('From command line', () => {
    it('adds folders when supplied', () => {
      const folders = 'dist,build'
      const excludes = new Excludes(folders)

      expect(excludes.size).toBe(4)
      expect(excludes.has('node_modules')).toBe(true)
      expect(excludes.has('.git')).toBe(true)
      expect(excludes.has('dist')).toBe(true)
      expect(excludes.has('build')).toBe(true)
    })

    it('adds folders when supplied with override', () => {
      const folders = 'dist,build'
      const excludes = new Excludes(folders, true)

      expect(excludes.size).toBe(2)
      expect(excludes.has('node_modules')).toBe(false)
      expect(excludes.has('.git')).toBe(false)
      expect(excludes.has('dist')).toBe(true)
      expect(excludes.has('build')).toBe(true)
    })
  })
})
