import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="water-walls-display">
        WATER WALLS DISPLAY:
        <p>{this.props.waterWallsData[0]}</p>
        <p>{this.props.waterWallsData[1]}</p>
      </div>
    );
  }
}