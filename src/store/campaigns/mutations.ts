import ICampaign from "@/interfaces/ICampaign";
import IInvitation from "@/interfaces/IInvitation";
import IMap from "@/interfaces/IMap";
import { ITokenPosition } from "@/interfaces/IToken";
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
  /**
   * Selects a map and resets the selected flag of all its token. The map is stored in the
   * state so that we can access its tokens positions and unselect all the others when one
   * of them is selected by the user.
   */
  [MutationTypes.SELECT_MAP](state: S, payload: IMap): void;
  /**
   * Resets the selected flag of all tokens of the current map to false.
   */
  [MutationTypes.UNSELECT_ALL_TOKENS](state: S): void;
  /**
   * Selects a token in the positions list.
   */
  [MutationTypes.SELECT_TOKEN](state: S, position: ITokenPosition): void
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
  },
  [MutationTypes.SELECT_MAP](state, map) {
    state.selectedMap = map;
    state.selectedMap.tokens.forEach((token: ITokenPosition) => {
      token.selected = false;
    })
  },
  [MutationTypes.UNSELECT_ALL_TOKENS](state) {
    state.selectedMap.tokens = state.selectedMap.tokens.map((token: ITokenPosition) => {
      return {...token, selected: false }
    });
  },
  [MutationTypes.SELECT_TOKEN](state, position) {
    console.log(position.x, position.y);
    state.selectedMap.tokens = state.selectedMap.tokens.map((p: ITokenPosition) => {
      if (p.x == position.x && p.y == position.y && p.id == position.id) {
        p.selected = true;
      }
      return p;
    });
    console.log(state.selectedMap)
  }
}