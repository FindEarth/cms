import 'element-ui/lib/theme-default/index.css';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue                from 'vue';
import ElementUI          from 'element-ui';
import VueRouter          from 'vue-router';
import * as VueGoogleMaps from 'vue2-google-maps';


import Store  from 'plugins/store';
import auth0  from 'services/auth0'; // eslint-disable-line
import App    from './components/App';
import Router from './routes';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Store);
Vue.use(VueGoogleMaps, {
  load: {
    key      : 'AIzaSyCrBw8TPQmnVKPLhNxpykbuB8EyzmPotgA',
    libraries: 'places' // to use place input
  }
});

const router = new VueRouter({
  routes: Router.routes,
  mode  : 'history'
});

router.beforeEach(Router.loginMiddleware);
router.beforeEach(auth0.authCallbackListener);

/* eslint-disable no-new */
new Vue({
  el        : '#app',
  template  : '<App/>',
  components: { App },
  router
});
