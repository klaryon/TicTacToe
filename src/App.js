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
    const squares = this.state.squares.slice(); /* creates an array copy */ 
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
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

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


export default Game;
