import ICampaign from "@/interfaces/ICampaign";

export interface IState {
  campaigns: Array<ICampaign>;
};

export const state: IState = {
  campaigns: [{name: 'essai'}]
};