import { combineReducers } from 'redux';
import { BOARD } from '../const';
import { CLICK_SQUARE, REPLAY, SORT, JUMP_TO } from '../actions';
import { handleClick, sort, jumpTo } from '../utils';

const initState = {
  history: [{}],
  squares: BOARD.map(s => [...s]),
  xIsNext: true,
  isWin: false,
  winInfo: {},
  active: BOARD.map(s => [...s]),
  stepNumber: 0,
  sort: true
};

const game = (state = initState, action) => {
  switch (action.type) {
    case CLICK_SQUARE: {
      const result = handleClick(action.x, action.y, state);
      if (result) return result;
      return state;
    }
    case REPLAY:
      return { ...initState };
    case SORT: {
      const result = sort(state);
      if (result) return { ...state, ...result };
      return state;
    }
    case JUMP_TO: {
      const result = jumpTo(action.step, state);
      return { ...state, ...result };
    }
    default:
      return state;
  }
};

export default combineReducers({
  game
});
