export enum SurfaceMouseEvents {
  click = "@surface.mouse.click",
  move = "@surface.mouse.move",
  down = "@surface.mouse.down",
  up = "@surface.mouse.up",
}

export enum SurfaceKeyboardEvents {
  keydown = "@surface.keyboard.down",
}

export type SurfaceMouseEvent = {};
export type SurfaceKeyboardEvent = {};

export type SurfaceHandler<T> = (event: T) => void;
export type SurfaceMouseHandler = SurfaceHandler<SurfaceMouseEvent>;
export type SurfaceKeyboardHandler = SurfaceHandler<SurfaceKeyboardEvent>;

export type SurfaceMouseHandlers = {
  [SurfaceMouseEvents.click]: SurfaceMouseHandler;
  [SurfaceMouseEvents.move]: SurfaceMouseHandler;
};
export type SurfaceKeyboardHandlers = {
  [SurfaceKeyboardEvents.keydown]: SurfaceKeyboardHandler;
};
export type SurfaceHandlers = SurfaceMouseHandlers & SurfaceKeyboardHandlers;
