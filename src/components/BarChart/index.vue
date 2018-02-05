<template>
  <div>
      {{ categorizedDataFrequency }}
  </div>
</template>

<script>
import colormap from 'colormap'

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
      valueRange: [],
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
  created () {
  }
}
</script>

<style>
</style>
