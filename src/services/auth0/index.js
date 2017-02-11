import Auth0Lock from 'auth0-lock';
import store     from 'store';


const lock = new Auth0Lock(
  'zFGAcWRqfBqY1lf77Rt9GUgshPpz6i3d',
  'keepers-co.auth0.com',
  {
    allowedConnections: ['Username-Password-Authentication'],
    rememberLastLogin: true,
    languageDictionary: { title: 'FindEarth' },
    language: 'en',
    closable: false,
    theme: {
      primaryColor:'#3A99D8',
      logo: 'https://avatars2.githubusercontent.com/u/19509447?v=3&s=200'
    },
    auth: {
      responseType: 'token',
      autoParseHash: true
    }
  }
);

lock.authCallbackListener = (from, to, next) => {
  if (from.hash && from.hash.includes('access_token')) {
    lock.resumeAuth(from.hash, (err, authResult) => {
      if (err) {
        next({ name: 'login' });
      }
      store.set('token', authResult.idToken);
      next({ name: 'person-list' });
    });
  }
  next();
};

export default lock;
