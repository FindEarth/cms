<script>
  import personService from 'services/person';

  import BasicInformationForm from 'components/main/person/create-steps/BasicInformationForm';
  import GeolocationForm      from 'components/main/person/create-steps/GeolocationForm';

  export default {
    name: 'PersonCreate',

    components: { BasicInformationForm, GeolocationForm },

    mounted() {

    },

    data() {
      return {
        step: 2,

        person: {
          name       : '',
          age        : '',
          description: {},
          gender     : 'M',
          lastSeenAt : '',
          geo: {
            loc        : [],
            address    : '',
            city       : '',
            postalCode : '',
            countryCode: '',
            country    : ''
          },
          contacts: [{ name: '', phone: '', email: '' }],
          photos  : []
        }
      };
    },

    methods: {
      onBasicInformationSubmitted(basicInformation) {
        Object.assign(this.person, basicInformation);
        this.step += 1;
      },

      createPerson() {
        if (!this.person.photos || !this.person.photos.length) {
          delete this.person.photos;
        } else if (this.person.photos && this.person.photos.length > 3) { return; }

        return personService.create(this.person)
        .then((person) => {
          this.isLoading = false;
          this.$route.router.go({ name: 'person-list' });
        });
      }
    }

  };
</script>

<template lang='pug'>
  div
    el-steps.steps(:space='150', :active='step')
      el-step(title='Step 1', description='Informacion basica')
      el-step(title='Step 2', description='Geolocalizacion')
      el-step(title='Step 3', description='Carga de Fotos')
      el-step(title='Step 4', description='Terminar')

    el-card.box-card
      basic-information-form(
        v-if='step === 1'
        v-on:basic-information-submitted="onBasicInformationSubmitted"
      )
      geolocation-form(
        v-if='step === 2'
      )
</template>

<style lang='scss' scoped>
  .steps {
    margin: auto;
    width: 50%;
    padding-top: 30px;
  }

  .box-card {
    padding: 10px;
    margin: 40px;
  }
</style>
