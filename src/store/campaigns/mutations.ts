import ICampaign from "@/interfaces/ICampaign";
import { MutationTree } from "vuex";
import { MutationTypes } from "./enums";
import { IState } from "./state";

interface BannerPayload {
  campaign_id: string;
  banner: string;
}

export type Mutations<S = IState> = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state: S, campaigns: Array<ICampaign>): void;
  [MutationTypes.SET_CAMPAIGN_BANNER](state: S, payload: BannerPayload): void;
  [MutationTypes.DELETE_CAMPAIGN](state: S, campaign_id: string): void;
}

export const mutations: MutationTree<IState> & Mutations = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state, campaigns) {
    state.campaigns = campaigns;
  },
  [MutationTypes.SET_CAMPAIGN_BANNER](state, payload) {
    state.campaigns.forEach((campaign: ICampaign) => {
      if (campaign.id == payload.campaign_id) {
        campaign.banner = payload.banner
      }
    });
    console.log(state.campaigns)
  },
  [MutationTypes.DELETE_CAMPAIGN](state, campaign_id) {
    state.campaigns.forEach((campaign: ICampaign, index: number) => {
      if (campaign.id === campaign_id) state.campaigns.splice(index, 1);
    });
  }
}