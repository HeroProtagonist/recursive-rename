class Validator {
  constructor (src, dest, options) {
    this._determineExtenstions(src, dest)
    this._handleOptions(options)
  }

  get src () {
    return this._src
  }

  get dest () {
    return this._dest
  }

  _determineExtenstions (src, dest) {
    this._src = src
    this._dest = dest

    if (!this._src || !this._dest) {
      throw new Error('A source and destination are required')
    }

  }

  _handleOptions (options = {}) {
    if (typeof options !== 'object') {
      throw new Error('When supplied options they must be an object')
    }

    const { excludes, override } = options

    if (excludes) this._handleExcludes(excludes)
    if (override) this._handleOverride(override)

  }

  _handleExcludes (excludes) {
    if (excludes && excludes.constructor !== Set) {
      throw new Error('Excludes must be a set')
    }

    this.excludes = excludes
  }

  _handleOverride (override) {
    if (typeof override !== 'boolean') {
      throw new Error('Override must be a boolean')
    }

   this.override = override
  }

}

export default Validator
