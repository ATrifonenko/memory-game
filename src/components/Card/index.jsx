import React from 'react';
import './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.permit !== this.props.permit && this.props.permit && !this.props.isFound) {
      this.setState({ isFlipped: false });
    }
    if (prevProps.isNewGame !== this.props.isNewGame && this.props.isNewGame) {
      this.setState({ isFlipped: false });
    }
  }

  openCard = e => {
    if (!this.props.permit) {
      return;
    }
    this.setState({ isFlipped: true });
    const timer = setTimeout(() => {
      this.setState({ isFlipped: false });
      this.props.reset();
    }, 5000);
    this.props.onToCompare(this.props.picture, timer);
  };

  render() {
    return (
      <div className={`flip-card ${this.props.isFound ? 'hidden' : ''}`}>
        <div className={`flip-card-inner ${this.state.isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-front" onClick={this.openCard} />
          <div
            className="flip-card-back"
            style={{ backgroundImage: `url(https://picsum.photos/200?random=${this.props.picture})` }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Card;
