import { MutationTree } from "vuex";
import { MutationTypes } from "./enums";
import { IState } from "./state";

export type Mutations<S = IState> = {
  [MutationTypes.SET_SESSION_ID](state: S, session_id: string): void;
}

export const mutations: MutationTree<IState> & Mutations = {
  [MutationTypes.SET_SESSION_ID](state, session_id: string) {
    return localStorage.setItem('session_id', session_id)
  }
}