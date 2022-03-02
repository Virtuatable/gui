import { ResultsList } from "@/interfaces/api/ResultsList";
import ICampaign from "@/interfaces/ICampaign";
import { MutationTree } from "vuex";
import { MutationTypes } from "./enums";
import { IState } from "./state";

export type Mutations<S = IState> = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state: S, campaigns: ResultsList<ICampaign>): void;
}

export const mutations: MutationTree<IState> & Mutations = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state, campaigns) {
    state.campaigns = campaigns;
  }
}