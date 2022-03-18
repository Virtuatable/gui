import ICampaign from "@/interfaces/ICampaign";
import IMap from '@/interfaces/IMap'

export interface IState {
  campaigns: Array<ICampaign>;
  selectedMap: IMap;
};

export const state: IState = {
  campaigns: [],
  selectedMap: { height: 0, width: 0, name: '', tokens: []}
};