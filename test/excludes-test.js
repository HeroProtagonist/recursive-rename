import expect from 'expect'
import excludes from '../src/excludes'

describe('Excludes', () => {
  it('should be a Set', () => {
    expect(excludes).toExist()
    expect(excludes.constructor).toBe(Set)
  })

  it('includes node_modules and .git by default', () => {
    expect(excludes.size).toBe(2)
    expect(excludes.has('node_modules')).toBe(true)
    expect(excludes.has('.git')).toBe(true)
  })
})
