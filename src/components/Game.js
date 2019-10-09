import React from 'react';
import Board from './Board';
import { clickSquare, replay, sortStep, jumpTo } from '../actions';

// eslint-disable-next-line react/prefer-stateless-function
export default class Game extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { game, dispatch } = this.props;
    const {
      isWin,
      squares,
      winInfo,
      xIsNext,
      sort,
      history: stateHistory,
      active: stateActive
    } = game;
    let status;

    if (isWin) {
      status = `Người chiến thắng: ${squares[winInfo.x][winInfo.y]}`;
    } else {
      status = `Người chơi tiếp theo: ${xIsNext ? 'X' : 'O'}`;
    }

    let history = [];
    let historyStatus;

    if (sort) {
      history = [...stateHistory];

      historyStatus = history.map((step, move) => {
        if (move === 0)
          return (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={move}
              onClick={() => dispatch(jumpTo(move))}
              className={
                step.active
                  ? 'list-group-item list-group-item-action active'
                  : 'list-group-item list-group-item-action'
              }
            >
              Go to start
            </button>
          );
        return (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={move}
            onClick={() => dispatch(jumpTo(move))}
            className={
              step.active
                ? 'list-group-item list-group-item-action active'
                : 'list-group-item list-group-item-action'
            }
          >
            Go to #{move}
          </button>
        );
      });
    } else {
      history = [...stateHistory];
      historyStatus = history.map((_step, move) => {
        // eslint-disable-next-line no-param-reassign
        move = history.length - move - 1;
        if (move === 0)
          return (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={move}
              onClick={() => dispatch(jumpTo(move))}
              className={
                history[move].active
                  ? 'list-group-item list-group-item-action active'
                  : 'list-group-item list-group-item-action'
              }
            >
              Go to start
            </button>
          );
        return (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={move}
            onClick={() => dispatch(jumpTo(move))}
            className={
              history[move].active
                ? 'list-group-item list-group-item-action active'
                : 'list-group-item list-group-item-action'
            }
          >
            Go to #{move}
          </button>
        );
      });
    }

    return (
      <div className="row">
        <div className="col-md-3">
          <h4>
            Lịch sử nước đi
            <i
              className="fa fa-sort"
              role="presentation"
              onClick={() => dispatch(sortStep())}
            />
          </h4>
          <div className="list-group">{historyStatus}</div>
        </div>
        <div className="col-md-8">
          <div className="game">
            <div className="game-board">
              <div className="row">
                <div className="col-md-6">
                  {' '}
                  <h4 className="status">{status}</h4>{' '}
                </div>
                <div className="col-md-6">
                  {' '}
                  <button
                    type="button"
                    onClick={() => dispatch(replay())}
                    className="btn btn-success"
                  >
                    Chơi lại
                  </button>{' '}
                </div>
              </div>
              <Board
                squares={squares}
                xIsNext={xIsNext}
                onClick={(x, y) => dispatch(clickSquare(x, y))}
                active={stateActive}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
