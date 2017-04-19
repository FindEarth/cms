// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Custom theme #00bcd4 for element-ui https://elementui.github.io/theme-preview/#/en-US
import 'styles/custom-theme/index.css';

import Vue                from 'vue';
import ElementUI          from 'element-ui';
import locale             from 'element-ui/lib/locale/lang/es';
import VueRouter          from 'vue-router';
import moment             from 'moment';
import * as VueGoogleMaps from 'vue2-google-maps';

import Store  from 'plugins/store';
import auth0  from 'services/auth0'; // eslint-disable-line
import App    from './components/App';
import Router from './routes';


Vue.use(VueRouter);
Vue.use(ElementUI, { locale });
Vue.use(Store);
Vue.use(VueGoogleMaps, {
  load: {
    key      : 'AIzaSyBFDFmn-PL1Kg0frwZUXibuFyuiTPDMsas',
    libraries: 'places' // to use place input
  }
});

moment.locale('es');

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
