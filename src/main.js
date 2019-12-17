import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import kits from '@/components/kits'
import '@/filter/time.js'

Vue.use(kits)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  //router,
  store,
  render: h => h(App)
}).$mount('#app')
