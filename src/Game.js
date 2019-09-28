import React from 'react';
import Board from './Board'

const SIZE = 20;
const BOARD = Array(SIZE).fill(null).map(() => {
    return Array(SIZE).fill(null);
});

const obj = {
    'X': 'O',
    'O': 'X'
}

export default class Game extends React.Component {
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
        if (!squares) return null;

        for (let i = 0; i < SIZE; i += 1) {
            for (let j = 0; j < SIZE; j += 1) {
                if (this.checkVertical(squares, i, j)) {
                    return {
                        pos: { i, j },
                        type: 'vertical'
                    }
                }

                if (this.checkHorizontal(squares, i, j)) {
                    return {
                        pos: { i, j },
                        type: 'horizontal'
                    }
                }

                if (this.checkDiagonal(squares, i, j)) {
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

    // eslint-disable-next-line class-methods-use-this
    checkDiagonal(squares, x, y) {
        if (!(x - 4 < 0 || y + 4 >= 20)) {
            if (
                squares[x][y] !== null &&
                squares[x][y] === squares[x - 1][y + 1] &&
                squares[x][y] === squares[x - 2][y + 2] &&
                squares[x][y] === squares[x - 3][y + 3] &&
                squares[x][y] === squares[x - 4][y + 4]
            ) {
                const value = `${squares[x][y]}`;
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
                const value = `${squares[x][y]}`;
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

    // eslint-disable-next-line class-methods-use-this
    checkHorizontal(squares, x, y) {
        if (y + 4 >= 20) return false;

        if (
            squares[x][y] !== null &&
            squares[x][y] === squares[x][y + 1] &&
            squares[x][y] === squares[x][y + 2] &&
            squares[x][y] === squares[x][y + 3] &&
            squares[x][y] === squares[x][y + 4]
        ) {
            const value = `${squares[x][y]}`;
            if (y - 1 >= 0 && y + 5 <= 19 && squares[x][y - 1] === obj[value] && squares[x][y + 5] === obj[value])
                return false;

            return true;
        }

        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    checkVertical(squares, x, y) {
        if (x + 4 >= 20) return false;

        if (
            squares[x][y] !== null &&
            squares[x][y] === squares[x + 1][y] &&
            squares[x][y] === squares[x + 2][y] &&
            squares[x][y] === squares[x + 3][y] &&
            squares[x][y] === squares[x + 4][y]
        ) {
            const value = `${squares[x][y]}`;
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
        const { squares: stateSquare, xIsNext, history: stateHistory, stepNumber: stateStepNumber } = this.state;

        if (this.calculateWinner(stateSquare) || stateSquare[x][y]) {
            return;
        }

        const squares = stateSquare.map(s => [...s]);
        squares[x][y] = xIsNext ? 'X' : 'O';

        const winner = this.calculateWinner(squares);
        let result = this.activeWinner(winner);
        if (!result) result = { active: BOARD.map(s => [...s]) }
        const history = stateHistory.slice(0, stateStepNumber + 1);
        history.push({ x, y });

        this.setState({
            ...result, squares,
            xIsNext: !xIsNext,
            history,
            stepNumber: stateStepNumber + 1
        })

    }

    activeWinner(winner) {
        const { active: stateActive } = this.state;

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
                }

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
                }

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
                    }

                    return result;
                } if (winner.status === 1) {
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
                    }

                    return result;
                } return false
            }

            return false;
        }

        return false;
    }

    jumpTo(step) {
        const { history: stateHistory } = this.state;

        const squares = BOARD.map(s => [...s]);
        for (let i = 1; i <= step; i += 1) {
            squares[stateHistory[i].x][stateHistory[i].y] = (i % 2) ? 'X' : 'O';
        }
        let history = [...stateHistory];
        history = history.map(v => {
            // eslint-disable-next-line no-param-reassign
            v.active = false;
            return v;
        })
        history[step].active = true;

        const winner = this.calculateWinner(squares);
        let result = this.activeWinner(winner);
        if (!result) result = { active: BOARD.map(s => [...s]) }
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            squares,
            history
            , ...result
        });
    }

    sort() {
        const { sort } = this.state;
        if (sort) {
            this.setState({ sort: false })

        }
        else {
            this.setState({ sort: true })

        }
    }

    render() {
        const { isWin, squares, winInfo, xIsNext, sort, history: stateHistory, active: stateActive } = this.state;
        let status;
        if (isWin) {
            status = `Người chiến thắng: ${squares[winInfo.x][winInfo.y]}`;
        } else {
            status = `Người chơi tiếp theo: ${xIsNext ? 'X' : 'O'}`;
        }

        let history = [];
        let historyStatus

        if (sort) {
            history = [...stateHistory];

            historyStatus = history.map((step, move) => {
                if (move === 0)
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <button type="button" key={move} onClick={() => this.jumpTo(move)} className={step.active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to start</button>
                    );
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <button type="button" key={move} onClick={() => this.jumpTo(move)} className={step.active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to #{move}</button>
                );
            })
        }
        else {
            history = [...stateHistory];
            historyStatus = history.map((step, move) => {
                // eslint-disable-next-line no-param-reassign
                move = history.length - move - 1;
                if (move === 0)
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <button type="button" key={move} onClick={() => this.jumpTo(move)} className={history[move].active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to start</button>
                    );
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <button type="button" key={move} onClick={() => this.jumpTo(move)} className={history[move].active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>Go to #{move}</button>
                );
            })
        }


        return (
            <div className="row">
                <div className="col-md-3">
                    <h4>Lịch sử nước đi
                        <i className="fa fa-sort" role="presentation" onClick={() => this.sort()} />
                    </h4>
                    <div className="list-group">
                        {historyStatus}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="game">
                        <div className="game-board">
                            <div className="row">
                                <div className="col-md-6"> <h4 className="status">{status}</h4> </div>
                                <div className="col-md-6"> <button type="button" onClick={() => this.replay()} className="btn btn-success">Chơi lại</button> </div>
                            </div>
                            <Board
                                squares={squares}
                                xIsNext={xIsNext}
                                onClick={(x, y) => this.handleClick(x, y)}
                                active={stateActive}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}