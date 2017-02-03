<script>
  import personService from 'services/person';
  import { Loading } from 'element-ui';

  export default {
    components: { Loading },

    data() {
      return {
        person: {},
        isLoading: false,
        loadingInstance: {}
      };
    },

    mounted() {
      this.isLoading = true;
      this.loadingInstance = Loading.service({ fullscreen: true });
      this.getPerson(this.$route.params.personId);
    },
    route: {
      data: ({ to: { params: { personId } } } ) => ({
        person: personService.get(personId)
      })
    },
    methods: {
      getPerson(personId) {
        personService.getById(personId)
          .then((person) => {
            this.person = person;
            this.isLoading = false;
            this.loadingInstance.close();
            console.log(this.person.name);
          });
      }
    }
  };
</script>

<template lang='pug'>
  <el-row :gutter="20" align="middle">
    <el-col :span="5"></div>
      <el-card :body-style="{ padding: '0px' }">
        <img src="http://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg" class="image">
        <div style="padding: 14px;">
          <span>{{ person.name }}</span>
          <div class="bottom clearfix">
            <time class="time"> Corrientes, Argentina</time>
            <el-button type="text" class="button">Share buttons</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">{{ person.name }}</span>
          <el-button style="float: right;" type="primary">Encontrado</el-button>
        </div>
        <div  class="text item">
          <el-card class="message">
            <div slot="header" class="clearfix header-message">
              <span style="line-height: 36px;">Apariencia</span>
            </div>
            <div  class="text item" v-if='person.description && person.description.appearance'>
            <span>{{ person.description.appearance }}</span>
            </div>
          </el-card>
          <el-card class="message">
            <div slot="header" class="clearfix header-message">
              <span style="line-height: 36px;">Vestimenta</span>
            </div>
            <div  class="text item" v-if='person.description && person.description.clothing'>
            <span>{{ person.description.clothing }}</span>
            </div>
          </el-card>
          <el-card class="message">
            <div slot="header" class="clearfix header-message">
              <span style="line-height: 36px;">Contactos</span>
            </div>
            <div  class="text item" v-show='person.contacts && person.contacts.length'>
              el-table(:data='person.contacts', border='', style='width: 100%')
                el-table-column(fixed='', prop='name', label='Nombre')
                el-table-column(prop='phone', label='Telefono')
                el-table-column(prop='email', label='Email')
            </div>
          </el-card>
        </div>
        </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
    background: white;
    margin-left: 0 ! important;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .image {
    width: 100%;
    display: block;
  }
   .clearfix:before,
   .clearfix:after {
       display: table;
       content: "";
   }

   .clearfix:after {
       clear: both
   }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .person-info {
    background: white;
    border: solid 1px #e5e9f2;
  }
  .message {
    margin-bottom: 10px;
  }
  .header-message {

  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
  }
  .apariencia {
    width: 200px;
  }
</style>
