import IPosition from "@/interfaces/utils/IPosition";

export interface ICanvaState {
  // Triggered to TRUE when the mouse is held down, FALSE when it's released.
  clicked: boolean;
  // Triggered when moving the mouse and the :clicked flag is TRUE.
  dragged: boolean;
  // The origin of the click event when dragging the whole canva.
  dragOrigin: IPosition;
  // The origin of the canva, updated when panning the whole thing.
  position: IPosition;
  // Integer representing the zooming scale of the canva.
  scale: number;
}

export const canvaState: ICanvaState = {
  clicked: false,
  dragged: false,
  dragOrigin: { x: 0, y: 0 },
  position: { x: 50, y: 50 },
  scale: 1
}