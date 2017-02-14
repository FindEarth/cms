import Container from 'components/main/person-request/PersonRequestContainer';
import List      from 'components/main/person-request/PersonRequestList';
import Detail    from 'components/main/person-request/PersonRequestDetail';

const route = {
  path     : '/person-request',
  component: Container,
  children : [{
    path     : '',
    name     : 'person-request-list',
    component: List
  }, {
    path     : ':personRequestId',
    name     : 'person-request-detail',
    component: Detail
  }]
};

export default route;
