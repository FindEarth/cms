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
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur' }
          ],
          age: [
            { type: 'number', required: true, min: 0, max: 140, message: 'Please select a correct age', trigger: 'change' }
          ],
          lastSeenAt: [
            { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      addContact() {
        this.person.contacts.push({ name: '', phone: '', email: '' });
      },
      removeContact(index) {
        this.person.contacts.splice(index, 1);
      },
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (!valid) {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        this.$emit('basic-information-submitted', this.person);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<template lang='pug'>
  el-form(:model='person', :rules='rules', ref='person', label-width='120px')

    el-form-item(label='Nombre')
      el-input(v-model='person.name')

    el-form-item(label='Edad')
      el-input-number(v-model='person.age')

    el-form-item(label='Genero')
      el-select(v-model='person.gender', placeholder='Masculino')
        el-option(label='Masculino', value='M')
        el-option(label='Femenino', value='F')

    el-form-item(label='Fecha')
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
      el-button(type='primary', @click="submitForm('person')") Siguiente
</template>

<style lang='scss'>
  .remove-contact-button {
    margin-left: 10px;
  }
</style>
