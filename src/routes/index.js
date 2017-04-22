import userService   from 'services/user';
import MainContainer from 'components/main/MainContainer.vue';

import loginRoutes         from 'routes/login';
import homeRoutes          from 'routes/home';
import personRoutes        from 'routes/person';
import personRequestRoutes from 'routes/person-request';

const mainRoute = {
  path     : '/',
  component: MainContainer,
  children : [
    homeRoutes,
    personRoutes,
    personRequestRoutes
  ]
};

const defaultRoute = {
  path: '*',
  redirect: '/'
};

const routes = [
  mainRoute,
  loginRoutes,
  defaultRoute
];

const publicRoutes = ['login'];

const loginMiddleware = (to, from, next) => {
  if (publicRoutes.find(publicr => publicr === to.name)) {
    return next();
  }
  const token = userService.getToken();
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (!token || token.expiresAt < currentTimestamp) {
    return next({ name: 'login' });
  }
  next();
};

export default {
  routes,
  loginMiddleware
};
