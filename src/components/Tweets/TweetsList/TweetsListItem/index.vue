<template>
    <q-item separator multiline>
        <q-item-side :avatar="userImgUrl" />
        <q-item-main class="text-black" :label="displayUserName" label-lines="1" :sublabel="tweetText"/>
        <q-item-side right :stamp="displayDate" />
    </q-item>
</template>

<script>
import {
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'

export default {
  name: 'TweetsListItem',
  props: {
    tweet: {
      type: Object,
      default: {}
    }
  },
  components: {
    QItem,
    QItemSide,
    QItemMain
  },
  data () {
    return {
    }
  },
  computed: {
    tweetId () {
      return this.tweet.id
    },
    timestamp () {
      return this.tweet.timestamp
    },
    userHandle () {
      return this.tweet.user_handle
    },
    userName () {
      return this.tweet.user_name
    },
    userImgUrl () {
      return 'https://avatars.io/twitter/' + this.userHandle
    },
    userUrl () {
      return 'https://twitter.com/' + this.userHandle
    },
    tweetUrl () {
      return this.userUrl + '/status/' + this.tweetId
    },
    displayDate () {
      let dateList = this.timestamp.split(' ')
      return dateList[1] + ' ' + dateList[2]
    },
    displayUserName () {
      return '<a href="' + this.userUrl + '" style="text-decoration : none; color : #000000;">' +
        '   <b>' +
                this.userName +
        '   </b>' +
        ' ' +
        '   <span class="handle">' +
                '@' + this.userHandle +
        '   </span>'
    },
    tweetText () {
      return '<a href="' + this.tweetUrl + '" style="text-decoration : none; color : #000000;">' +
        '   <div>' +
                this.tweet.text +
        '   </div>' +
        '</a>'
    }
  }
}
</script>

<style>

    .handle{
        font-size: 0.95em;
        color: rgba(0,0,0,0.54);
    }

</style>
