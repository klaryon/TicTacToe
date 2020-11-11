import React from 'react';
import './App.css';

function Square (props) {
 /* we turn a class into a function ---> function components */
 /* it's a simple way to write components that only have render() as a method. It involves less code. */
 
    return ( /* we remove render() function, because Square became a function. It will only have a return. */
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) { /* the defined state will be set in the Game component*/
    super(props);
    this.state = {
      history: [{ /* we will have a history array were will save every move*/
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  /* we add handleClick method --> an event handler. We use .slice() to create a copy of an array --> immutability */
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); /* this ensures that if we go back in time, an then we do a new movement from that point, we throw all future history out, that now would be inaccurate */
    const current = history[history.length - 1];
    const squares = current.squares.slice(); /* creates a copy of the array */ 
    if (calculateWinner(squares) || squares[i]) { /* ignore click if someone has won or if a square is selected */ 
      return; /* this standalone return, ignores clicks */
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ /* .concat is a substitute of .push() for arrays, the main difference why we choose it is that it doesn't mute the original array */
        squares: squares,
      }]),
      stepNumber: history.length, /* after each movement we update this variable, it avoids showing the same movement after a new one */
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) { /* updates stepNumber and if xIsNext is true, means the number we're changing is even */ 
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; /* renders last selected movement according to stepNumber */
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}> {/* we create a key, that is unique for each movement, so we can go back to it */}
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board /* we call the Board Component */
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Game;
