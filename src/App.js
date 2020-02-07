import React, { Component } from 'react';
import './App.css';
import MenuContainer from './components/MenuContainer';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movie 
    }
  }

  render() {
    return (
      <div className="App">
        <MenuContainer />
      </div>
    )
  }
  
}

export default App;
