import Vue from 'vue';
import index from './index.vue';
import VueRouter from 'vue-router';
import authentication from "./components/authentication";
import account from "./components/account";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: authentication },
  { path: '/account', component: account }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(index),

}).$mount('#app');
