import React from 'react';
import { Square } from './Square';

export class Board extends React.Component {
    constructor(props) {
      super(props);
    }
  
    renderSquare(x, y) {
      return <Square handleClick={this.props.onClick} active={this.props.active} value={this.props.squares[x][y]} key={x.toString() + y.toString()} x={x} y={y} />;
    }
  
    renderRow(x) {
      return this.props.squares.map((item, key) => {
        return this.renderSquare(x, key);
      });
    }
  
    render() {
      return (
        <div className="board">
          {this.props.squares.map((item, key) => {
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