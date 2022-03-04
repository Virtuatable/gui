import { ResultsList } from "@/interfaces/api/ResultsList";
import ICampaign from "@/interfaces/ICampaign";
import { MutationTree } from "vuex";
import { MutationTypes } from "./enums";
import { IState } from "./state";

interface BannerPayload {
  campaign_id: string;
  banner: string;
}

export type Mutations<S = IState> = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state: S, campaigns: ResultsList<ICampaign>): void;
  [MutationTypes.SET_CAMPAIGN_BANNER](state: S, payload: BannerPayload): void;
}

export const mutations: MutationTree<IState> & Mutations = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state, campaigns) {
    state.campaigns = campaigns;
  },
  [MutationTypes.SET_CAMPAIGN_BANNER](state, payload) {
    state.campaigns.items.forEach((campaign: ICampaign) => {
      if (campaign.id == payload.campaign_id) {
        campaign.banner = payload.banner
      }
    });
    console.log(state.campaigns)
  }
}