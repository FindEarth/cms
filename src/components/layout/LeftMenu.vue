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
  el-menu.el-menu-vertical-demo(mode='vertical', default-active='1', @select='handleSelect')
    el-menu-item-group(title='General')
      el-menu-item(index='1')
        i.el-icon-message
        | Dashboard
    el-menu-item-group(title='Personas')
      el-menu-item(index='person-list')
        i.el-icon-message
        | Perdidos
      el-menu-item(index='3')
        i.el-icon-message
        | Encontrados
      el-menu-item(index='person-create')
        i.el-icon-message
        | Nuevo
      el-menu-item(index='5')
        i.el-icon-message
        | Solicitudes

    el-menu-item-group(title='Notificaciones')
      el-menu-item(index='6')
        i.el-icon-message
        | Lista
      el-menu-item(index='7')
        i.el-icon-message
        | Nuevo

    el-menu-item-group(title='Configuracion')
      el-menu-item(index='8')
        i.el-icon-message
        | Perfil
</template>

<style lang='scss' scoped>
</style>
