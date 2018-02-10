<template>
  <q-list highlight class="bg-white">
      <q-list-header>{{ header }}</q-list-header>
      <tweets-list-item :tweet="tweet" :key="tweet.id" v-for="tweet in tweetData"></tweets-list-item>
  </q-list>
</template>

<script>
import {
  QList,
  QListHeader
} from 'quasar'
import TweetsListItem from './TweetsListItem'

export default {
  name: 'TweetsList',
  props: {
    header: {
      type: String,
      default: 'None selected'
    },
    tweetData: {
      type: Array,
      default: []
    }
  },
  components: {
    QList,
    QListHeader,
    TweetsListItem
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
