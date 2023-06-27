import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './css/SentimentChart.css'

interface ApexChartProps {}

interface ApexChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexCharts.ApexOptions;
}

export class SentimentChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      series: [
        {
          name: 'UnHappy',
          data: [20],
        },
        {
          name: 'Neutral',
          data: [30],
        },
        {
          name: 'Happy',
          data: [50],
        },
       
      ],
      options: {
        chart: {
          type: 'bar',
          height:350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                },
              },
            },
          },
        },
        stroke: {
          width: 0,
          colors: ['#fff'],
        },
        title: {
          text: 'Sentimental Analysis',
          style: {
            color: '#ffffff', // white color
            fontWeight:100,
            
          },
        },
        xaxis: {
          categories: [""],
          labels: {
            formatter: (val: any) => {
              return val + 'K';
            },
            style: {
              colors: "#ffffff", // Set y-axis labels color to white
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetX: 40,
          
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" className="SAchart-container">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={150}
        
          
        />
      </div>
    );
  }
}
