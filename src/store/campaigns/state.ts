import ICampaign from "@/interfaces/ICampaign";
import IMap from '@/interfaces/IMap'
import IPosition from "@/interfaces/utils/IPosition";

export interface IState {
  campaigns: Array<ICampaign>;
  selectedMap: IMap;
  draggedIndex: number;
  origin: IPosition;
};

export const state: IState = {
  campaigns: [],
  selectedMap: { height: 0, width: 0, name: '', tokens: []},
  draggedIndex:  -1,
  origin: { x: 50, y: 50 }
};