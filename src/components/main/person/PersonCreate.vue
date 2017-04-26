<script>
  import personService from 'services/person'

  import BasicInformation from 'components/main/person/create-steps/BasicInformation'
  import Geo from 'components/main/person/create-steps/Geolocation'
  import FileUpload from 'components/main/person/create-steps/FileUpload'
  import Resume from 'components/main/person/create-steps/Resume'

  export default {
    name: 'PersonCreate',

    components: { BasicInformation, Geo, FileUpload, Resume },

    data () {
      return {
        step: 1,
        isLoading: false,

        person: {
          name: '',
          age: '',
          description: {},
          gender: 'M',
          lastSeenAt: '',
          geo: {
            loc: [],
            address: '',
            city: '',
            postalCode: '',
            countryCode: '',
            country: ''
          },
          contacts: [{ name: '', phone: '', email: '' }],
          photos: []
        }
      }
    },

    methods: {
      stepBack () {
        this.step -= 1
      },

      onBasicInformationSubmitted (basicInformation) {
        Object.assign(this.person, basicInformation)
        this.step += 1
      },

      onGelocationSubmitted (geolocation) {
        Object.assign(this.person.geo, geolocation)
        this.step += 1
      },

      onFileUploadSubmitted (files) {
        this.person.photos = files
        this.step += 1
      },

      onResumeSubmitted () {
        this.isLoading = true
        return personService.create(this.person)
          .then(() => this.$router.push({ name: 'person-list' }))
      }
    }
  }
</script>

<template lang='pug'>
  div(v-loading='isLoading', element-loading-text='Creando persona',)
    el-steps.steps(:space='150', :active='step')
      el-step(title='Información básica', icon='information')
      el-step(title='Geolocalización', icon='search')
      el-step(title='Carga de fotos', icon='picture')
      el-step.last-step(title='Resumen', icon='check')

    el-card.box-card
      basic-information(
        v-if='step === 1',
        :person='person',
        v-on:basic-information-submitted='onBasicInformationSubmitted'
      )

      geo(
        v-if='step === 2',
        :geo='person.geo',
        v-on:gelocation-submitted='onGelocationSubmitted',
        v-on:step-back='stepBack'
      )

      file-upload(
        v-if='step === 3',
        :files='person.photos',
        v-on:file-upload-submitted='onFileUploadSubmitted',
        v-on:step-back='stepBack'
      )

      resume(
        v-if='step === 4',
        :person='person',
        v-on:resume-submitted='onResumeSubmitted',
        v-on:step-back='stepBack'
      )
</template>

<style lang='scss' scoped>
  .steps {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    .last-step {
      width: auto !important;
    }
  }

  .box-card {
    padding: 20px 20px 0 20px;
  }
</style>
