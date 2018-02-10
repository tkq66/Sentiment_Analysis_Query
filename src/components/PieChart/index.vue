<template>
  <div :id="parentId" class="fit foreground">
      <q-card color="grey-7">
          <q-card-main>
              <div :id="chartId">{{ categorizedPercentageData }}</div>
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
// import * as d3 from 'd3'

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
          value: (100 * this.categoriesCount[2] / this.tweetData.length).toFixed(2)
        },
        {
          label: this.neutralCategory,
          value: (100 * this.categoriesCount[1] / this.tweetData.length).toFixed(2)
        },
        {
          label: this.negativeCategory,
          value: (100 * this.categoriesCount[0] / this.tweetData.length).toFixed(2)
        }
      ]
    }
  },
  watch: {
    categorizedDataFrequency (newVal, oldVal) {
      this.plot(newVal)
    }
  },
  methods: {
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
      return (val > 0) ?
        this.positiveCategory :
          ((val < 0) ?
            this.negativeCategory :
            this.neutralCategory)
    },
    getCategoryIndexFromVal (val) {
      return (val === this.positiveCategory) ?
        2 :
          ((val === this.negativeCategory) ?
            0 :
            1)
    },
    getTweetsFromCategory (category) {
      return this.tweetData.filter(tweet => (category === this.positiveCategory) ?
        (tweet['polarity'] > 0) :
          ((category === this.negativeCategory) ?
            (tweet['polarity'] < 0) :
            (tweet['polarity'] === 0)))
    },
    plot (data) {

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
