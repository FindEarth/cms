<script>

  import chart from 'vue-echarts';

  // Vue echarts wrapper https://github.com/Justineo/vue-echarts
  // For more chart properties refer to https://ecomfe.github.io/echarts-doc/public/en/option.html

  export default ({
    props: {
      width: {
        type: Number,
        default: 100,
        required: false
      },
      height: {
        type: Number,
        default: 300,
        required: false
      },
      title: Object,
      animationDuration: {
        type: Number,
        default: 1000,
        required: false
      },
      colors: {
        type: Array,
        required: true
      },
      legendOrient: {
        type: String,
        default: 'vertical',
        required: false
      },
      legendDistanceFromTop: {
        type: Number,
        default: 0,
        required: false
      },
      legendData: {
        type: Array,
        required: true
      },
      legendFormatter: {
        type: String,
        default: '{name}',
        required: false
      },
      chartPosition: {
        type: Array,
        default: ['50%', '50%'],
        required: false
      },
      data: {
        type: Array,
        required: true
      }
    },

    components: {
      chart
    },

    data() {

      return {
        options: {
          title: this.title,
          animationDuration: this.animationDuration,
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          color: this.colors,
          legend: {
            orient: this.legendOrient,
            top: this.legendDistanceFromTop,
            left: 'left',
            data: this.legendData,
            formatter: this.legendFormatter
          },
          series: [{
            type: 'pie',
            radius: '55%',
            center: this.chartPosition,
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
      };
    }
  });
</script>

<template lang='pug'>
  chart(:options="options", :style='`height:${height}px; width:${width}%`')
</template>
