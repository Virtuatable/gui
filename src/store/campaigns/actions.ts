import ICampaign from '@/interfaces/ICampaign';
import { ActionTypes } from './enums';
import { MutationTypes } from './enums';
import { ActionTree, ActionContext } from 'vuex';
import { Mutations } from './mutations';
import { IState } from './state';
import { ApplicationState } from '..';

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
  ): Promise<Array<ICampaign>>
}

export const actions: ActionTree<IState, ApplicationState> & Actions = {
  [ActionTypes.FETCH_CAMPAIGNS]({ commit }) {

    return new Promise((resolve: any) => {
      setTimeout(() => {
        const data: Array<ICampaign> = [{name: 'My campaign'}];
        commit(MutationTypes.SET_CAMPAIGNS_LIST, data);
        resolve(data);
      }, 1000)
    });
  }
}