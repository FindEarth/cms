<script>
  import personRequestService from 'services/person-request';

  export default {

    data() {
      return {
        personRequests: [],

        isLoading: false
      };
    },

    mounted() {
      this.getPersonRequests();
    },

    methods: {
      getPersonRequests() {
        this.isLoading = true;
        personRequestService.get()
          .then((personRequests) => {
            this.personRequests = personRequests;
            this.isLoading      = false;
          });
      },

      onSelect(personRequest) {
        this.$router.push({
          name  : 'person-request-detail',
          params: { personRequestId: personRequest._id }
        });
      },

      deletePersonRequest(index, personRequest) {
        const message = 'Esta operacion borrara la solicitud de persona de' +
                        `${personRequest.name} permanentemente, Desea continuar?`;
        this.$confirm(message, 'Eliminar Solicitud de Persona', {
          confirmButtonText: 'OK',
          cancelButtonText : 'Cancel',
          type             : 'warning'
        })
        .then(() => {
          personRequestService.delete(personRequest._id);
        })
        .then(() => {
          this.personRequests.splice(index, 1);
        });
      }
    }
  };
</script>

<template lang='pug'>
  el-table(
    :data='personRequests',
    border='',
    style='width: 100%',
    v-loading='isLoading',
    element-loading-text='Cargando solicitudes',
    empty-text='No se ha encontrado solicitudes de carga de personas'
  )
    el-table-column(fixed='', prop='name', label='Nombre', width='200')
    el-table-column(prop='age', label='Edad', width='90')
    el-table-column(prop='gender', label='Genero', width='90')
    el-table-column(prop='geo.city', label='Ciudad', width='220')
    el-table-column(prop='geo.countryCode', label='Pais', width='70')
    el-table-column(prop='geo.postalCode', label='Zip', width='80')
    el-table-column(prop='createdAt', label='Fecha', width='210')
    el-table-column(fixed='right', label='Operations', width='120')
      template(scope='scope')
          el-button-group
            el-button(
              type='primary',
              size='mini',
              icon='edit'
              @click.native.prevent='onSelect'
              )
            el-button(
              type='primary',
              size='mini',
              icon='delete',
              @click.native.prevent='deletePersonRequest(scope.$index, scope.row)'
            )
</template>

<style lang="scss">
</style>
