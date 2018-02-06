<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        <div class="row">
            <div class="col">PIE-CHART</div>
            <bar-chart class="col" :tweetData="sentimentTweets" @click="showTweets"></bar-chart>
        </div>
    </div>
</template>

<script>
import {
  Loading,
  QSpinnerGrid
} from 'quasar'
import { Analysis } from 'src/api'
import BarChart from './BarChart'

export default {
  name: 'Result',
  props: [
    'searchText'
  ],
  components: {
    BarChart
  },
  data () {
    return {
      isFilterNeutral: true,
      sentimentTweets: []
    }
  },
  methods: {
    showTweets (d) {
    },
    setData (data) {
      if (this.isFilterNeutral) {
        this.sentimentTweets = data.filter(d => d.polarity !== 0)
      }
      else {
        this.sentimentTweets = data
      }
    }
  },
  created () {
    Loading.show({
      spinner: QSpinnerGrid,
      message: 'Analyzing twitter sentiments...'
    })
    let self = this
    Analysis.get({ query_phrase: this.searchText })
      .then(
        response => {
          self.setData(response.body)
          Loading.hide()
        }
      )
      .catch(
        error => {
          console.log(error)
          Loading.hide()
        }
      )
  }
}
</script>

<style>

    .background{
        z-index: 0;
    }

    .foreground{
        z-index: 999;
    }

</style>
