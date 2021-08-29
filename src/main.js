import Vue from 'vue'
import App from './App.vue'

import store from './store'

import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// setup fake backend
import { initBackend } from './utils/initBackend'
initBackend()

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
