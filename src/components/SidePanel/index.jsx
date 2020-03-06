import React from 'react';
import Counter from '../Counter';
import Rating from '../Rating';
import './SidePanel.scss';

function SidePanel(props) {
  return (
    <div className="side-panel">
      <input
        className="input-name"
        placeholder="enter your name"
        onChange={props.onChangeName}
        disabled={!props.isNewGame}
      />
      <button className="new-game" onClick={props.onNewGame}>
        New game
      </button>
      <Counter time={props.time} move={props.move} />
      <Rating rating={props.rating} />
    </div>
  );
}

export default SidePanel;
