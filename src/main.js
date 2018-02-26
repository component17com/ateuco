// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'

import io from 'socket.io-client';
import vSelect from 'vue-select'

//Vue.use(router);
Vue.use(Vuetify)
Vue.component('v-select', vSelect)

Vue.config.productionTip = false;

Vue.prototype.socket = io;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },

})
