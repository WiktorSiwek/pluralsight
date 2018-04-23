import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const Card = (props) => {
  return (
    <div className="container">
      <img width="75" height="75" src={props.avatar_url} />
      <div className="info">
        <div className="nameDiv">{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return(
    <div>
      {props.cards.map(card => <Card key={card.id} {...card}/>)}
    </div>
  )
}

class Form extends React.Component {
  state = { userName: '' }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Event: form submit', this.state.userName);
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({ userName: '' });
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="Github username"/>
        <button type="submit">Add card</button>
      </form>
    )
  }
}

class App extends Component {
  state = {
    cards: []
  }

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }))
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default App;

//code formatting shift + alt + f
