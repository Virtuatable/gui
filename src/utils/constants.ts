// The base height/width for a cell in a map when not yet zoomed.
export const CELL_SIZE: number = 100;

// CANVA CONSTANTS

// The original X coordinates of the canva
export const ORIGIN_X = 50;
// The original Y coordinates of the canva
export const ORIGIN_Y = 50;
// The minimum amount of zoom the scale can be set to
export const ZOOM_MIN = .125;
// The maximum amount of zoom the scale can be set to
export const ZOOM_MAX = 4;
// The multiplier to get the zoom scale from the user wheel delta.
export const ZOOM_STEP = -.01;