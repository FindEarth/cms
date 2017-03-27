import Auth0Lock from 'auth0-lock';
import store     from 'store';


const lock = new Auth0Lock(
  'fqfXBUk40SmkYJBwy1a5gNgi3Vod60lK',
  'keepers.auth0.com',
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
      responseType : 'token',
      autoParseHash: true,
      params       : { scope: 'openid email user_metadata' }
    }
  }
);

lock.authCallbackListener = (from, to, next) => {
  if (store.get('token')) { next(); }
  if (window.location.hash && window.location.hash.includes('access_token')) {
    lock.resumeAuth(window.location.hash, (err, authResult) => {
      if (err) { return next({ name: 'login' }); }
      store.set('token', authResult.idToken);
      next({ name: 'person-list' });
    });
  }
  next();
};

export default lock;
