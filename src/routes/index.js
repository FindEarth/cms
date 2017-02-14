import userService   from 'services/user';
import MainContainer from 'components/main/MainContainer.vue';

import loginRoutes         from 'routes/login';
import homeRoutes          from 'routes/home';
import personRoutes        from 'routes/person';
import personRequestRoutes from 'routes/person-request';

const routes = [{
  path     : '/',
  component: MainContainer,
  children : [
    homeRoutes,
    personRoutes,
    personRequestRoutes
  ]
}, loginRoutes];

const publicRoutes = ['login'];

const loginMiddleware = (to, from, next) => {
  if (publicRoutes.find(publicr => publicr === to.name)) {
    return next();
  }
  if (!userService.getToken()) {
    return next({ name: 'login' });
  }
  next();
};

export default {
  routes,
  loginMiddleware
};
