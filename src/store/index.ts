import Vue from 'vue';
import Vuex from 'vuex';
import { campaigns } from './campaigns';
import { sessions } from './sessions'

Vue.use(Vuex);

export interface ApplicationState {}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    campaigns,
    sessions
  },
});
