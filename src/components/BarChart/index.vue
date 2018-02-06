<template>
  <div :id="parentId" class="fit layout-padding foreground">
      <q-card color="grey-7">
          <q-card-main>
              <div :id="chartId"></div>
          </q-card-main>
      </q-card>
      </div>
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
    bin: {
      type: Number,
      default: 72
    },
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
      parentId: 'bar_chart_parent_' + Date.now(),
      backgroundId: 'bar_chart_background' + Date.now(),
      chartId: 'bar_chart_' + Date.now(),
      range: 2,
      min: -1,
      max: 1,
      delta: 0.01,
      positiveColorEndPoint: [96, 255, 157, 1],
      negativeColorEndPoint: [255, 96, 96, 1],
      margin: { top: 5, left: 5, bottom: 5, right: 5 },
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
        nshades: this.bin,
        format: 'hex'
      })
    },
    binRange () {
      let step = this.range / this.bin
      return [...Array(this.bin + 1).keys()]
        .reduce((result, value, index, array) =>
          result
            .concat([array
              .slice(index, index + 2)
              .map(v => this.min + (step * v))])
          , [])
        .splice(0, this.bin)
    },
    binRangeLabel () {
      return this.binRange.map(range =>
        range.map(endPoint =>
          endPoint.toFixed(2))
          .join('-'))
    },
    categorizedData () {
      return this.getBinData(this.tweetData, this.binRange)
    },
    categorizedDataFrequency () {
      return this.categorizedData
        .map(bin => bin.length)
        .map((binCount, i) => ({ bin: this.binRangeLabel[i], count: binCount }))
    }
  },
  watch: {
    categorizedDataFrequency (newVal, oldVal) {
      if (!this.isReadyToPlot) {
        return
      }
      this.plot(newVal)
    }
  },
  methods: {
    getBinData (data, binSrc) {
      return this.getBinCategorizedData(data, binSrc)
        .reduce((result, value, index, array) => {
          // Initialize a local list reference
          if (result[value].length === 0) {
            result[value] = []
          }
          result[value].push(data[index])
          return result
        }, new Array(binSrc.length).fill([]))
    },
    getBinCategorizedData (data, binSrc) {
      return data.map(value => this.getValueBinIndex(value['polarity'], binSrc))
    },
    getValueBinIndex (value, binSrc) {
      return binSrc
        .findIndex((binRange, index) =>
          this.isValueInRange(value,
            binRange[1],
            binRange[0],
            index,
            (binSrc.length - 1),
            0))
    },
    isValueInRange (value, max, min, index, maxIndex, minIndex) {
      return ((index === minIndex) && (value < max)) ||
             ((index === maxIndex) && (value > min)) ||
             ((value >= min) && (value < max))
    },
    plot (data) {
      let width = document.querySelector('#' + this.chartId).clientWidth
      let height = (width / this.goldenRatio) + (this.margin.top + this.margin.top)
      d3.select('#' + this.chartId)
        .style('height', height + 'px')

      let chartWidth = width - (this.margin.left + this.margin.right)
      let chartHeight = chartWidth / this.goldenRatio

      let xScale = d3.scaleBand()
        .domain(data.map(d => d.bin))
        .range([0, chartWidth])
      let yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.count), d3.max(data, d => d.count)])
        .range([chartHeight, 0])
      let transition = d3.transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .on('start', d => { console.log('transition begin') })
        .on('end', d => { console.log('transition end') })

      let svg = d3.select('#' + this.chartId).append('svg')
        .attr('width', width)
        .attr('height', height)
      let chartLayer = svg.append('g')
        .classed('chartLayer', true)
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('transform', 'translate(' + [this.margin.left, this.margin.top] + ')')
      let bar = chartLayer.selectAll('.bar').data(data)
      bar.exit()
        .remove()
      bar.enter()
        .append('rect')
        .classed('bar', true)
        .merge(bar)
        .attr('fill', (d, i) => this.colors[i])
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('transform', d => 'translate(' + [xScale(d.bin), chartHeight] + ')')
      chartLayer.selectAll('.bar')
        .transition(transition)
        .attr('height', d => chartHeight - yScale(d.count))
        .attr('transform', d => 'translate(' + [xScale(d.bin), yScale(d.count)] + ')')
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
