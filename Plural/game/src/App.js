import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';
import _ from "lodash";

class Game extends Component {
  static randomNumber = () =>  1 + Math.floor(Math.random() * 9);

  static initialState = () => ({
    selectedNumbers: [],
    usedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null,
  });

  state = Game.initialState();

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState((prevState) => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  }

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }

  checkEqual = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((a, b) => a + b, 0)
    }));
    console.log(this.state.answerIsCorrect)
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      answerIsCorrect: null,
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
    }), this.updateDoneStatus);
  }

  redraw = () => {
    if(this.state.redraws === 0) { return; }
    this.setState((prevState) => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus);
  }

  possibleSolutions = ({usedNumbers, numberOfStars}) => {
    const possibleNumbers = _.range(1, 10).filter(number => usedNumbers.indexOf(number) === -1 );
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateDoneStatus = () => {
    this.setState(prevState => {
      if(prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Well done, u won!' };
      }
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'You lost, maybe next time :(' }
      }
    })
  }

  restartGame = () => this.setState(Game.initialState());

  render() {
    const {
      selectedNumbers,
      numberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus,
    } = this.state;
    return (
      <div className="container">
        <h3>Play nine!</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button selectedNumbers={selectedNumbers}
            checkEqual={this.checkEqual}
            answerIsCorrect={answerIsCorrect} 
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}/>
          <Answer selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber} />
          <br />
          <br />

          {
            doneStatus ?
              <DoneFrame restartGame={this.restartGame} doneStatus={doneStatus}/> :
              <Numbers selectedNumbers={selectedNumbers}
              selectNumber={this.selectNumber}
              usedNumbers={usedNumbers} />
          }
        </div>
      </div>
    );
  }
}

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map(i =>
        <i className="fa fa-star" key={i}></i>
      )}
    </div>
  )
}

const Button = (props) => {
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button = <button className="btn btn-success" onClick={props.acceptAnswer}>
        <i className='fa fa-check'></i>
      </button>
      break;
    case false:
      button = <button className="btn btn-danger">
        <i className='fa fa-times'></i>
      </button>
      break;
    default:
      button = <button className="btn"
        disabled={props.selectedNumbers.length === 0}
        onClick={props.checkEqual}>
        =
      </button>
      break;
  }

  return (
    <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm" 
        onClick={props.redraw}
        disabled={props.redraws === 0}>
        <i className="fa fa-refresh"></i>
        {`  ${props.redraws}`}
      </button>
      <br /><br />
    </div>
  )
}

const Answer = (props) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) =>
        <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
      )}
    </div>
  )
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
  }

  return (
    <div className="card text-center col-12">
      <div>
        {Number.list.map((number, i) =>
          <span key={i} className={numberClassName(number)}
            onClick={() => props.selectNumber(number)}>
            {number}
          </span>
        )}
      </div>
    </div>
  )
}

const DoneFrame = (props) => {
  return(
    <div className="col-12 text-center">
      <h3>{props.doneStatus}</h3>
      <button className="btn btn-secondary" onClick={props.restartGame}>Restart</button>
    </div>
  )
}

Number.list = _.range(1, 10); // w ten sposób deklarować wsztkie const które są niezmienne dla wszzystkich instancji 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
