import Vue from 'vue';
import index from './index.vue';
import VueRouter from 'vue-router';
import signin from "./components/signin";
import signup from "./components/signup";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/signin', component: signin },
  { path: '/signup', component: signup }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(index),

}).$mount('#app');
