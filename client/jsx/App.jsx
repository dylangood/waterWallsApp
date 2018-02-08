import React from 'react';
import style from '../styles/App.css';
import WaterWallsDisplay from './WaterWallsDisplay.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      waterWallsData: [],
      textEntry: ''
    };
    this.convertWWData = this.convertWWData.bind(this);
    this.updateTextEntry = this.updateTextEntry.bind(this);
  }

  updateTextEntry(e) {
    this.setState({ textEntry: e.target.value });
  }
  
  convertWWData() {
    let heights = this.state.textEntry.split(',').map( height => { return height.trim(); });
    fetch(`http://localhost:1717/api/tests/mapAllTroughs/cases/${heights[0]}`).then(res => {
      return res.json();
    }).then( waterWallsData => {
      let blocks = waterWallsData.map( position => position.blocks );
      let water = waterWallsData.map( position => position.water );
      this.setState({ waterWallsData: [blocks, water] });
    });
  }

  render() {
    return (
      <div className="app">
        <input onChange={this.updateTextEntry}></input>
        <button onClick={this.convertWWData}>Render Water Walls</button>
        <p></p>
        <WaterWallsDisplay waterWallsData={this.state.waterWallsData} />
      </div>
    );
  }
}