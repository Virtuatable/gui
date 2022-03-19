import ICampaign from "@/interfaces/ICampaign";
import IMap from '@/interfaces/IMap'
import { ITokenPosition } from "@/interfaces/IToken";

export interface IState {
  campaigns: Array<ICampaign>;
  selectedMap: IMap;
  draggedIndex: number;
};

export const state: IState = {
  campaigns: [],
  selectedMap: { height: 0, width: 0, name: '', tokens: []},
  draggedIndex:  -1
};