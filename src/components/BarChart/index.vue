<template>
  <div>
      {{ tweetData }}
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
      colors: [],
      positiveColorEndPoint: [96, 255, 157, 1],
      negativeColorEndPoint: [255, 96, 96, 1]
    }
  },
  created () {
    this.colors = colormap({
      colormap: [
        { index: 0, rgb: this.negativeColorEndPoint },
        { index: 1, rgb: this.positiveColorEndPoint }
      ],
      nshades: this.bin,
      format: 'hex'
    })
  }
}
</script>

<style>
</style>
