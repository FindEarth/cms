<script>

import barChart from 'components/shared/barChart';
import pieChart from 'components/shared/pieChart';
import counter  from 'components/shared/counter';

export default {

  components: {
    barChart,
    pieChart,
    counter
  },

  data() {

    return {
      missingByAge: {
        xAxisData: [10, 11, 12, 14, 15, 18, 20, 24, 25, 28, 30, 36, 40, 48, 52, 60, 80, 85, 90, 92],
        yAxisData: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        data: [4, 43, 12, 1, 5, 6, 20, 13, 80, 5, 4, 43, 12, 1, 5, 6, 20, 13, 80, 5],
        title: {
          x: 'center',
          text: 'Desaparecidos por Edad',
          textStyle: {
            color: '#333c44',
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue'
          }
        }
      },
      missingByGender: {
        data: [{
          value: 335,
          name: 'Hombres'
        }, {
          value: 310,
          name: 'Mujeres'
        }],
        title: {
          x: 'center',
          text: 'Desaparecidos por Género',
          textStyle: {
            color: '#333c44',
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue'
          }
        }
      },
      missingByType: {
        data: [{
          value: 135,
          name: 'Mayores'
        }, {
          value: 310,
          name: 'Menores'
        }],
        title: {
          x: 'center',
          text: 'Desaparecidos por Tipo',
          textStyle: {
            color: '#333c44',
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue'
          }
        }
      },
      missingPeople: 188,
      foundPeople: 57
    };
  }
};
</script>

<template lang='pug'>
  .container
    el-row.chart-row
      el-col(:span='24')
        .grid-content.chart-wrapper.full
          barChart(
            :width='100',
            :height='300',
            :title='missingByAge.title',
            :animationDuration='2000',
            xAxisColor='#333c44',
            xAxisName='Edad',
            xAxisLegend='Edad',
            yAxisColor='#333c44',
            yAxisName='Desaparecidos',
            yAxisLegend='Desaparecidos',
            :barColor='["#00bcd4"]',
            :xAxisData='missingByAge.xAxisData',
            :yAxisData='missingByAge.yAxisData',
            :data='missingByAge.data'
          )
    el-row.chart-row
      el-col(:span='8')
        .grid-content.chart-wrapper.full
          pieChart(
            :width='100',
            :height='300',
            :title='missingByGender.title',
            :animationDuration='2000',
            :colors='["#333c44", "#00bcd4"]',
            legendOrient='vertical',
            :legendDistanceFromTop='40',
            legendFormatter='{name}',
            :legendData='["Mujeres", "Hombres"]',
            :chartPosition='["50%", "60%"]',
            :data='missingByGender.data'
          )
      el-col(:span='8')
        .grid-content.chart-wrapper.full
          pieChart(
            :width='100',
            :height='300',
            :title='missingByType.title',
            :animationDuration='2000',
            :colors='["#333c44", "#00bcd4"]',
            legendOrient='vertical',
            :legendDistanceFromTop='40',
            legendFormatter='{name} de 18 años',
            :legendData='["Menores", "Mayores"]',
            :chartPosition='["50%", "60%"]',
            :data='missingByType.data'
          )
      el-col(:span='8')
        el-row(:span='12')
          .grid-content.chart-wrapper.half
            h3(class='counter-title') Personas Encontradas
            p(class='number found')
              counter(:limitToReach='missingPeople', :animationDuration='260')
        el-row(:span='12')
          .grid-content.chart-wrapper.half
            h3(class='counter-title') Personas Desaparecidas
            p(class='number lost')
              counter(:limitToReach='foundPeople', :animationDuration='260')
</template>

<style lang='scss' scoped>
@import "../../../style/variables.scss";

$chart-height: 300px;

.container {
  margin: -15px;

  .echarts {
    height: 300px;
    width: 100%;
  }

  .chart-row {
    .chart-wrapper {
      margin: 15px;
      box-shadow: 0 0 2px rgba(0,0,0,.15);
      background-color: $white;
      padding: 10px;
      border-radius: 3px;

      &.full {
        height: $chart-height;
        box-sizing: border-box;
      }

      &.half {
        height: $chart-height * 0.45;
        box-sizing: border-box;
      }

      .number {
        text-align: center;
        font-size: 40px;
        margin-top: 20px;
        transition: transform .2s ease;

        &:hover {
          transform: scale(1.2);
          cursor: pointer;
          transition: transform .2s ease;
        }

        &.found {
          color: $lightBlue;
        }

        &.lost {
          color: $dark-grey;
        }
      }

      .counter-title {
        font-weight: normal;
        margin: 0;
        text-align: center;
        color: #333c44;
        margin-top: 4px;
        font-size: 19px;
      }
    }
  }
}
</style>
