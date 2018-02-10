<template>
  <q-layout ref="layout" view="hhh lpr fff" class="hide-scroll bg-grey-8">

      <q-toolbar slot="header" color="grey-10">
        <q-toolbar-title>
            Sentiment Analysis Query
        </q-toolbar-title>
      </q-toolbar>

      <router-view></router-view>

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

    .hide-scroll{
        overflow: hidden;
    }

</style>
