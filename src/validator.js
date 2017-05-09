class Validator {
  constructor (argv, src, dest, options) {
    this._determineExtenstions(argv, src, dest)
    this._handleOptions(options)
  }

  get src () {
    return this._src
  }

  get dest () {
    return this._dest
  }

  _determineExtenstions (argv, src, dest) {
    const cliInputs = argv ? argv._ : []

    this._src = src || cliInputs[0]
    this._dest = dest || cliInputs[1]

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
    if (override) this._handleOverrides(override)

  }

  _handleExcludes (excludes) {
    return true
  }

  _handleOverrides (override) {
    return true
  }

}

export default Validator
