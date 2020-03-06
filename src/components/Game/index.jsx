import React from 'react';
import GameField from '../GameField';
import SidePanel from '../SidePanel';
import './Game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'Player',
      isVictory: false,
      time: 0,
      move: 0,
      isNewGame: true,
      rating: JSON.parse(localStorage.getItem('rating')) || []
    };
  }

  handleChangeName = e => {
    this.setState({ player: e.target.value });
  };

  handleNewGame = () => {
    clearInterval(this.timer);
    this.setState(state => {
      return { isNewGame: true, time: 0, move: 0, isVictory: false };
    });
  };

  handleStartGame = () => {
    this.setState({ isNewGame: false });
    this.timer = setInterval(
      () =>
        this.setState(state => {
          return { time: state.time + 1 };
        }),
      1000
    );
  };

  handleMove = () => {
    this.setState(state => {
      return { move: state.move + 1 };
    });
  };

  handleVictory = () => {
    clearInterval(this.timer);
    let ls = JSON.parse(localStorage.getItem('rating')) || [];
    ls.push({ name: this.state.player, move: this.state.move, time: this.state.time });
    ls.sort((a, b) => a.time - b.time).splice(10);
    this.setState({ isVictory: true, rating: ls });
    localStorage.setItem('rating', JSON.stringify(ls));
  };

  render() {
    return (
      <div className="game">
        <GameField
          isNewGame={this.state.isNewGame}
          onStartGame={this.handleStartGame}
          onMove={this.handleMove}
          isVictory={this.state.isVictory}
          onVictoryGame={this.handleVictory}
        />
        <SidePanel
          onNewGame={this.handleNewGame}
          isNewGame={this.state.isNewGame}
          onChangeName={this.handleChangeName}
          rating={this.state.rating}
          time={this.state.time}
          move={this.state.move}
        />
      </div>
    );
  }
}

export default Game;
