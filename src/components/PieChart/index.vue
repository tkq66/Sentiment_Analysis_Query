<template>
  <div :id="parentId" class="fit foreground">
      <q-card color="grey-7">
          <q-card-main>
              <div :id="chartId"></div>
          </q-card-main>
      </q-card>
  </div>
</template>

<script>
import {
  QCard,
  QCardMain
} from 'quasar'
import colormap from 'colormap'
import * as d3 from 'd3'

export default {
  name: 'BarChart',
  props: {
    tweetData: {
      type: Array,
      required: true
    }
  },
  components: {
    QCard,
    QCardMain
  },
  data () {
    return {
      parentId: 'pie_chart_parent_' + Date.now(),
      backgroundId: 'pie_chart_background' + Date.now(),
      chartId: 'pie_chart_' + Date.now(),
      categories: 3,
      negativeCategory: 'Negative',
      neutralCategory: 'Neutral',
      positiveCategory: 'Positive',
      positiveColorEndPoint: [96, 255, 157, 1],
      negativeColorEndPoint: [255, 96, 96, 1],
      margin: { top: 10, left: 20, bottom: 10, right: 10 },
      goldenRatio: 1.61803398875,
      isReadyToPlot: false
    }
  },
  computed: {
    colors () {
      return colormap({
        colormap: [
          { index: 0, rgb: this.negativeColorEndPoint },
          { index: 1, rgb: this.positiveColorEndPoint }
        ],
        nshades: this.categories,
        format: 'hex'
      })
    },
    categoriesCount () {
      return this.countDataPoints(this.tweetData)
    },
    categorizedPercentageData () {
      return [
        {
          label: this.positiveCategory,
          value: this.categoriesCount[2]
        },
        {
          label: this.neutralCategory,
          value: this.categoriesCount[1]
        },
        {
          label: this.negativeCategory,
          value: this.categoriesCount[0]
        }
      ]
    }
  },
  watch: {
    categorizedPercentageData (newVal, oldVal) {
      this.plot(newVal)
    }
  },
  methods: {
    getColorFromCategory (category) {
      return (category === this.positiveCategory)
        ? this.colors[2]
        : ((category === this.negativeCategory)
          ? this.colors[0]
          : this.colors[1])
    },
    categorizeDataPoints (data) {
      return data.map(v => this.getCategoryFromVal(v['polarity']))
    },
    countDataPoints (data) {
      return this.categorizeDataPoints(data).reduce(this.incrementDataPoint, new Array(this.categories).fill(0))
    },
    incrementDataPoint (result, value, index, array) {
      result[this.getCategoryIndexFromVal(value)] += 1
      return result
    },
    getCategoryFromVal (val) {
      return (val > 0)
        ? this.positiveCategory
        : ((val < 0)
          ? this.negativeCategory
          : this.neutralCategory)
    },
    getCategoryIndexFromVal (val) {
      return (val === this.positiveCategory)
        ? 2
        : ((val === this.negativeCategory)
          ? 0
          : 1)
    },
    getTweetsFromCategory (category) {
      return this.tweetData.filter(tweet => (category === this.positiveCategory)
        ? (tweet['polarity'] > 0)
        : ((category === this.negativeCategory)
          ? (tweet['polarity'] < 0)
          : (tweet['polarity'] === 0)))
    },
    plot (dataList) {
      if (!this.isReadyToPlot) {
        return
      }

      // Set the height as half of its parent
      let width = document.querySelector('#' + this.chartId).clientWidth
      let height = (document.querySelector('#' + this.parentId).parentElement.parentElement.clientHeight / 2) - (this.margin.top + this.margin.bottom)
      let chartWidth = width - (this.margin.left + this.margin.right)
      let chartHeight = height - (this.margin.top + this.margin.bottom)
      let radius = height / 2
      d3.select('#' + this.chartId)
        .style('height', height + 'px')

      let dataArcs = d3.pie()
        .value(d => d.value)(this.categorizedPercentageData)
      let arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

      let svg = d3.select('#' + this.chartId).append('svg')
        .attr('width', width)
        .attr('height', height)
      let chartLayer = svg.append('g')
        .classed('chartLayer', true)
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('transform', 'translate(' + [width / 2, radius] + ')')

      let path = chartLayer.selectAll('path')
        .data(dataArcs)
      path.exit()
        .remove()
      path.enter()
        .append('path')
        .attr('fill', d => this.getColorFromCategory(d.data.label))
        .on('click', (d, i) => {
          this.$emit('click',
            {
              data: this.getTweetsFromCategory(d.data.label),
              label: d.data.label + ' ' + d.data.value + '%'
            })
        })
        .transition()
        .duration(1000)
        .attrTween('d', d => {
          let i = d3.interpolate(d.startAngle + 0.1, d.endAngle)
          return t => {
            d.endAngle = i(t)
            return arc(d)
          }
        })
    }
  },
  mounted () {
    this.isReadyToPlot = true
  }
}
</script>

<style>

    .foreground{
        z-index: 999;
    }

</style>
