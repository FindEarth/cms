import MainContainer from 'components/main/MainContainer.vue';

import home   from 'routes/home';
import person from 'routes/person';

const routes = [{
  path     : '/',
  component: MainContainer,
  children : [
    home,
    person
  ]
}];

export default routes;
