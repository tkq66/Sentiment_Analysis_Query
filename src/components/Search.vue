<template>
    <div class="absolute full-height full-width">
        <div class="row full-height">
            <div class="layout-padding">
                <q-search v-model="search" />
            </div>
        </div>
    </div>
</template>

<script>
import {
  QSearch
} from 'quasar'

export default {
  name: 'Search',
  components: {
    QSearch
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {},
  methods: {}
}
</script>

<style>
</style>
