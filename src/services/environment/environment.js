export default class {
  constructor (env = {}) {
    if (!env.name) { throw new Error('env.name is required') }
    if (!env.url) { throw new Error('env.url is required') }
    if (!env.startsWith) { throw new Error('env.startsWith is required') }

    this.name = env.name
    this.url = env.url
    this.startsWith = env.startsWith
  }
}
