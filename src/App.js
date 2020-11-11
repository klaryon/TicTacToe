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
  /* we will elevate the state of components - from Square to Board component */
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), /* we have an empty array to fill */
      xIsNext: true, /* 'X' as default */
    };
  }
  /* we add handleClick method --> an event handler. We use .slice() to create a copy of an array --> immutability */
  handleClick(i) {
    const squares = this.state.squares.slice(); /* creates a copy of the array */ 
    if (calculateWinner(squares) || squares[i]) { /* ignore click if someone has won or if a square is selected */ 
      return; /* this standalone return, ignores clicks */
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares); /* check if there is a winner */
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
