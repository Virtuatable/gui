import { Module } from "vuex";
import { ApplicationState } from "..";
import { TokensState } from "./state";
import { tokensState as state } from './state';
import { tokensMutations as mutations } from './mutations';

export const tokens: Module<TokensState, ApplicationState> = {
  namespaced: true, state, mutations,
}