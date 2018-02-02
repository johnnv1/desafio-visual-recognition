import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Card from '../components/Card.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/card',
      name: 'Card',
      component: Card,
      props: true,
    },
  ],
});
