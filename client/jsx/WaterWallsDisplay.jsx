import React from 'react';
import Chart from 'chart.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let blockColors = this.props.blocks.map( (block, i) => { 
      if (this.props.largestTrough) {
        return i === this.props.largestTrough[0] - 1 || i === this.props.largestTrough[1] - 1 
        ? 'black' 
        : 'rgba(100, 100, 100, 0.5)'; 
      } else {
        return 'rgba(100, 100, 100, 0.5)';
      }
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
          backgroundColor: 'rgba(0, 255, 255, 0.4)',
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
            stacked: true,
            barPercentage: 1.25,
          }],
          yAxes: [{
            stacked: true,
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