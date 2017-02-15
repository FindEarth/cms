<script>
  import personService from 'services/person';

  export default {

    data() {
      return {
        person: {},

        isLoading: true,
        activeTab: '1'
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
      setFound(person) {
        const message = `Desea marcar a ${person.name} como encontrado?`;
        this.$confirm(message, 'Persona encontrada', {
          confirmButtonText: 'OK',
          cancelButtonText : 'Cancel',
          type             : 'warning'
        }).then(() => {
          personService.update({
            _id      : person._id,
            isMissing: !person.isMissing
          }).then(() => {
            this.$router.push({ name  : 'person-found' });
          });
        });
      }
    }
  };
</script>

<template lang="pug">
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
            el-carousel(v-if='person.photos')
              el-carousel-item(v-for='photo in person.photos')
                img.image(v-bind:src='photo.url')
            div(style='padding: 14px;')
              span {{ person.name }}
              .bottom.clearfix
                time.time {{ person.createdAt }}

      el-col(:span='15')
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
          div(style='padding-top: 8px;')
            el-button(
              type='warning',
              @click.native.prevent='setFound(person)'
              ) Encontrado!
</template>

<style lang="scss">
  .container {
    padding-bottom: 30px;
  }
  .map {
    height: 200px;
    margin-bottom: 20px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
