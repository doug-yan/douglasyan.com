import React, { Component } from 'react';
import './App.css'
import Home from './components/Home/home';

class App extends Component {
  render() {
    return (
      <div className='opaque-layer'>
        <div className='page-container'>
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
