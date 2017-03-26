<script>
  export default {
    data() {
      return {
        files: [],

        dialogImageUrl: '',
        dialogVisible : false
      };
    },

    methods: {
      onBeforeUpload(file) {
        // If false is returned, uploading will be aborted.
        // We are not handling uploading in this step

        const isJPG  = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        const fail = (message) => {
          this.$message.error({
            showClose: true,
            message
          });
          return false;
        };

        if (!isJPG) {
          return fail('El formato de imagen debe ser JPG');
        }
        if (!isLt2M) {
          return fail('El tamaño de imagen debe ser menor a 2MB');
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          this.files.push({
            name: file.name.split(' ').join('-'),
            data: reader.result,
            url : reader.result
          });
        };
        reader.readAsDataURL(file);
        return false;
      },

      onRemove(file) {
        const index = this.files.findIndex(f => f.name === file.name);
        console.log(index);
        this.files.splice(index, 1);
      },

      onPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible  = true;
      },

      onSubmit() {
        this.$emit('file-upload-submitted', this.files);
      }
    }
  };
</script>

<template lang='pug'>
  div
    .uploader
      el-upload(
        action='//jsonplaceholder.typicode.com/posts/',
        list-type='picture-card',
        :file-list='files',
        :multiple='true',
        :on-preview='onPreview',
        :on-remove='onRemove',
        :before-upload='onBeforeUpload'
      )
        i.el-icon-plus
      el-dialog(v-model='dialogVisible', size='tiny')
        img(width='100%', :src='dialogImageUrl')

    el-button(type='primary', @click='onSubmit') Siguiente
</template>

<style lang='scss'>
  .uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 60px;
  }

  .el-upload-list__item-status-label {
    display: none;
  }
</style>
