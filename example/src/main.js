import Vue from 'vue'
import App from './App.vue'

import Icon from '../../src/index.js'
Vue.component(Icon.name, Icon)

import VueDemonstration from 'vue-demonstration'
Vue.component('demonstration', VueDemonstration)

new Vue({
    el: '#app',
    render: h => h(App)
})
