import React from 'react';
import { Board } from './Board'

const SIZE = 20;
const BOARD = Array(SIZE).fill(null).map(a => {
    return Array(SIZE).fill(null);
});

const obj = {
    'X': 'O',
    'O': 'X'
}

export class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{}],
            squares: BOARD.map(s => [...s]),
            xIsNext: true,
            isWin: false,
            winInfo: {},
            active: BOARD.map(s => [...s]),
            stepNumber: 0,
            sort: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    calculateWinner(squares) {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (this.checkVertical(squares, i, j)) {
                    console.log("checkVertical")
                    return {
                        pos: { i, j },
                        type: 'vertical'
                    }
                }

                if (this.checkHorizontal(squares, i, j)) {
                    console.log("checkHorizontal")
                    return {
                        pos: { i, j },
                        type: 'horizontal'
                    }
                }

                if (this.checkDiagonal(squares, i, j)) {
                    console.log("checkDiagonal");
                    return {
                        pos: { i, j },
                        type: 'diagonal',
                        status: this.checkDiagonal(squares, i, j).type
                    }
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
                let value = '' + squares[x][y];
                if (x - 1 >= 0 && y - 1 >= 0 && x + 5 <= 19 && y + 5 <= 19 && squares[x - 1][y - 1] === obj[value] && squares[x + 5][y + 5] === obj[value])
                    return false;

                return {
                    status: true,
                    type: 2
                };
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

    replay() {
        this.setState({
            squares: BOARD.map(s => [...s]),
            xIsNext: true,
            isWin: false,
            winInfo: {},
            active: BOARD.map(s => [...s]),
            history: [{}]
        })
    }

    handleClick(x, y) {
        if (this.calculateWinner(this.state.squares) || this.state.squares[x][y]) {
            return;
        }

        const squares = this.state.squares.map(s => [...s]);
        squares[x][y] = this.state.xIsNext ? 'X' : 'O';

        let winner = this.calculateWinner(squares);
        let result = this.activeWinner(winner);
        if (!result) result = { active: BOARD.map(s => [...s]) }
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        history.push({ x, y });
        this.setState(Object.assign({}, result, {
            squares: squares,
            xIsNext: !this.state.xIsNext,
            history,
            stepNumber: this.state.stepNumber + 1
        }))

    }

    activeWinner(winner) {
        if (winner) {
            if (winner.type === 'vertical') {
                let { i, j } = winner.pos;
                let active = Object.assign({}, this.state.active);

                active[i][j] = true;
                active[i + 1][j] = true;
                active[i + 2][j] = true;
                active[i + 3][j] = true;
                active[i + 4][j] = true;

                let result = {
                    active: active,
                    isWin: true,
                    winInfo: { x: i, y: j }
                }

                return result;

            }
            else if (winner.type === 'horizontal') {
                let { i, j } = winner.pos;
                let active = Object.assign({}, this.state.active);

                active[i][j + 1] = true;
                active[i][j + 2] = true;
                active[i][j + 3] = true;
                active[i][j + 4] = true;
                active[i][j] = true;

                let result = {
                    active: active,
                    isWin: true,
                    winInfo: { x: i, y: j }
                }

                return result;
            }
            else if (winner.type === 'diagonal') {
                if (winner.status === 2) {
                    let { i, j } = winner.pos;
                    let active = Object.assign({}, this.state.active);

                    active[i + 1][j + 1] = true;
                    active[i + 2][j + 2] = true;
                    active[i + 3][j + 3] = true;
                    active[i + 4][j + 4] = true;
                    active[i][j] = true;

                    let result = {
                        active: active,
                        isWin: true,
                        winInfo: { x: i, y: j }
                    }

                    return result;
                } else if (winner.status === 1) {
                    let { i, j } = winner.pos;
                    let active = Object.assign({}, this.state.active);

                    active[i - 1][j + 1] = true;
                    active[i - 2][j + 2] = true;
                    active[i - 3][j + 3] = true;
                    active[i - 4][j + 4] = true;
                    active[i][j] = true;

                    let result = {
                        active: active,
                        isWin: true,
                        winInfo: { x: i, y: j }
                    }

                    return result;
                } else return false
            }

            return false;
        }

        return false;
    }

    jumpTo(step) {
        let squares = BOARD.map(s => [...s]);
        for (let i = 1; i <= step; i++) {
            squares[this.state.history[i].x][this.state.history[i].y] = (i % 2) ? 'X' : 'O';
        }
        let history = [...this.state.history];
        history = history.map(v => {
            v.active = false;
            return v;
        })
        history[step].active = true;

        let winner = this.calculateWinner(squares);
        let result = this.activeWinner(winner);
        if (!result) result = { active: BOARD.map(s => [...s]) }
        this.setState(Object.assign({}, {
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            squares,
            history
        }
            , result));
    }

    sort() {
        console.log("Reverse");
        if (this.state.sort) {
            this.setState({ sort: false })

        }
        else {
            this.setState({ sort: true })

        }
    }

    render() {
        let status;
        if (this.state.isWin) {
            status = 'Người chiến thắng: ' + this.state.squares[this.state.winInfo.x][this.state.winInfo.y];
        } else {
            status = 'Người chơi tiếp theo: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let history = [];
        let historyStatus

        if (this.state.sort) {
            history = [...this.state.history];

            historyStatus = history.map((step, move) => {
                if (move === 0)
                    return (
                        <button type="button" key={move} onClick={() => this.jumpTo(move)} className={step.active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to start</button>
                    );
                else
                    return (
                        <button type="button" key={move} onClick={() => this.jumpTo(move)} className={step.active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to #{move}</button>
                    );
            })
        }
        else {
            history = [...this.state.history];
            historyStatus = history.map((step, move) => {
                move = history.length - move - 1;
                if (move === 0)
                    return (
                        <button type="button" key={move} onClick={() => this.jumpTo(move)} className={history[move].active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to start</button>
                    );
                else
                    return (
                        <button type="button" key={move} onClick={() => this.jumpTo(move)} className={history[move].active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to #{move}</button>
                    );
            })
        }


        return (
            <div className="row">
                <div className="col-md-3">
                    <h4>Lịch sử nước đi <i className="fa fa-sort" onClick={() => this.sort()}></i></h4>
                    <div className="list-group">
                        {historyStatus}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="game">
                        <div className="game-board">
                            <div className="row">
                                <div className="col-md-6"> <h4 className="status">{status}</h4> </div>
                                <div className="col-md-6"> <button onClick={() => this.replay()} className="btn btn-success">Chơi lại</button> </div>
                            </div>
                            <Board
                                squares={this.state.squares}
                                xIsNext={this.state.xIsNext}
                                onClick={(x, y) => this.handleClick(x, y)}
                                active={this.state.active}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}