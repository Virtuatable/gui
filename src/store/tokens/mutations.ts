import factories from "@/factories";
import { ITokenPosition } from "@/interfaces/IToken";
import IPosition from "@/interfaces/utils/IPosition";
import { MutationTree } from "vuex";
import { TokensState } from "./state";

export enum TokensMTypes {
  START_DRAG = 'START_DRAG',
  MOVE_DRAG = 'MOVE_DRAG',
  STOP_DRAG = 'STOP_DRAG'
}

export interface TokensMutations {
  [TokensMTypes.START_DRAG](state: TokensState, position: ITokenPosition): void;
  [TokensMTypes.MOVE_DRAG](state: TokensState, position: IPosition): void;
  [TokensMTypes.STOP_DRAG](state: TokensState): void;
}

export const tokensMutations: MutationTree<TokensState> & TokensMutations = {
  [TokensMTypes.START_DRAG](state, position) {
    state.dragged = position;
  },
  [TokensMTypes.MOVE_DRAG](state, position) {
    state.dragged.x = position.x;
    state.dragged.y = position.y;
  },
  [TokensMTypes.STOP_DRAG](state) {
    state.dragged = factories.tokens.emptyPosition()
  }
}