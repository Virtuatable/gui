import { MutationTree } from 'vuex';
import { ICanvaState } from './state'
import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from '@/utils/constants';
import IPosition from '@/interfaces/utils/IPosition';
import { state } from '../campaigns/state';

export enum CanvaMTypes {
  END_DRAG = 'END_DRAG',
  MOVE_DRAG = 'MOVE_DRAG',
  SET_SCALE = 'SET_SCALE',
  START_DRAG = 'START_DRAG'
}

export type CanvaMutations<S = ICanvaState> = {
  /**
   * Ends the drag by setting the :dragged flag to false.
   * @param state the state to mutate.
   */
  [CanvaMTypes.END_DRAG](state: S): void;
  /**
   * Moves the whole canva by making the delta between previous position and this one.
   * @param state the state to mutate.
   * @param eventPosition the new position of the mouse to compare to the previous one.
   */
  [CanvaMTypes.MOVE_DRAG](state: S, eventPosition: IPosition): void;
  /**
   * Sets the scale from the delta of the mouse event triggered when the
   * wheel is turned by the user.
   * @param {ICanvaState} state the state to mutate. 
   * @param {number} delta a number representing the quantity of wheeling the user has done.
   */
  [CanvaMTypes.SET_SCALE](state: S, delta: number): void;
  /**
   * Triggers a drag of the whole canva from the position of the mouse. The delta between
   * the mouse position and the canva original position is saved to have a smooth drag when
   * mouse moving, and the :dragged flag is set to true to know the user is dragging.
   * @param state the state to mutate.
   * @param eventPosition the position of the event triggering the drag.
   */
  [CanvaMTypes.START_DRAG](state: S, eventPosition: IPosition): void;
}

export const canvaMutations: MutationTree<ICanvaState> & CanvaMutations = {
  [CanvaMTypes.END_DRAG](state) {
    state.dragged = false
  },
  [CanvaMTypes.MOVE_DRAG](state, eventPosition) {
    if (!state.dragged) return;
    state.position = {
      x: eventPosition.x - state.dragOrigin.x,
      y: eventPosition.y - state.dragOrigin.y
    }
  },
  [CanvaMTypes.SET_SCALE](state, delta) {
    const newScale = state.scale + (delta * ZOOM_STEP)
    state.scale = Math.min(Math.max(ZOOM_MIN, newScale), ZOOM_MAX);
  },
  [CanvaMTypes.START_DRAG](state, eventPosition) {
    state.dragOrigin = {
      x: eventPosition.x - state.position.x,
      y: eventPosition.y - state.position.y
    }
    state.dragged = true;
  }
}