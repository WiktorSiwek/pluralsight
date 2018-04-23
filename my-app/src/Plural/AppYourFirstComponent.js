import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0};
  }


    // 2 funkcja zapobiega race condition
    // handleClick = () => {
    //   this.setState({
    //     counter: this.state.counter + 1
    //   })
    // }

    // handleClick = () => {
    //   this.setState((prevState) => {
    //     return {
    //       counter: prevState.counter + 1
    //     }
    //   })
    // }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>{this.state.counter}</button>
      </div>
    );
  }
}

export default App;
