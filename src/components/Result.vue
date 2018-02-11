<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        <div class="row text-white justify-center search-title">{{ searchText }}</div>
        <div class="row fit analytics-results layout-padding">
            <div class="col">
                <div class="row">
                    <pie-chart :tweetData="sentimentTweets" @click="showPieChartTweets"></pie-chart>
                    <tweets class="col" :tweetData="pieChartTweets" :header="pieChartTitle" :boxHeight="226"></tweets>
                </div>
            </div>
            <div class="col bar-chart-result">
                <div class="row">
                    <bar-chart :tweetData="sentimentTweets" @click="showBarChartTweets"></bar-chart>
                    <tweets class="col" :tweetData="barChartTweets" :header="barChartTitle"></tweets>
                </div>
            </div>
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
import PieChart from './PieChart'
import Tweets from './Tweets'

export default {
  name: 'Result',
  props: [
    'searchText'
  ],
  components: {
    BarChart,
    PieChart,
    Tweets
  },
  data () {
    return {
      isFilterNeutral: true,
      pieChartTweets: [],
      pieChartTitle: 'None selected',
      barChartTweets: [],
      barChartTitle: 'None selected',
      sentimentTweets: []
    }
  },
  methods: {
    showBarChartTweets (d) {
      this.barChartTweets = d.data
      this.barChartTitle = d.label
    },
    showPieChartTweets (d) {
      this.pieChartTweets = d.data
      this.pieChartTitle = d.label
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

    .search-title{
        padding: 20px;
        font-size: 5em;
    }

    .analytics-results{
        padding-top: 0px !important;
    }

    .bar-chart-result{
        height: 100%;
    }

    .q-loading{
      z-index: 1000;
    }

</style>
