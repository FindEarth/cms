import Environment from './environment'

class ClientEnvironment {
  constructor () {
    this.environments = []
    this.environment = null
  }

  init (environments = []) {
    this.environments = environments.map(env => new Environment(env))
    this.environments.forEach((environment) => {
      if (window.document.URL.startsWith(environment.startsWith)) {
        this.environment = environment
      }
      this._createEnvironmentMethod(environment.name)
    })

    if (!this.environment) {
      throw new Error('Unable to find environment, make sure to register the current url')
    }
    this._isInitialized = true
  }

  clear () {
    this.environments = []
    this.environment = null
    this._isInitialized = false
  }

  setByName (environmentName) {
    this._isInitializedControl()
    const newEnvironment = this.environments.find(env => env.name === environmentName)
    if (!newEnvironment) {
      throw new Error(`Unable to set new environment, ${environmentName} not found`)
    }
    this.environment = newEnvironment
  }

  setByUrl (environmentUrl) {
    this._isInitializedControl()
    const newEnvironment = this.environments.find(env => env.url === environmentUrl)
    if (!newEnvironment) {
      throw new Error(`Unable to set new environment, ${environmentUrl} not found`)
    }
    this.environment = newEnvironment
  }

  getName () {
    this._isInitializedControl()
    return this.environment.name
  }

  getUrl () {
    this._isInitializedControl()
    return this.environment.url
  }

  _isInitializedControl () {
    if (this._isInitialized) { return }
    throw new Error('Library has not being initialized')
  }

  // generate isEnvironment methods. Assuming local is an environment name,
  // the method isLocal will be created.
  _createEnvironmentMethod (environmentName) {
    this[`is${this.constructor._capitalize(environmentName)}`] = () => {
      const expectedEnvName = this.environments.find(env => env.name === environmentName)
      return this.environment.name === expectedEnvName.name
    }
  }

  static _capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

const clientEnvironment = new ClientEnvironment()
clientEnvironment.ClientEnvironment = ClientEnvironment
export default clientEnvironment
