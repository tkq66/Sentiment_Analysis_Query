
import Vue from 'vue'
import VueResource from 'vue-resource'
import store from 'src/store'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:5000/api'

export {default as Analysis} from './Analysis'
