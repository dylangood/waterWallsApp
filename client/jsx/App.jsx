import React from 'react';
import style from '../styles/App.css';
import WaterWallsDisplay from './WaterWallsDisplay.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      blocks: [],
      water: [],
      largestTrough: [],
      textEntry: '',
    };
    this.convertWWData = this.convertWWData.bind(this);
    this.updateTextEntry = this.updateTextEntry.bind(this);
  }

  updateTextEntry(e) {
    this.setState({ textEntry: e.target.value });
  }
  
  convertWWData() {
    let heights = this.state.textEntry.split(',').map( height => { return 1 * height.trim(); });
    let payload = {heights};
    fetch('http://localhost:1717/api/mapAllTroughs', { 
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload),
    }).then(res => res.json()
    ).then( data => {
      let waterWallsData = data.troughMap;
      let blocks = waterWallsData.map( position => position.blocks );
      let water = waterWallsData.map( position => position.water );
      this.setState({ blocks, water });
      return blocks;
    });
    fetch('http://localhost:1717/api/largestTrough', { 
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload),
    }).then(res => res.json()
    ).then( data => {
      let largestTrough = data.largestTrough;
      this.setState({largestTrough});
    });
  }

  render() {
    return (
      <div className="app">
        <input onChange={this.updateTextEntry}></input>
        <button onClick={this.convertWWData}>Render Water Walls</button>
        <p></p>
        <WaterWallsDisplay blocks={this.state.blocks} water={this.state.water} largestTrough={this.state.largestTrough} />
      </div>
    );
  }
}