import ICampaign from "@/interfaces/ICampaign";
import IInvitation from "@/interfaces/IInvitation";
import IMap from "@/interfaces/IMap";
import { ITokenPosition } from "@/interfaces/IToken";
import { MutationTree } from "vuex";
import { MutationTypes } from "./enums";
import { IState } from "./state";
import { isEqual, find, findIndex, clone } from 'lodash';
import IPosition from '@/interfaces/utils/IPosition'

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
  [MutationTypes.SELECT_TOKEN](state: S, position: ITokenPosition): void;
  /**
   * Stores the dragged token in the corresponding variable so that it will
   * be moved when triggering the move move event.
   */
  [MutationTypes.START_TOKEN_DRAG](state: S, position: ITokenPosition): void;
  /**
   * Moves a token to the selected X/Y coordinates by sticking it in the
   * corresponding cell. The cell is the one containing the coordinates.
   */
  [MutationTypes.MOVE_TOKEN](state: S, position: IPosition): void;
  /**
   * Ends the drag, setting the dragged flag to false to stop the token from moving.
   */
  [MutationTypes.END_TOKEN_DRAG](state: S): void;
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
      token.dragged = false;
    })
  },
  [MutationTypes.UNSELECT_ALL_TOKENS](state) {
    state.selectedMap.tokens = state.selectedMap.tokens.map((token: ITokenPosition) => {
      return {...token, selected: false }
    });
  },
  [MutationTypes.SELECT_TOKEN](state, pos) {
    state.selectedMap.tokens = state.selectedMap.tokens.map((p: ITokenPosition) => {
      return {...p, selected: pos.id == p.id && pos.x == p.x && pos.y == p.y};
    });
  },
  [MutationTypes.START_TOKEN_DRAG](state, {id, x, y}) {
    state.draggedIndex = findIndex(state.selectedMap.tokens, {id, x, y});
  },
  [MutationTypes.MOVE_TOKEN](state, {x, y}) {
    if(state.draggedIndex > -1 && !find(state.selectedMap.tokens, {x, y})) {
      state.selectedMap.tokens[state.draggedIndex].x = x;
      state.selectedMap.tokens[state.draggedIndex].y = y;
    }
  },
  [MutationTypes.END_TOKEN_DRAG](state) {
    state.draggedIndex = -1;
  },
}