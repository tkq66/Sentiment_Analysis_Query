<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        <div class="row justify-center items-center full-height">
            <div>
                <q-input inverted class="search-fade larger" color="grey-9" v-model="searchText" :placeholder="searchPlaceholder" />
                <q-btn @click="performQuery" icon="search" class="block full-width bg-grey-10 text-grey-1">{{ searchTextLabel }}</q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import {
  QInput,
  QBtn
} from 'quasar'

export default {
  name: 'Search',
  components: {
    QInput,
    QBtn
  },
  data () {
    return {
      resultPageName: 'result',
      searchPlaceholder: 'Analyze word...',
      searchTextLabel: 'Search',
      searchText: ''
    }
  },
  methods: {
    performQuery (e, done) {
      var searchText = this.searchText
      var resultPageName = this.resultPageName
      this.$router.push({
        name: resultPageName,
        params: {
          searchText
        }
      })
    }
  }
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
