<script>
  import personRequestService from 'services/person-request';

  export default {

    data() {
      return {
        isLoading     : false,
        activeTab     : '1',
        personRequest : {}
      };
    },

    mounted() {
      this.isLoading = true;
      this.getPersonRequest(this.$route.params.personRequestId);
    },

    computed: {
      position() {
        const position = {
          lat: 0,
          lng: 0
        };
        if (!this.personRequest.geo) { return position; }

        position.lat = this.personRequest.geo.loc[1];
        position.lng = this.personRequest.geo.loc[0];
        return position;
      }
    },

    methods: {
      getPersonRequest(personRequestId) {
        personRequestService.getById(personRequestId)
          .then((personRequest) => {
            this.personRequest = personRequest;
            this.isLoading     = false;
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
        .then(() => personRequestService.delete(personRequest._id))
        .then(() => this.personRequests.splice(index, 1));
      }
    }
};
</script>

<template lang='pug'>
  .container
    gmap-map.map(:center='position', :zoom='14', v-loading='isLoading')
      gmap-marker(
        :position='position',
        :clickable='true'
      )
    el-row(:gutter="20")
      el-col(:span='7', :offset='1')
        .grid-content
          el-card(:body-style="{ padding: '0px' }", v-loading='isLoading')
            el-carousel
              el-carousel-item
                img.image(src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png')
            div(style='padding: 14px;')
              span {{ personRequest.name }}

      el-col(:span='15')
        .grid-content
          el-collapse(v-model='activeTab', accordion='')
            el-collapse-item(title='Solicitud de reporte', name='1')
              div {{personRequest.name}} tiene {{personRequest.age}} años.
            el-collapse-item(title='Ultima vez visto', name='2')
              div {{personRequest.lastSeenAt}}
            el-collapse-item(title='Descripcion del reporte', name='4')
              div Phasellus porttitor enim id metus volutpat ultricies. Ut nisi nunc, blandit sed dapibus at, vestibulum in felis. Etiam iaculis lorem ac nibh bibendum rhoncus. Phasellus porttitor enim id metus volutpat ultricies. Ut nisi nunc, blandit sed dapibus at, vestibulum in felis. Etiam iaculis lorem ac nibh bibendum rhoncus.

          h4 Contactos
          el-table(
            :data='personRequest.contacts',
            style='width: 100%',
            v-loading='isLoading',
            element-loading-text='Cargando contactos...',
            empty-text='La persona no posee contactos'
          )
            el-table-column(prop='name', label='Nombre', width='180')
            el-table-column(prop='phone', label='Telefono', width='180')
            el-table-column(prop='email', label='Email')
</template>

<style lang="scss">
</style>
