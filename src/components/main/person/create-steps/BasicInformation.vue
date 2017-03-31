<script>
  export default {
    props: {
      person: {
        type: Object,
        default: () => ({
          name       : '',
          age        : '',
          gender     : 'M',
          lastSeenAt : '',
          description: {},
          contacts   : [{ name: '', phone: '', email: '' }]
        })
      }
    },

    data() {
      return {
        rules: {
          name: [
            { required: true, message: 'Ingrese un nombre', trigger: 'blur' },
            { min: 4, max: 50, message: 'Ingrese un nombre correcto', trigger: 'blur' }
          ],
          age: [
            { type: 'number', required: true, min: 1, max: 140, message: 'Ingrese una edad correcta', trigger: 'change' }
          ],
          lastSeenAt: [
            { type: 'date', required: true, message: 'Ingrese una fecha', trigger: 'change' }
          ]
        },
        isFormValid: true
      };
    },

    methods: {
      addContact() {
        this.person.contacts.push({ name: '', phone: '', email: '' });
      },
      removeContact(index) {
        this.person.contacts.splice(index, 1);
      },
      submitForm() {
        this.$refs.personForm.validate((valid) => {
          if (!valid) {
            this.isFormValid = false;
            this.watchFormChange();
            return false;
          }
          this.$emit('basic-information-submitted', this.person);
        });
      },
      watchFormChange() {
        this.$watch('person', () => {
          this.$refs.personForm.validate((valid) => {
            if (valid) {
              this.isFormValid = true;
              return true;
            }
          });
        }, {
          deep: true
        });
      }
    }
  };
</script>

<template lang='pug'>
  el-form(:model='person', :rules='rules', ref='personForm', label-width='120px')

    el-form-item(label='Nombre', prop='name')
      el-input(v-model='person.name')

    el-form-item(label='Edad', prop='age')
      el-input-number(v-model='person.age')

    el-form-item(label='Genero')
      el-select(v-model='person.gender', placeholder='Masculino')
        el-option(label='Masculino', value='M')
        el-option(label='Femenino', value='F')

    el-form-item(label='Fecha', prop='lastSeenAt')
      el-date-picker(
        v-model='person.lastSeenAt',
        type='datetime',
        placeholder='Seleccionar Fecha'
      )

    el-form-item(label='Vestimenta')
      el-input(type='textarea', v-model='person.description.clothing')

    el-form-item(label='Razgos físicos')
      el-input(type='textarea', v-model='person.description.appearance')

    el-form-item(label='Otra información')
      el-input(type='textarea', v-model='person.description.more')

    el-form-item(label='Contacto', :gutter='20', v-for='(contact, index) in person.contacts')
      el-col(:span='6')
        el-input(type='text', placeholder='Nombre', style='width: 100%;', v-model='contact.name')
      el-col.line(:span='1') &nbsp;
      el-col(:span='6')
        el-input(type='phone', placeholder='Telefono', style='width: 100%;', v-model='contact.phone')
      el-col.line(:span='1') &nbsp;
      el-col(:span='6')
        el-input(type='email', placeholder='Email', style='width: 100%;', v-model='contact.email')

      el-col(:span='4', v-if='person.contacts.length === 1')
        el-button.remove-contact-button(type='primary', size='mini', @click='addContact') Agregar
      el-col(:span='4', v-if='index + 1 < person.contacts.length && person.contacts.length > 1')
        el-button.remove-contact-button(type='danger', size='mini', @click='removeContact(index)') Eliminar
      el-col(:span='4', v-if='index + 1 === person.contacts.length && index !== 0')
        el-button-group
          el-button.remove-contact-button(type='danger', size='mini', @click='removeContact(index)') Eliminar
          el-button.remove-contact-button(type='primary', size='mini', @click='addContact') Agregar

    el-form-item
      el-button(type='primary', :disabled='!isFormValid', @click='submitForm') Siguiente
</template>

<style lang='scss'>
  .remove-contact-button {
    margin-left: 10px;
  }
</style>
