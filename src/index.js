import Traverser from './traverser'
import Validator from './validator'
import Excludes from './excludes'

class Rename {
  constructor (initialPath, options) {
    const { src, dest, exclude, override, path } = options

    const { excludes } = new Excludes(exclude)

    const validatorOptions = {
      excludes,
      override,
      path,
    }

    this.validator = new Validator(src, dest, validatorOptions)
  }

  async rename (dry) {
    const {
      src,
      dest,
      excludes,
      path,
    } = this.validator

    const traverser = new Traverser(path, {
      src,
      dest,
      excludes,
    })

    await traverser.traverse({ dry })
  }

}

module.exports = Rename
export default Rename
