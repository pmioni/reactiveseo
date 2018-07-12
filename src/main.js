// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import Character from './components/Character'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {name: 'character', path: '/character/:name', component: Character}
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
