import React from 'react';
import './Rating.scss';

function Rating(props) {
  let list = props.rating.map((el, index) => {
    let min = Math.floor(el.time / 60);
    let sec = Math.floor(el.time % 60);
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{el.name}</td>
        <td>{el.move}</td>
        <td>
          {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
        </td>
      </tr>
    );
  });
  return (
    <div className="rating">
      <h2>TOP 10</h2>
      <table className="rating-table">
        <tr>
          <th></th>
          <th>Name</th>
          <th>Cards</th>
          <th>Time</th>
        </tr>
        {list}
      </table>
    </div>
  );
}

export default Rating;
