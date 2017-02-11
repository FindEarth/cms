import Container   from 'components/main/person/PersonContainer';
import List        from 'components/main/person/PersonList';
import Create      from 'components/main/person/PersonCreate';
import Found       from 'components/main/person/PersonFound';
import Detail      from 'components/main/person/PersonDetail';
import RequestList from 'components/main/person/PersonRequestList';

const route = {
  path     : '/person',
  component: Container,
  children : [{
    path     : '',
    name     : 'person-list',
    component: List
  }, {
    path     : 'create',
    name     : 'person-create',
    component: Create
  }, {
    path     : 'found',
    name     : 'person-found',
    component: Found
  }, {
    path     : ':personId',
    name     : 'person-detail',
    component: Detail
  }, {
    path     : 'person-request',
    name     : 'person-request',
    component: RequestList
  }]
};

export default route;
