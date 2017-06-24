<script>
import personService from 'services/person'
import barChart from 'components/shared/barChart'
import pieChart from 'components/shared/pieChart'
import counter from 'components/shared/counter'

export default {

  components: {
    barChart,
    pieChart,
    counter
  },

  data () {
    return {
      missingByAge: {
        xAxisData: [],
        yAxisData: [],
        data: [],
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
        data: [],
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
      missingPeople: 0,
      foundPeople: 0
    }
  },

  mounted () {
    Promise.all([
      personService.getStatsByGender(),
      personService.getStatsByAge(),
      personService.getTotalCount(),
      personService.getFoundCount()
    ])
    .then(([gender, age, totalCount, foundCount]) => {
      this.missingByGender.data.push(...gender)

      this.missingByAge.data.push(...age.map(s => s.total))
      this.missingByAge.xAxisData.push(...age.map(s => s._id))

      this.missingPeople = totalCount
      this.foundPeople = foundCount
    })
  }
}
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
            h3(class='counter-title') Personas Desaparecidas
            p(class='number found') {{ missingPeople }}
              //- counter(:limitToReach='missingPeople', :animationDuration='260')
        el-row(:span='12')
          .grid-content.chart-wrapper.half
            h3(class='counter-title') Personas Encontradas
            p(class='number lost') {{ foundPeople }}
              //- counter(:limitToReach='foundPeople', :animationDuration='260')
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
