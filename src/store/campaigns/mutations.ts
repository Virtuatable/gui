import ICampaign from "@/interfaces/ICampaign";
import IInvitation from "@/interfaces/IInvitation";
import { MutationTree } from "vuex";
import { MutationTypes } from "./enums";
import { IState } from "./state";

interface InvitationsPayload {
  campaign_id: string;
  invitations: Array<IInvitation>;
}

export type Mutations<S = IState> = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state: S, campaigns: Array<ICampaign>): void;
  [MutationTypes.DELETE_CAMPAIGN](state: S, campaign_id: string): void;
  [MutationTypes.SET_CAMPAIGN_INVITATIONS](state: S, payload: InvitationsPayload): void;
}

export const mutations: MutationTree<IState> & Mutations = {
  [MutationTypes.SET_CAMPAIGNS_LIST](state, campaigns) {
    state.campaigns = campaigns;
  },
  [MutationTypes.DELETE_CAMPAIGN](state, campaign_id) {
    state.campaigns.forEach((campaign: ICampaign, index: number) => {
      if (campaign.id === campaign_id) state.campaigns.splice(index, 1);
    });
  },
  [MutationTypes.SET_CAMPAIGN_INVITATIONS](state, { campaign_id, invitations }) {
    state.campaigns.forEach((campaign: ICampaign) => {
      if (campaign.id === campaign_id) {
        campaign.invitations = invitations;
      }
    })
  }
}