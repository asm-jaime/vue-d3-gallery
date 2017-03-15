import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueD3 from 'vue-d3'

import App from './components/app.vue'
import PageCircle from './components/page-circle.vue'
import PageVoronoi from './components/page-voronoi.vue'
import PageYobanoi from './components/page-yobanoi.vue'

Vue.use(BootstrapVue);
Vue.use(VueRouter)
Vue.use(VueD3);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/circle', component: PageCircle},
    {path: '/voronoi', component: PageVoronoi},
    {path: '/yobanoi', component: PageYobanoi},
  ]
})

console.log('app on start: ', router);
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
