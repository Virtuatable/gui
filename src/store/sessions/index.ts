import { Module } from 'vuex';
import { ApplicationState } from '..';
import { IState, state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';

export const sessions: Module<IState, ApplicationState> = {
  namespaced: true,
  state,
  mutations,
  actions
}