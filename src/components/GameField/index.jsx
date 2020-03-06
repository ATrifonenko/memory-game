import React from 'react';
import './GameField.scss';
import Card from '../Card';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedCard: 0,
      pictureFirstCard: null,
      timer: null,
      picList: [],
      foundPictures: []
    };
  }

  componentDidMount() {
    let nextPic = 1;
    const list = this.state.picList;
    for (let i = 0; i < 36; i++) {
      list.push(nextPic);
      if ((i + 2) % 2 !== 0) {
        nextPic++;
      }
    }
    this.shuffle(list);
    this.setState({ picList: list });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isNewGame !== this.props.isNewGame && this.props.isNewGame) {
      setTimeout(() => {
        clearTimeout(this.state.timer);
        this.resetState();
      }, 600);
    }
    if (prevProps.isVictory !== this.props.isVictory && this.props.isVictory) {
      this.setState({ foundPictures: [] });
    }
  }

  resetState = () => {
    this.props.isNewGame
      ? this.setState(state => {
          return {
            openedCard: 0,
            pictureFirstCard: null,
            timer: null,
            picList: this.shuffle(state.picList),
            foundPictures: []
          };
        })
      : this.setState({ openedCard: 0, pictureFirstCard: null, timer: null });
  };

  handleСompare = (numberPicture, timer) => {
    const { openedCard, foundPictures, pictureFirstCard, timerFirstCard } = this.state;
    this.props.onMove();

    if (this.props.isNewGame) {
      this.props.onStartGame();
    }
    switch (openedCard) {
      case 0:
        this.setState({
          openedCard: 1,
          pictureFirstCard: numberPicture,
          timerFirstCard: timer
        });
        break;

      case 1:
        this.setState({ openedCard: 2 });

        if (pictureFirstCard === numberPicture) {
          setTimeout(() => {
            clearTimeout(timerFirstCard);
            clearTimeout(timer);
            const found = foundPictures;
            found.push(numberPicture);

            if (found.length === 18) {
              this.props.onVictoryGame();
            } else {
              this.setState({
                openedCard: 0,
                pictureFirstCard: null,
                timer: null,
                foundPictures: found
              });
            }
          }, 600);
        } else {
          setTimeout(() => {
            clearTimeout(timerFirstCard);
            clearTimeout(timer);
            this.setState({
              openedCard: 0,
              pictureFirstCard: null,
              timer: null
            });
          }, 600);
        }
        break;
      default:
        break;
    }
  };

  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  render() {
    let cardList;
    if (this.state.picList) {
      cardList = this.state.picList.map((picture, index) => (
        <Card
          picture={picture}
          key={index}
          onToCompare={this.handleСompare}
          permit={this.state.openedCard === 2 ? false : true}
          isFound={this.state.foundPictures.includes(picture)}
          reset={this.resetState}
          isNewGame={this.props.isNewGame}
        />
      ));
    }
    return <div className="game-field">{cardList}</div>;
  }
}

export default GameField;
