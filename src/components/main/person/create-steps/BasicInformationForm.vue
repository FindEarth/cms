<script>
  export default {
    data() {
      return {
        person: {
          name       : '',
          age        : '',
          gender     : 'M',
          lastSeenAt : '',
          description: {},
          contacts   : [{ name: '', phone: '', email: '' }]
        },
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log('error submit!!');
            return false;
          }

          this.$emit('basic-information-submitted', this.person);
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<template lang='pug'>
el-form(:model='person', :rules='rules', ref='person', label-width='120px')

  el-form-item(label='Nombre', prop='name')
    el-input(v-model='person.name')

  el-form-item(label='Edad', prop='age')
    el-input-number(v-model='person.age')

  el-form-item(label='Genero', prop='gender', required='')
    el-select(v-model='person.gender', placeholder='Masculino')
      el-option(label='Masculino', value='M')
      el-option(label='Femenino', value='F')

  el-form-item(label='Fecha', required='')
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
    el-input(type='textarea', v-model='person.description.relevantData')

  el-form-item
    el-button(type='primary', @click="submitForm('person')") Siguiente
    el-button(@click="resetForm('person')") Resetear campos
</template>
