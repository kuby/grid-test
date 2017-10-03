import React, { Component } from 'react'
import Grid from './Grid'
import { getComponentById } from './common'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid components={getComponentById} />
      </div>
    );
  }
}

export default App;
