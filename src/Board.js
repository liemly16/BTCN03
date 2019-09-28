import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  renderSquare(x, y) {
    const { squares, active, onClick } = this.props;
    return <Square handleClick={onClick} active={active} value={squares[x][y]} key={x.toString() + y.toString()} x={x} y={y} />;
  }

  renderRow(x) {
    const { squares } = this.props;
    return squares.map((item, key) => {
      return this.renderSquare(x, key);
    });
  }

  render() {
    const { squares } = this.props;

    return (
      <div className="board">
        {squares.map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className="wrap" key={index}>
              {this.renderRow(index)}
            </div>
          )
        })}
      </div>
    );
  }
}