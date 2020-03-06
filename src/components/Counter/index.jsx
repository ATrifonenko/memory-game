import React from 'react';
import './Counter.scss';

function Counter(props) {
  let min = Math.floor(props.time / 60);
  let sec = Math.floor(props.time % 60);
  return (
    <div className="counters">
      <div className="time-counter">
        <h2>Time</h2>
        <span>
          {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
        </span>
      </div>
      <div className="move-counter">
        <h2>Cards</h2>
        <span>{props.move}</span>
      </div>
    </div>
  );
}

export default Counter;
