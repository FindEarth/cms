/* global document */

class Environment {
  constructor(name, url) {
    this.name = name;
    this.url  = url;
  }
}

const envService = {
  envs: {
    PROD: new Environment('prod', 'https://alerta-solidaria.herokuapp.com'),
    DEV : new Environment('dev',  'http://localhost:9090'),
    QA  : new Environment('qa',   'https://alerta-solidaria.herokuapp.com')
  }
};


(function init() {
  if (document.URL.startsWith('https://app.')) {
    envService.env = envService.envs.PROD.name;
    return;
  }

  if (document.URL.startsWith('https://qa-app.') || document.URL.startsWith('http://127.0.0.1')) {
    envService.env = envService.envs.QA.name;
    return;
  }

  envService.env = envService.envs.PROD.name;
}());


envService.set = function(env) {
  if (env) { env = env.toLowerCase(); }
  this.env = env;
};

envService.get = function() {
  return this.env;
};

envService.isLocal = function() {
  return this.env === this.envs.DEV.name;
};

envService.isQA = function() {
  return this.env === this.envs.QA.name;
};

envService.isDev = function() {
  return this.env === this.envs.QA.name || this.env === this.envs.DEV.name;
};

envService.isProd = function() {
  return this.env === this.envs.PROD.name;
};

envService.getApiUrl = function() {
  if (this.isLocal()) { return this.envs.DEV.url; }
  if (this.isQA())    { return this.envs.QA.url; }

  return this.envs.PROD.url;
};

export default envService;
