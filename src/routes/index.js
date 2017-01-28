import MainContainer from 'components/main/MainContainer.vue';

import person from 'routes/person';

const routes = [{
  path     : '/',
  component: MainContainer,
  children : [
    person
  ]
}];

export default routes;
