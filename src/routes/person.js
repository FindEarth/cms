import Container from 'components/main/person/PersonContainer'
import List from 'components/main/person/PersonList'
import Create from 'components/main/person/PersonCreate'
import Found from 'components/main/person/PersonFound'
import Detail from 'components/main/person/PersonDetail'
import Edit from 'components/main/person/PersonEdit'

const route = {
  path: '/person',
  component: Container,
  children: [{
    path: '',
    name: 'person-list',
    component: List
  }, {
    path: 'create',
    name: 'person-create',
    component: Create
  }, {
    path: 'found',
    name: 'person-found',
    component: Found
  }, {
    path: ':personId',
    name: 'person-detail',
    component: Detail
  }, {
    path: ':personId/edit',
    name: 'person-edit',
    component: Edit
  }]
}

export default route
