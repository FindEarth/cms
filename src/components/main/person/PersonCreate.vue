<script>
  import personService from 'services/person';

  import BasicInformation from 'components/main/person/create-steps/BasicInformation';
  import Geolocation      from 'components/main/person/create-steps/Geolocation';
  import FileUpload       from 'components/main/person/create-steps/FileUpload';
  import Resume           from 'components/main/person/create-steps/Resume';

  export default {
    name: 'PersonCreate',

    components: { BasicInformation, Geolocation, FileUpload, Resume },

    data() {
      return {
        step: 1,

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

      onGelocationSubmitted(geolocation) {
        Object.assign(this.person.geo, geolocation);
        this.step += 1;
      },

      onFileUploadSubmitted(files) {
        this.person.photos = files;
        this.step += 1;
      },

      onResumeSubmitted() {
        return personService.create(this.person)
          .then(() => this.$router.push({ name: 'person-list' }));
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
      el-step.last-step(title='Step 4', description='Resumen')

    el-card.box-card
      basic-information(
        v-if='step === 1',
        v-on:basic-information-submitted='onBasicInformationSubmitted'
      )

      geolocation(
        v-if='step === 2',
        v-on:gelocation-submitted='onGelocationSubmitted'
      )

      file-upload(
        v-if='step === 3',
        v-on:file-upload-submitted='onFileUploadSubmitted'
      )

      resume(
        v-if='step === 4',
        :person='person',
        v-on:resume-submitted='onResumeSubmitted'
      )
</template>

<style lang='scss' scoped>
  .steps {
    padding: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .last-step {
      width: auto !important;
    }
  }

  .box-card {
    padding: 20px 20px 0 20px;
    margin: 0 40px 20px 40px;
  }
</style>
