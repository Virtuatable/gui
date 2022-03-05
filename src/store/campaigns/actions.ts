import { ActionTypes } from './enums';
import { MutationTypes } from './enums';
import { ActionTree, ActionContext } from 'vuex';
import { Mutations } from './mutations';
import { IState } from './state';
import { ApplicationState } from '..';
import Api from '@/api/utils/Api.ts'
import IInvitation from '@/interfaces/IInvitation';
import ICampaign from '@/interfaces/ICampaign'

type AugmentedContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IState, ApplicationState>, 'commit'>

export interface Actions {
  [ActionTypes.FETCH_CAMPAIGNS](
    { commit }: AugmentedContext,
    payload: Array<ICampaign>
  ): void,
  [ActionTypes.DELETE_CAMPAIGN](
    { commit }: AugmentedContext,
    payload: string
  ): Promise<string>,
  [ActionTypes.GET_CAMPAIGN_DETAILS](
    context: any,
    payload: string,
  ): Promise<ICampaign>,
  [ActionTypes.FETCH_INVITATIONS](
    { commit }: AugmentedContext,
    payload: string
  ): Promise<Array<IInvitation>>
}

export const actions: ActionTree<IState, ApplicationState> & Actions = {
  [ActionTypes.FETCH_CAMPAIGNS]({ commit }) {
    Api.get("/campaigns").then((data: any) => {
      commit(MutationTypes.SET_CAMPAIGNS_LIST, data as unknown as Array<ICampaign>);
    });
  },
  [ActionTypes.DELETE_CAMPAIGN]({ commit }, campaign_id: string) {
    return new Promise((resolve: any) => {
      commit(MutationTypes.DELETE_CAMPAIGN, campaign_id);
      resolve(campaign_id);
    });
  },
  [ActionTypes.GET_CAMPAIGN_DETAILS](context: any, campaign_id: string) {
    return Api.get(`/campaigns/${campaign_id}`)
  },
  [ActionTypes.FETCH_INVITATIONS]({ commit }, campaign_id: string) {
    return Api.get(`/invitations?campaign_id=${campaign_id}&_sort=status`)
  }
}