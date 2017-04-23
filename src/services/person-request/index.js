import { Notification } from 'element-ui'
import api from 'services/api'

const personRequestService = {}

personRequestService.get = function (query = {}) {
  return api.get('/person-request', { params: query })
    .then(response => response.data)
}

personRequestService.getTotalCount = function (id) {
  return api.get('/person-request', { params: { approved: false } })
    .then(response => response.data)
}

personRequestService.getById = function (id) {
  return api.get(`/person-request/${id}`)
    .then(response => response.data)
}

personRequestService.create = function (personRequest) {
  return api.post('/person-request', personRequest)
    .then((response) => {
      Notification({
        message: 'Pedido de carga de persona creado correctamente',
        type: 'success'
      })
      return response.data
    })
}

personRequestService.update = function (personRequest) {
  return api.put(`/person-request/${personRequest._id}`, personRequest)
    .then((response) => {
      Notification({
        message: 'Pedido de carga de persona actualizado correctamente',
        type: 'success'
      })
      return response.data
    })
}

personRequestService.delete = function (id) {
  return api.delete(`/person-request/${id}`)
    .then((response) => {
      Notification({
        message: 'Pedido de carga de persona borrado correctamente',
        type: 'success'
      })
      return response.data
    })
}

export default personRequestService
