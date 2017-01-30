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
      xAxisColor: {
        type: String,
        default: '#000',
        required: false
      },
      xAxisName: {
        type: String,
        required: true
      },
      xAxisLegend: {
        type: String,
        default: '',
        required: false
      },
      xAxisData: {
        type: Array,
        required: true
      },
      yAxisColor: {
        type: String,
        default: '#000',
        required: false
      },
      yAxisName: {
        type: String,
        required: true
      },
      yAxisLegend: {
        type: String,
        default: '',
        required: false
      },
      yAxisData: {
        type: Array,
        required: true
      },
      barColor: {
        type: Array,
        default: ['grey'],
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
          tooltip: {},
          xAxis: {
            axisLine: {
              lineStyle: {
                color: this.xAxisColor
              }
            },
            axisTick: {
              lineStyle: {
                color: this.xAxisColor
              }
            },
            nameTextStyle: {
              color: this.xAxisColor
            },
            name: this.xAxisLegend,
            data: this.xAxisData
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: this.yAxisColor
              }
            },
            axisTick: {
              lineStyle: {
                color: this.yAxisColor
              }
            },
            nameTextStyle: {
              color: this.yAxisColor
            },
            type:'value',
            name: this.yAxisLegend,
            data: this.yAxisData
          },
          color: this.barColor,
          series: [{
            name: `${this.xAxisName} : ${this.yAxisName}`,
            type: 'bar',
            data: this.data
          }]
        }
      };
    }
  });
</script>

<template lang='pug'>
  chart(:options="options", :style='`height:${height}px; width:${width}%`')
</template>
