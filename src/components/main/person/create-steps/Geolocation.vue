<script>
  export default {
    props: {
      geo: {
        type: Object,
        default: () => ({
          loc        : [],
          address    : '',
          city       : '',
          postalCode : '',
          countryCode: '',
          country    : ''
        })
      }
    },

    data() {
      return {
        radius: 1000,
        center: { lat: this.geo.loc[1] || -34.603684, lng: this.geo.loc[0] || -58.381559 },
        marker: {
          position: { lat: this.geo.loc[1] || -34.603684, lng: this.geo.loc[0] || -58.381559 }
        },
        isFormValid: true
      };
    },

    methods: {
      formatGeo(marker, type, format) {
        const ac = marker.address_components.find(i => i.types[0] === type);
        if (!ac) { return null; }
        return ac[`${format}_name`];
      },

      onPlaceChange(marker) {
        const lat = marker.geometry.location.lat();
        const lng = marker.geometry.location.lng();

        this.center = { lat, lng };

        this.marker.position.lat = lat;
        this.marker.position.lng = lng;

        this.geo.address     = marker.formatted_address;
        this.geo.country     = this.formatGeo(marker, 'country', 'long');
        this.geo.countryCode = this.formatGeo(marker, 'country', 'short');
        this.geo.city        = this.formatGeo(marker, 'administrative_area_level_1', 'long');
        this.geo.postalCode  = this.formatGeo(marker, 'postal_code', 'short');
        this.geo.loc         = [lng, lat];
      },

      onSubmit() {
        if (!this.geo.address) {
          this.isFormValid = false;
          this.watchAddressChange();
          return;
        }

        this.$emit('gelocation-submitted', this.geo);
      },

      watchAddressChange() {
        this.$watch('geo.address', (nv) => {
          if (nv) {
            this.isFormValid = true;
          }
        });
      }
    }
  };
</script>

<template lang='pug'>
  el-form(label-width='85px')

    el-form-item(label='Direccion')
      .el-input.input-map
        gmap-place-input(
          class-name='el-input__inner',
          placeholder='Direccion',
          :select-first-on-enter='true',
          :default-place='geo.address',
          @place_changed='onPlaceChange'
        )

    el-form-item(label='Radio')
      el-input-number(v-model='radius', :min='100', :max='5000', :step='100')

    gmap-map.map(:center='center', :zoom='14')
      gmap-marker(
        :position='marker.position',
        :clickable='true',
        :draggable='true',
        @click='center=marker.position'
      )
      gmap-circle(
        :center='marker.position',
        :radius='radius',
        :draggable='true'
      )

    el-button-group
      el-button(type='primary', @click='$emit("step-back")') Atras
      el-button(type='primary', :disabled='!isFormValid' @click='onSubmit') Siguiente
</template>

<style lang='scss' scoped>
  .map {
    height: 400px;
    margin: initial;
    margin-bottom: 20px;
  }
</style>
