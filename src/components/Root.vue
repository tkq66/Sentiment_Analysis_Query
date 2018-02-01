<template>
  <q-layout ref="layout" view="hhh lpr fff">

      <q-toolbar slot="header">
        <q-toolbar-title>
            Sentiment Analysis Query
        </q-toolbar-title>
      </q-toolbar>

      <router-view></router-view>

      <!-- <div class="col justify-center">
        <div class="">
          <q-search v-model="search" />
        </div>
      </div> -->

  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle
} from 'quasar'

export default {
  name: 'Root',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus">
</style>
