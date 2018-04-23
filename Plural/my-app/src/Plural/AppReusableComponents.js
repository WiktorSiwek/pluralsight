import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Button extends Component {

  handleClick = () => {
    this.props.onClickFunction(this.props.value);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        +{this.props.value}
        </button>
    )
  }
}

const Result = (props) => {
  return (
    <div>{props.counter}</div>
  )
}


class App extends Component {
  state = { counter: 0 };

  increment = (value) => {
    this.setState((prevState) => ({
      counter: prevState.counter + value
    }))
  }

  render() {
    return (
      <div className="App">
        <Button value={1} onClickFunction={this.increment} />
        <Button value={10} onClickFunction={this.increment} />
        <Button value={100} onClickFunction={this.increment} />
        <Button value={1000} onClickFunction={this.increment} />
        <Result counter={this.state.counter} />
      </div>
    );
  }
}

export default App;

//code formatting shift + alt + f
