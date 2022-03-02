import { Module } from 'vuex';
import { ApplicationState } from '..';
import { IState, state } from './state';
import { mutations } from './mutations'

export const sessions: Module<IState, ApplicationState> = {
  namespaced: true,
  state,
  mutations,
}