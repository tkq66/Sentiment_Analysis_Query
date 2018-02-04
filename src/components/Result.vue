<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        {{ searchText }}
    </div>
</template>

<script>
import { Analysis } from 'src/api'

export default {
  name: 'Result',
  props: [
    'searchText'
  ],
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
  created () {
    Analysis.get({ query_phrase: this.searchText })
      .then(
        response => {
          console.log(response)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  }
}
</script>

<style>
</style>
