<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        <div class="row">
            <div class="col">PIE-CHART</div>
            <bar-chart class="col" :tweetData="sentimentTweets"></bar-chart>
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
      positiveSentimentTweets: [],
      neutralSentimentTweets: [],
      negativeSentimentTweets: [],
      sentimentTweets: []
    }
  },
  computed: {},
  methods: {},
  created () {
    Loading.show({
      spinner: QSpinnerGrid,
      message: 'Analyzing twitter sentiments...'
    })
    let self = this
    Analysis.get({ query_phrase: this.searchText })
      .then(
        response => {
          self.positiveSentimentTweets = response.body['1']
          self.neutralSentimentTweets = response.body['0']
          self.negativeSentimentTweets = response.body['-1']
          self.sentimentTweets = self.positiveSentimentTweets.concat(self.neutralSentimentTweets.concat(self.negativeSentimentTweets))
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
