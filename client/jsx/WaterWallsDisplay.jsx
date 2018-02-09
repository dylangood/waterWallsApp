import React from 'react';
import Chart from 'chart.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let blockColors = this.props.blocks.map( (block, i) => { 
      return i === this.props.largestTrough[0] - 1 || i === this.props.largestTrough[1] - 1 
      ? 'black' 
      : 'rgba(100, 100, 100, 0.5)'; 
    });
    let stackedBarChartData = {
      labels: new Array(this.props.blocks.length).fill(''),
      datasets: [
        {
          label: 'Blocks',
          backgroundColor: blockColors,
          data: this.props.blocks,
        },
        {
          label: 'Water',
          backgroundColor: 'cyan',
          data: this.props.water,
        },
      ]
    };

    let myChart = new Chart('WWChart', {
      type: 'bar',
      data: stackedBarChartData,
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });

    return (
      <div className="water-walls-display">
        <canvas id="WWChart" hidden={this.props.blocks.length === 0} />
      </div>
    );
  }
}