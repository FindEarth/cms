import api from 'services/api'
import store from 'store'

const userService = {}

userService.authenticate = function (username, password) {
  return api.post('/auth', { username, password })
    .then((res) => {
      store.set('token', res.data.idToken)
    })
}

userService.get = function () {
  return store.get('user')
}

userService.getToken = function () {
  return store.get('token')
}

userService.clearToken = function () {
  store.remove('token')
}

userService.clearUser = function () {
  store.remove('user')
}

userService.clear = function () {
  this.clearToken()
  this.clearUser()
}

export default userService
