import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
    routes: [
      {path: '/', name: 'main', component: require('../pages/main/index.vue').default},
      {path: '/doc', name: 'doc', component: require('../pages/doc/index.vue').default},
    ]
})
