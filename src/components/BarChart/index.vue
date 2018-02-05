<template>
  <div :id="parentId" class="fit foreground">
      <div :id="chartId"></div>
  </div>
</template>

<script>
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
  data () {
    return {
      parentId: 'bar_chart_parent_' + Date.now(),
      chartId: 'bar_chart_' + Date.now(),
      range: 2,
      min: -1,
      max: 1,
      delta: 0.01,
      positiveColorEndPoint: [96, 255, 157, 1],
      negativeColorEndPoint: [255, 96, 96, 1]
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
    categorizedData () {
      return this.getBinData(this.tweetData, this.binRange)
    },
    categorizedDataFrequency () {
      return this.categorizedData.map(v => v.length)
    },
    dataFreqMin () {
      return Math.min(...this.categorizedDataFrequency)
    },
    dataFreqMax () {
      return Math.max(...this.categorizedDataFrequency)
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
    }
  },
  mounted () {
    let margin = 20
    let goldenRatio = 1.61803398875
    let chartWidth = document.getElementById(this.parentId).offsetWidth - (margin * 2)
    let chartHeight = chartWidth / goldenRatio
    // let barPadding = 2
    // let barWidth = (chartWidth / this.bin) - barPadding
    let yScale = d3.scaleLinear()
      .domain([this.dataFreqMin, this.dataFreqMax])
      .range([0, chartHeight])
    let xScale = d3.scaleBand()
      .domain([0, this.bin])
      .range([0, chartWidth])

    console.log(document.getElementById(this.parentId).offsetWidth)
    console.log(chartWidth)

    let svg = d3.select('#' + this.chartId)
      .style('position', 'relative')
      .style('width', chartWidth + 'px')
      .style('height', chartHeight + 'px')
      .style('top', margin + 'px')
      .style('left', margin + 'px')
      .style('right', margin + 'px')
      .style('background', 'white')

    svg.selectAll('rect')
      .data(this.categorizedDataFrequency)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(d))
      .attr('y', (d, i) => chartHeight)
      .attr('width', (d, i) => xScale.bandwidth())
      .attr('fill', (d, i) => this.colors[i])
      .attr('height', 0)
      .transition()
      .duration(1500)
      .attr('y', function (d, i) {
        return chartHeight - yScale(d)
      })
      .attr('height', function (d, i) {
        return yScale(d)
      })
  }
}
</script>

<style>

    .foreground{
        z-index: 999;
    }

</style>
