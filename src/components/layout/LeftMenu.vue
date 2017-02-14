<script>
  export default {
    data() {
      return {
      };
    },

    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({ name: key });
      }
    }
  };
</script>

<template lang='pug'>
  el-menu(mode='vertical', default-active='1', @select='handleSelect')
    el-menu-item-group(title='General')
      el-menu-item(index='home')
        i.fa.fa-home.fa-lg
        | Dashboard
    el-menu-item-group(title='Personas')
      el-menu-item(index='person-list')
        i.fa.fa-male.fa-lg
        | Perdidos
      el-menu-item(index='person-found')
        i.fa.fa-male.fa-lg
        | Encontrados
      el-menu-item(index='person-create')
        i.fa.fa-plus.fa-lg
        | Nuevo
      el-menu-item(index='person-request-list')
        i.fa.fa-question.fa-lg
        | Solicitudes

    el-menu-item-group(title='Notificaciones')
      el-menu-item(index='6')
        i.fa.fa-bell-o.fa-lg
        | Lista
      el-menu-item(index='7')
        i.fa.fa-plus.fa-lg
        | Nuevo

    el-menu-item-group(title='Configuracion')
      el-menu-item(index='8')
        i.fa.fa-user.fa-lg
        | Perfil
</template>

<style lang='scss' scoped>
</style>
