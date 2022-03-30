import Vue from 'vue';
import Vuex from 'vuex';
import { campaigns } from './campaigns';
import { sessions } from './sessions'
import { canva } from './canva'
import { tokens } from './tokens'

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
    sessions,
    canva,
    tokens
  },
});
