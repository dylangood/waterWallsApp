import React from 'react';
import Chart from 'chart.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    let stackedBarChartData = {
      labels: new Array(this.props.blocks.length).fill(''),
      datasets: [
        {
          label: 'Blocks',
          backgroundColor: 'gray',
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