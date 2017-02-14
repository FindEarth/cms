import Container from 'components/main/person-request/PersonRequestContainer';
import List      from 'components/main/person-request/PersonRequestList';

const route = {
  path     : '/person-request',
  component: Container,
  children : [{
    path     : '',
    name     : 'person-request-list',
    component: List
  }]
};

export default route;
