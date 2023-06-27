import React from "react";
import ReactApexChart from "react-apexcharts";
import './css/FootFallChart.css'

interface ApexChartProps {}

export const FFchart: React.FC<ApexChartProps> = () => {
  const series = [
    {
      name: 'Current Period',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Previous Period',
      data: [11, 32, 45, 32, 34, 52, 41],
      
    },
    
  ];

  const options: ApexCharts.ApexOptions = { // Specify the type explicitly
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
      
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      labels: {
        style: {
          colors: ['#ffffff'] // Set the text fill color of x-axis labels to white
        }
      },
      axisBorder: {
        color: '#ffffff' // Set the x-axis border color to white
      },
      axisTicks: {
        color: '#ffffff' // Set the x-axis tick color to white
      },
      
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
      
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#ffffff'] // Set the text fill color of y-axis labels to white
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
      
    }
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
        fill="#FFF"

      />
    </div>
  );
};

