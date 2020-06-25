import React, {Component, component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
      error: false,
    };

    this.decrementCounter = this.decrementCounter.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  decrementCounter() {
    if (this.state.counter === 0){
      this.setState( { error: true })
    }
    else {
      this.setState( { counter: this.state.counter - 1 })
    }
  }

  incrementCounter() {
    if (this.state.error === true){
      this.setState({ error: false })
    }
    this.setState({ counter: this.state.counter + 1 })
  }
  render() {
    return (
      <div data-test="component-app">
      <h1 data-test="counter-display">{this.state.counter}</h1>
      {this.state.error &&
      <h1 data-test="error-display">ERROR!!!</h1> }
      <button
        data-test="increment-button"
        onClick={this.incrementCounter}
      >
        Button dude
      </button>
      <button
        data-test="decrement-button"
        onClick={this.decrementCounter}
      >
        Button dude 2
      </button>
    </div>
  );
  }
}

export default App;
