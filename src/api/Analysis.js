import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default Vue.resource('Analysis', {}, {
    get: {
        url: 'Analysis',
        method: 'GET'
    }
})
