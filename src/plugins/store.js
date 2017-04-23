import store from 'store'

store.install = (Vue) => {
  Vue.prototype.$store = store
}

export default store
