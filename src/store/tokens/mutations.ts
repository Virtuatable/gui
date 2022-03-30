import factories from "@/factories";
import { ITokenPosition } from "@/interfaces/IToken";
import IPosition from "@/interfaces/utils/IPosition";
import { MutationTree } from "vuex";
import { TokensState } from "./state";

export enum TokensMTypes {
  START_DRAG = 'START_DRAG',
  MOVE_DRAG = 'MOVE_DRAG',
  STOP_DRAG = 'STOP_DRAG',
  START_SELECTION = 'START_SELECTION',
  CANCEL_SELECTION = 'CANCEL_SELECTION',
  VALIDATE_SELECTION = 'VALIDATE_SELECTION'
}

export interface TokensMutations {
  [TokensMTypes.START_DRAG](state: TokensState, position: ITokenPosition): void;
  [TokensMTypes.MOVE_DRAG](state: TokensState, position: IPosition): void;
  [TokensMTypes.STOP_DRAG](state: TokensState): void;
  /**
   * Starts a selection when the user presses the mouse button. Selection will be
   * made when releasing the button, and cancelled when moving the mouse with button pressed.
   */
  [TokensMTypes.START_SELECTION](state: TokensState): void;
  /**
   * Cancels the selection, for example when the user wanted to drag the tokens and not
   * select it, that is detected with him moving the mouse before releasing click.
   */
  [TokensMTypes.CANCEL_SELECTION](state: TokensState): void;
}

export const tokensMutations: MutationTree<TokensState> & TokensMutations = {
  [TokensMTypes.START_DRAG](state, position) {
    state.selecting = true;
    state.dragged = position;
  },
  [TokensMTypes.MOVE_DRAG](state, position) {
    state.dragged.x = position.x;
    state.dragged.y = position.y;
  },
  [TokensMTypes.STOP_DRAG](state) {
    if (!state.selecting) state.selected = state.dragged;
    state.dragged = factories.tokens.emptyPosition()
  },
  [TokensMTypes.START_SELECTION](state) {
    state.selecting = true;
  },
  [TokensMTypes.CANCEL_SELECTION](state) {
    state.selecting = false;
  },
  [TokensMTypes.VALIDATE_SELECTION](state, position) {
    if (state.selecting && state.selected.id == position.id) {
      state.selected = factories.tokens.emptyPosition();
    }
    else {
      state.selected = position;
    }
  }
}