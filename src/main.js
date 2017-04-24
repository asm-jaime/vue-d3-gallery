import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueD3 from 'vue-d3'

import App from './components/app.vue'
import PageCircle from './components/page-circle.vue'
import PageVoronoi from './components/page-voronoi.vue'
import PageImgVoronoi from './components/page-img-voronoi.vue'
import PageMap from './components/page-map.vue'
import PageNMap from './components/page-nmap.vue'
import PageOMap from './components/page-omap.vue'
import PageWorldMap from './components/page-world-map.vue'

Vue.use(BootstrapVue);
Vue.use(VueRouter)
Vue.use(VueD3);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: PageVoronoi},
    {path: '/circle', component: PageCircle},
    {path: '/voronoi', component: PageVoronoi},
    {path: '/img-voronoi', component: PageImgVoronoi},
    {path: '/map', component: PageMap},
    {path: '/nmap', component: PageNMap},
    {path: '/omap', component: PageOMap},
    {path: '/world-map', component: PageWorldMap},
  ]
});

console.log('app on start: ', router);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
