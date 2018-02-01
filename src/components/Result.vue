<template>
    <div class="absolute fit">
        <vue-particles class="absolute fit" color="#dedede"></vue-particles>
        {{ searchText }}
    </div>
</template>

<script>
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
  methods: {}
}
</script>

<style>
</style>
