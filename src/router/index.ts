import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Subscription from '../views/Subscription.vue'
import Login from '../views/Login.vue'
import CampaignsList from '../views/campaigns/List.vue'
import CampaignDetails from '../views/campaigns/View.vue'
import redirectAnonymous from './guards/redirectAnonymous'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
  {
    path: '/campaigns/:id',
    name: 'Campaign details',
    component: CampaignDetails,
    beforeEnter: redirectAnonymous,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
