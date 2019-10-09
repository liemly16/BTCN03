import { SIZE, OBJ, BOARD } from './const';

// eslint-disable-next-line class-methods-use-this
function checkDiagonal(squares, x, y) {
  if (!(x - 4 < 0 || y + 4 >= 20)) {
    if (
      squares[x][y] !== null &&
      squares[x][y] === squares[x - 1][y + 1] &&
      squares[x][y] === squares[x - 2][y + 2] &&
      squares[x][y] === squares[x - 3][y + 3] &&
      squares[x][y] === squares[x - 4][y + 4]
    ) {
      const value = `${squares[x][y]}`;
      if (
        x - 5 >= 0 &&
        y + 5 <= 19 &&
        x + 1 <= 19 &&
        y - 1 >= 0 &&
        squares[x + 1][y - 1] === OBJ[value] &&
        squares[x - 5][y + 5] === OBJ[value]
      )
        return false;

      return {
        status: true,
        type: 1
      };
    }
  }

  if (!(x + 5 > 20 || y + 5 > 20)) {
    if (
      squares[x][y] !== null &&
      squares[x][y] === squares[x + 1][y + 1] &&
      squares[x][y] === squares[x + 2][y + 2] &&
      squares[x][y] === squares[x + 3][y + 3] &&
      squares[x][y] === squares[x + 4][y + 4]
    ) {
      const value = `${squares[x][y]}`;
      if (
        x - 1 >= 0 &&
        y - 1 >= 0 &&
        x + 5 <= 19 &&
        y + 5 <= 19 &&
        squares[x - 1][y - 1] === OBJ[value] &&
        squares[x + 5][y + 5] === OBJ[value]
      )
        return false;

      return {
        status: true,
        type: 2
      };
    }
  }

  return false;
}

// eslint-disable-next-line class-methods-use-this
function checkHorizontal(squares, x, y) {
  if (y + 4 >= 20) return false;

  if (
    squares[x][y] !== null &&
    squares[x][y] === squares[x][y + 1] &&
    squares[x][y] === squares[x][y + 2] &&
    squares[x][y] === squares[x][y + 3] &&
    squares[x][y] === squares[x][y + 4]
  ) {
    const value = `${squares[x][y]}`;
    if (
      y - 1 >= 0 &&
      y + 5 <= 19 &&
      squares[x][y - 1] === OBJ[value] &&
      squares[x][y + 5] === OBJ[value]
    )
      return false;

    return true;
  }

  return false;
}

// eslint-disable-next-line class-methods-use-this
function checkVertical(squares, x, y) {
  if (x + 4 >= 20) return false;

  if (
    squares[x][y] !== null &&
    squares[x][y] === squares[x + 1][y] &&
    squares[x][y] === squares[x + 2][y] &&
    squares[x][y] === squares[x + 3][y] &&
    squares[x][y] === squares[x + 4][y]
  ) {
    const value = `${squares[x][y]}`;
    if (
      x - 1 >= 0 &&
      x + 5 <= 19 &&
      squares[x - 1][y] === OBJ[value] &&
      squares[x + 5][y] === OBJ[value]
    )
      return false;

    return true;
  }

  return false;
}

export function calculateWinner(squares) {
  if (!squares) return null;

  for (let i = 0; i < SIZE; i += 1) {
    for (let j = 0; j < SIZE; j += 1) {
      if (checkVertical(squares, i, j)) {
        return {
          pos: { i, j },
          type: 'vertical'
        };
      }

      if (checkHorizontal(squares, i, j)) {
        return {
          pos: { i, j },
          type: 'horizontal'
        };
      }

      if (checkDiagonal(squares, i, j)) {
        return {
          pos: { i, j },
          type: 'diagonal',
          status: checkDiagonal(squares, i, j).type
        };
      }
    }
  }

  return null;
}

export function activeWinner(winner, state) {
  const { active: stateActive } = state;

  if (winner) {
    if (winner.type === 'vertical') {
      const { i, j } = winner.pos;
      const active = { ...stateActive };

      active[i][j] = true;
      active[i + 1][j] = true;
      active[i + 2][j] = true;
      active[i + 3][j] = true;
      active[i + 4][j] = true;

      const result = {
        active,
        isWin: true,
        winInfo: { x: i, y: j }
      };

      return result;
    }
    if (winner.type === 'horizontal') {
      const { i, j } = winner.pos;
      const active = { ...stateActive };

      active[i][j + 1] = true;
      active[i][j + 2] = true;
      active[i][j + 3] = true;
      active[i][j + 4] = true;
      active[i][j] = true;

      const result = {
        active,
        isWin: true,
        winInfo: { x: i, y: j }
      };

      return result;
    }
    if (winner.type === 'diagonal') {
      if (winner.status === 2) {
        const { i, j } = winner.pos;
        const active = { ...stateActive };

        active[i + 1][j + 1] = true;
        active[i + 2][j + 2] = true;
        active[i + 3][j + 3] = true;
        active[i + 4][j + 4] = true;
        active[i][j] = true;

        const result = {
          active,
          isWin: true,
          winInfo: { x: i, y: j }
        };

        return result;
      }
      if (winner.status === 1) {
        const { i, j } = winner.pos;
        const active = { ...stateActive };

        active[i - 1][j + 1] = true;
        active[i - 2][j + 2] = true;
        active[i - 3][j + 3] = true;
        active[i - 4][j + 4] = true;
        active[i][j] = true;

        const result = {
          active,
          isWin: true,
          winInfo: { x: i, y: j }
        };

        return result;
      }
      return false;
    }

    return false;
  }

  return false;
}

export function handleClick(x, y, state) {
  const {
    squares: stateSquare,
    xIsNext,
    history: stateHistory,
    stepNumber: stateStepNumber
  } = state;

  if (calculateWinner(stateSquare) || stateSquare[x][y]) {
    return false;
  }

  const squares = stateSquare.map(s => [...s]);
  squares[x][y] = xIsNext ? 'X' : 'O';

  const winner = calculateWinner(squares);
  let result = activeWinner(winner, state);
  if (!result) result = { active: BOARD.map(s => [...s]) };
  const history = stateHistory.slice(0, stateStepNumber + 1);
  history.push({ x, y });

  return {
    ...state,
    ...result,
    ...{
      squares,
      xIsNext: !xIsNext,
      history,
      stepNumber: stateStepNumber + 1
    }
  };
}

export function jumpTo(step, state) {
  const { history: stateHistory } = state;
  const squares = BOARD.map(s => [...s]);
  for (let i = 1; i <= step; i += 1) {
    squares[stateHistory[i].x][stateHistory[i].y] = i % 2 ? 'X' : 'O';
  }
  let history = [...stateHistory];
  history = history.map(v => {
    // eslint-disable-next-line no-param-reassign
    v.active = false;
    return v;
  });
  history[step].active = true;

  const winner = calculateWinner(squares);
  let result = activeWinner(winner, state);
  if (!result) result = { active: BOARD.map(s => [...s]) };

  return {
    stepNumber: step,
    xIsNext: step % 2 === 0,
    squares,
    history,
    ...result
  };
}

export function sort(state) {
  const { sort: sortParams } = state;
  if (sortParams) {
    return { sort: false };
  }
  return { sort: true };
}
