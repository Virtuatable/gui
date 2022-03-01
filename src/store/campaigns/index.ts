import { Module } from "vuex";
import { IState, state } from "./state";
import { mutations } from './mutations';
import { actions } from './actions';
import { ApplicationState } from "..";

export const campaigns: Module<IState, ApplicationState> = {
  namespaced: true,
  state,
  mutations,
  actions
}