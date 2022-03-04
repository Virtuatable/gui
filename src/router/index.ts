import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Subscription from '../views/Subscription.vue'
import Login from '../views/Login.vue'
import CampaignsList from '../views/campaigns/List.vue'
import redirectAnonymous from './guards/redirectAnonymous'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/subscribe',
    name: 'Subscription view',
    component: Subscription,
  },
  {
    path: '/login',
    name: 'Log in view',
    component: Login,
  },
  {
    path: '/campaigns',
    name: 'Campaigns list',
    component: CampaignsList,
    beforeEnter: redirectAnonymous,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
