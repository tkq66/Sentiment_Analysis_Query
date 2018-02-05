<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        {{ searchText }}
    </div>
</template>

<script>
import {
  Loading,
  QSpinnerGrid
} from 'quasar'
import { Analysis } from 'src/api'
import colormap from 'colormap'

export default {
  name: 'Result',
  props: [
    'searchText'
  ],
  data () {
    return {
      positiveSentimentTweets: [],
      neutralSentimentTweets: [],
      negativeSentimentTweets: []
    }
  },
  computed: {},
  methods: {},
  created () {
    let colors = colormap({
      colormap: [
        {
          index: 0,
          rgb: [96, 255, 157, 1]
        },
        {
          index: 1,
          rgb: [255, 96, 96, 1]
        }
      ],
      nshades: 50,
      format: 'hex'
    })
    console.log(colors)
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
</style>
