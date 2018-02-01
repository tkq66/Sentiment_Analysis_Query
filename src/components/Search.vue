<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        <div class="row full-height">
            <div class="layout-padding">
                <q-search inverted class="search-fade larger" color="grey-9" v-model="search" />
            </div>
        </div>
    </div>
</template>

<script>
import { QSearch } from 'quasar'

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

    .search-fade{
        opacity: 0.5;
    }

    .larger{
        font-size: 2em;
    }

    input{
        height: auto !important;
    }

</style>
