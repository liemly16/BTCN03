export const CLICK_SQUARE = 'CLICK_SQUARE';
export const REPLAY = 'REPLAY';
export const JUMP_TO = 'JUMP_TO';
export const SORT = 'SORT';

export function clickSquare(x, y) {
  return {
    type: CLICK_SQUARE,
    x,
    y
  };
}

export function replay() {
  return {
    type: REPLAY
  };
}

export function sortStep() {
  return {
    type: SORT
  };
}

export function jumpTo(step) {
  return {
    type: JUMP_TO,
    step
  };
}
