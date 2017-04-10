<script>
  import personService from 'services/person';
  import mapStyle      from 'styles/map/wy';

  export default {

    data() {
      return {
        person   : {},
        isLoading: true,
        activeTab: '1',
        mapOptions : {
          mapTypeControl   : false,
          fullscreenControl: true,
          styles           : mapStyle
        }
      };
    },

    mounted() {
      this.isLoading = true;
      this.getPerson(this.$route.params.personId);
    },

    computed: {
      position() {
        const position = {
          lat: 0,
          lng: 0
        };
        if (!this.person.geo) { return position; }

        position.lat = this.person.geo.loc[1];
        position.lng = this.person.geo.loc[0];
        return position;
      },

      isFound() {
        return this.$route.query.isFound;
      },

      appearance() {
        const message = 'Apariencia no definida';
        return this.person.description && this.person.description.appearance || message;
      },

      clothing() {
        const message = 'Vestimenta no definida';
        return this.person.description && this.person.description.clothing || message;
      },

      moreData() {
        const message = 'Mas informacion no provista';
        return this.person.description && this.person.description.more || message;
      }
    },

    methods: {
      getPerson(personId) {
        personService.getById(personId)
          .then((person) => {
            this.person    = person;
            this.isLoading = false;
          });
      },

      setFound() {
        const message = `Desea marcar a ${this.person.name} como encontrado?`;
        this.$confirm(message, 'Persona encontrada', {
          confirmButtonText: 'OK',
          cancelButtonText : 'Cancel',
          type             : 'warning'
        }).then(() => {
          personService.update({
            _id      : this.person._id,
            isMissing: !this.person.isMissing
          })
          .then(() => this.$router.push({ name  : 'person-found' }));
        });
      },

      sharePerson() {
        personService.share(this.person);
      },

      editPerson() {
        this.$router.push({
          name  : 'person-edit',
          params: { personId: this.person._id }
        });
      },

      deletePerson() {
        const message = `Esta operacion borrara la persona ${this.person.name} ` +
                        'permanentemente, Desea continuar?';
        this.$confirm(message, 'Eliminar Persona', {
          confirmButtonText: 'OK',
          cancelButtonText : 'Cancel',
          type             : 'warning'
        })
        .then(() => personService.delete(this.person._id))
        .then(() => this.$router.push({ name: 'person-list' }));
      }
    }
  };
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
            el-carousel(v-if='person.photos')
              el-carousel-item(v-for='photo in person.photos')
                img.image(v-bind:src='photo.url')
            div(style='padding: 14px;')
              span {{ person.name }}
              .bottom.clearfix
                time.time {{ person.createdAt }}

      el-col(:span='16')
        .action-button-container
          el-button-group
            el-button(type='primary', @click='setFound(person)', v-if='!isFound') Encontrado
            el-button(type='primary', icon='edit', @click='editPerson', v-if='!isFound')
            el-button(type='primary', icon='share', @click='sharePerson')
            el-button(type='danger', icon='delete', @click='deletePerson')

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
            :data='person.contacts',
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
