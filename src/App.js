import React from 'react';
import logo from './logo.svg';
import './App.css';

const SIZE = 20;
const BOARD = Array(SIZE).fill(null).map(a => {
  return Array(SIZE).fill(null);
});
const obj = {
  'X': 'O',
  'O': 'X'
}


class Square extends React.Component {
  render() {
    return (
      <button className="square"
        onClick={() => this.props.handleClick(this.props.x, this.props.y)}
      >
        {this.props.value}
      </button>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: BOARD.map(s => [...s]),
      xIsNext: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  calculateWinner(squares) {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.checkVertical(squares, i, j)) {
          console.log("checkVertical")
          return squares[i][j]
        }

        if (this.checkHorizontal(squares, i, j)) {
          console.log("checkHorizontal")
          return squares[i][j]
        }

        if (this.checkDiagonal(squares, i, j)) {
          console.log("checkDiagonal");
          return squares[i][j];
        }

      }
    }

    return null;
  }

  checkDiagonal(squares, x, y) {
    if (!(x - 4 < 0 || y + 4 >= 20)) {
      if (
        squares[x][y] !== null &&
        squares[x][y] === squares[x - 1][y + 1] &&
        squares[x][y] === squares[x - 2][y + 2] &&
        squares[x][y] === squares[x - 3][y + 3] &&
        squares[x][y] === squares[x - 4][y + 4]
      ) {
        let value = '' + squares[x][y];
        if (x - 5 >= 0 && y + 5 <= 19 && x + 1 <= 19 && y - 1 >= 0 && squares[x + 1][y - 1] === obj[value] && squares[x - 5][y + 5] === obj[value])
          return false;

        return true;
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
        let value = '' + squares[x][y];
        if (x - 1 >= 0 && y - 1 >= 0 && x + 5 <= 19 && y + 5 <= 19 && squares[x - 1][y - 1] === obj[value] && squares[x + 5][y + 5] === obj[value])
          return false;

        return true;
      }
    }

    return false;
  }

  checkHorizontal(squares, x, y) {
    if (y + 4 >= 20) return false;

    if (
      squares[x][y] !== null &&
      squares[x][y] === squares[x][y + 1] &&
      squares[x][y] === squares[x][y + 2] &&
      squares[x][y] === squares[x][y + 3] &&
      squares[x][y] === squares[x][y + 4]
    ) {
      let value = '' + squares[x][y];
      if (y - 1 >= 0 && y + 5 <= 19 && squares[x][y - 1] === obj[value] && squares[x][y + 5] === obj[value])
        return false;

      return true;
    }

    return false;
  }

  checkVertical(squares, x, y) {
    if (x + 4 >= 20) return false;

    if (
      squares[x][y] !== null &&
      squares[x][y] === squares[x + 1][y] &&
      squares[x][y] === squares[x + 2][y] &&
      squares[x][y] === squares[x + 3][y] &&
      squares[x][y] === squares[x + 4][y]
    ) {
      let value = '' + squares[x][y];
      if (x - 1 >= 0 && x + 5 <= 19 && squares[x - 1][y] === obj[value] && squares[x + 5][y] === obj[value])
        return false;

      return true;
    }

    return false;
  }


  handleClick(x, y) {
    if (this.calculateWinner(this.state.squares) || this.state.squares[x][y]) {
      return;
    }

    const squares = this.state.squares.map(s => [...s]);
    squares[x][y] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  renderSquare(x, y) {
    return <Square handleClick={this.handleClick} value={this.state.squares[x][y]} key={x.toString() + y.toString()} x={x} y={y} />;
  }

  renderRow(x) {
    return BOARD.map((item, key) => {
      return this.renderSquare(x, key);
    });
  }

  replay() {
    this.setState({
      squares: BOARD.map(s => [...s]),
      xIsNext: true,
    })
  }


  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Người chiến thắng: ' + winner;
    } else {
      status = 'Người chơi tiếp theo: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="board">
        <div className="row">
          <div className="col-md-6"> <h4 className="status">{status}</h4> </div>
          <div className="col-md-6"> <button onClick={() => this.replay(this.props.x, this.props.y)} className="btn btn-success">Chơi lại</button> </div>
        </div>
        {BOARD.map((item, key) => {
          return (
            <div className="wrap" key={key}>
              {this.renderRow(key)}
            </div>
          )
        })}

      </div>
    );
  }
}

function App() {
  return (
    <div className="row">
      <div className="col-md-8 col-md-offset-2">
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
