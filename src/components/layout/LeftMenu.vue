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
  el-menu.full-height(mode='vertical', default-active='home', @select='handleSelect')
    el-menu-item-group.group-custom(title='General')
      el-menu-item(index='home')
        i.fa.fa-home.fa-lg
        | Dashboard
    el-menu-item-group.group-custom(title='Personas')
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

    el-menu-item-group.group-custom(title='Notificaciones')
      el-menu-item(index='6')
        i.fa.fa-bell-o.fa-lg
        | Lista
      el-menu-item(index='7')
        i.fa.fa-plus.fa-lg
        | Nuevo

    el-menu-item-group.group-custom(title='Configuracion')
      el-menu-item(index='8')
        i.fa.fa-user.fa-lg
        | Perfil
</template>

<style lang='scss' scoped>
  @import "../../style/variables.scss";

  .full-height {
    height: $layout-height;
    background-color: $dark-grey;
    border-radius: 0;
  }

  .el-menu-item-group {
    .el-menu-item {
      color: #a1a1a1;

      &.is-active {
        color: $white;
      }

      &:hover {
        color: $white;
        background-color: $dark-grey;
      }
    }
  }
</style>
