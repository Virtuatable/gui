import { ResultsList } from "@/interfaces/api/ResultsList";
import ICampaign from "@/interfaces/ICampaign";

export interface IState {
  campaigns: ResultsList<ICampaign>;
};

export const state: IState = {
  campaigns: {count: 0, items: []}
};