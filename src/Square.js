import React from 'react';

export class Square extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <button className={this.props.active[this.props.x][this.props.y] ? 'square active' : 'square'}
          onClick={() => this.props.handleClick(this.props.x, this.props.y)}
        >
          {this.props.value}
        </button>
      )
    }
  }