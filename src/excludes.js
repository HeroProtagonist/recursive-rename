class Excludes {
  constructor (folders, override) {
    this.excludes = new Set()

    if (!override) {
      this.excludes.add('node_modules')
      this.excludes.add('.git')
    }

    if (folders) {
      if (typeof folders === 'string') folders = folders.split(',')
      folders.forEach(folder => this.excludes.add(folder))
    }
  }

  get size () {
    return this.excludes.size
  }

  add (item) {
    return this.excludes.add(item)
  }

  has (item) {
    return this.excludes.has(item)
  }
}

export default Excludes
