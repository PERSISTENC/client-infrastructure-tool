import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import viewDesign from 'view-design'
import './style/index.less'
Vue.use(viewDesign)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
