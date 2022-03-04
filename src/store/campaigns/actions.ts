import ICampaign, { ICampaignDetails } from '@/interfaces/ICampaign';
import { ActionTypes } from './enums';
import { MutationTypes } from './enums';
import { ActionTree, ActionContext } from 'vuex';
import { Mutations } from './mutations';
import { IState } from './state';
import { ApplicationState } from '..';
import { InvitationStatus } from '@/interfaces/IInvitation';
import axios from 'axios';

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
  [ActionTypes.GET_CAMPAIGN_BANNER](
    { commit }: AugmentedContext,
    payload: string
  ): Promise<string>,
  [ActionTypes.DELETE_CAMPAIGN](
    { commit }: AugmentedContext,
    payload: string
  ): Promise<string>,
  [ActionTypes.GET_CAMPAIGN_DETAILS](
    context: any,
    payload: string,
  ): Promise<ICampaignDetails>
}

export const actions: ActionTree<IState, ApplicationState> & Actions = {
  [ActionTypes.FETCH_CAMPAIGNS]({ commit }) {
    axios.get("http://localhost:3000/campaigns").then(data => {
      console.log(data.data);
      commit(MutationTypes.SET_CAMPAIGNS_LIST, data.data as unknown as Array<ICampaign>);
    })
  },
  [ActionTypes.GET_CAMPAIGN_BANNER]({ commit }, campaign_id: string) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        const images: any = {}
        commit(MutationTypes.SET_CAMPAIGN_BANNER, {
          campaign_id: campaign_id,
          banner: images[campaign_id as keyof Images]
        })
        resolve(images[campaign_id as keyof Images])
      },
      1000);
    });
  },
  [ActionTypes.DELETE_CAMPAIGN]({ commit }, campaign_id: string) {
    return new Promise((resolve: any) => {
      commit(MutationTypes.DELETE_CAMPAIGN, campaign_id);
      resolve(campaign_id);
    });
  },
  [ActionTypes.GET_CAMPAIGN_DETAILS](context: any, campaign_id: string) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({
          id: 'my_campaign_id',
          name: 'My Detailled campaign',
          description: 'Mais... Ce n\'est pas la campagne sur laquelle j\'ai cliqué ?!',
          banner: '',
          invitations: [
            {
              player: {username: 'John Doe', email: 'john@doe.com'},
              issued_date: Date.now(),
              acceptation_date: Date.now(),
              status: InvitationStatus.PENDING
            },
            {
              player: {username: 'Jane Doe', email: 'jane@doe.com'},
              issued_date: Date.now(),
              acceptation_date: Date.now(),
              status: InvitationStatus.ACCEPTED
            }
          ]

        })
      }, 1000);
    })
  }
}

interface Images {
  my_campaign_id: string,
  my_other_campaign_id: string
}