<template>
  <div class="fit foreground">
      <q-card color="fit bg-grey-7">
          <q-card-main>
              <q-scroll-area class="tweet-box" :style="{ height: boxHeight+ 'px' }">
                  <tweets-list :tweetData="tweetData" :header="header"></tweets-list>
              </q-scroll-area>
          </q-card-main>
      </q-card>
  </div>
</template>

<script>
import {
  QCard,
  QCardMain,
  QScrollArea
} from 'quasar'
import TweetsList from './TweetsList'

export default {
  name: 'Tweets',
  props: {
    boxHeight: {
      type: Number,
      default: 270
    },
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
    QCard,
    QCardMain,
    QScrollArea,
    TweetsList
  },
  data () {
    return {
    }
  }
}
</script>

<style>

    .foreground{
        z-index: 999;
    }

    .tweet-box{
        width: 100%;
    }

</style>
