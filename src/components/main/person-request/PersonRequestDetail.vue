<script>
  import personService from 'services/person'
  import personRequestService from 'services/person-request'
  import mapStyle from 'styles/map/wy'

  export default {

    data () {
      return {
        personRequest: {},
        isLoading: true,
        activeTab: '1',
        mapOptions: {
          mapTypeControl: false,
          fullscreenControl: true,
          styles: mapStyle
        }
      }
    },

    mounted () {
      this.isLoading = true
      this.getPersonRequest(this.$route.params.personRequestId)
    },

    computed: {
      position () {
        const position = {
          lat: 0,
          lng: 0
        }
        if (!this.personRequest.geo) { return position }

        position.lat = this.personRequest.geo.loc[1]
        position.lng = this.personRequest.geo.loc[0]
        return position
      },

      appearance () {
        const message = 'Apariencia no definida'
        return this.personRequest.description && this.personRequest.description.appearance || message
      },

      clothing () {
        const message = 'Vestimenta no definida'
        return this.personRequest.description && this.personRequest.description.clothing || message
      },

      moredata () {
        const message = 'Mas informacion no provista'
        return this.personRequest.description && this.personRequest.description.more || message
      }
    },

    methods: {
      getPersonRequest (personRequestId) {
        personRequestService.getById(personRequestId)
          .then((personRequest) => {
            this.personRequest = personRequest
            this.isLoading = false
          })
      },
      approve () {
        let newPersonId
        const message = 'Esta seguro que desea aprobar la solicitud de persona de ' +
                        `${this.personRequest.name}?`
        this.$confirm(message, 'Aprobar solicitud de persona', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
          this.isLoading = true
          return personService.create(this.personRequest)
        })
        .then((person) => {
          newPersonId = person._id
          this.personRequest.approved = true
          return personRequestService.update(this.personRequest)
        })
        .then(() => {
          this.isLoading = false
          this.$router.push({
            name: 'person-detail',
            params: { personId: newPersonId }
          })
        })
      },
      removePersonRequests () {
        const message = 'Esta operacion borrara la solicitud de persona de ' +
                        `${this.personRequest.name} permanentemente. Desea continuar?`
        this.$confirm(message, 'Eliminar Solicitud de Persona', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => personRequestService.delete(this.personRequest._id))
        .then(() => {
          this.$router.push({
            name: 'person-list'
          })
        })
      }
    }
  }
</script>

<template lang="pug">
  .container
    gmap-map.map(:center='position', :options='mapOptions', :zoom='16', v-loading='isLoading')
      gmap-marker(
        :position='position',
        :clickable='true'
      )

    el-row(:gutter="20")
      el-col(:span='8')
        .grid-content
          el-card(:body-style="{ padding: '0px' }", v-loading='isLoading')
            el-carousel(v-if='personRequest.photos')
              el-carousel-item(v-for='photo in personRequest.photos')
                img.image(v-bind:src='photo.url')
            div(style='padding: 14px;')
              span {{ personRequest.name }}
              .bottom.clearfix
                time.time {{ personRequest.createdAt }}

      el-col(:span='16')
        .action-button-container
          el-button-group
            el-button(type='primary', @click='approve()') Aprobar
            el-button(type='danger', icon='delete', @click='removePersonRequests()')

        .grid-content
          el-collapse(v-model='activeTab', accordion='')
            el-collapse-item(title='Apariencia', name='1')
              div {{ appearance }}
            el-collapse-item(title='Vestimenta', name='2')
              div {{ clothing }}
            el-collapse-item(title='Mas Datos', name='4')
              div {{ moreData }}

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

<style lang='scss'>
  .container {
    padding-bottom: 30px;
  }
  .map {
    height: 250px;
    margin: -25px -30px 30px -30px;
  }
  .time {
    font-size: 13px;
    color: #999;
    display: inline-block;
    margin-bottom: 12px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .action-button-container {
    margin-bottom: 21px;
    display: flex;
    justify-content: flex-end;
  }
</style>
