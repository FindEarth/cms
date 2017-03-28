<script>
  export default {
    data() {
      return {
        singleItems: ['home', 'profile'],
        subMenus: ['people', 'notifications'],
        defaultOpeneds: []
      };
    },

    methods: {
      getActive() {
        return this.$route.name;
      },
      handleSelect(key, keyPath) {
        if (this.subMenus.includes(key)) return;
        if (this.singleItems.includes(key)) {
          this.defaultOpeneds = [];
        }
        this.$router.push({ name: key });
      }
    }
  };
</script>

<template lang='pug'>
  section#left-menu
    el-menu.full-height(:default-active='getActive()', @select='handleSelect', :unique-opened='true', :default-openeds='defaultOpeneds')
      el-menu-item-group.group-custom(title='')
        el-menu-item(index='home')
          i.fa.fa-home.fa-lg
          | Dashboard
        el-submenu(index='people')
          template(slot='title')
            i.fa.fa-male.fa-lg
            | Personas
          el-menu-item-group(title='')
            el-menu-item(index='person-list') Perdidos
            el-menu-item(index='person-found') Encontrados
            el-menu-item(index='person-create') Nuevo
            el-menu-item(index='person-request-list') Solicitudes
        el-submenu(index='notifications')
          template(slot='title')
             i.fa.fa-bell-o.fa-lg
             | Notificaciones
          el-menu-item-group(title='')
            el-menu-item(index='') Lista
            el-menu-item(index='') Crear
        el-menu-item(index='profile')
          i.fa.fa-user.fa-lg
          | Perfil
    a.copyright(href='https://keepe.rs/', target='_blank')
      span.copyright-container
        span.hearth ❤
        |  Keepers
</template>

<style lang='scss'>
  @import "../../style/variables.scss";

  section#left-menu {
    position: relative;

    .full-height {
      height: $layout-height;
      background-color: $dark-grey;
      border-radius: 0;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }

    .el-menu-item {
      color: #a1a1a1;
      &.is-active {
        color: $white;
        background-color: $darker-grey;
      }
      &:hover {
        color: $white;
        background-color: $darker-grey;
      }
    }

    .el-submenu {
      .el-menu-item-group__title {
        padding: 0;
        height: 0;
      }
      .el-submenu__title {
        color: #a1a1a1;
      }
      .el-menu-item-group {
        background-color: $darker-grey;
      }
      .el-submenu__title {
        &:hover {
          color: $white;
          background-color: $darker-grey;
        }
      }
    }

    .copyright {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #a1a1a1;
      font-size: 14px;
      text-decoration: none;

      .copyright-container {
        .hearth {
          color: $red;
          margin-right: 2px;
          font-size: 15px;
          transition: all .3s ease;
        }

        &:hover {
          .hearth {
            font-size: 18px;
            position: relative;
            top: 1px;
            transition: all .3s ease;
          }
        }
      }
    }
  }
</style>
