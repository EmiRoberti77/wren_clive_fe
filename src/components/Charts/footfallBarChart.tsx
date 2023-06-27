import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { colors } from "@mui/material";

interface ApexChartProps {}

interface ApexChartState {
  series: ApexAxisChartSeries;
  options: ApexOptions;
}

export class FFBarChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      series: [
        {
          name: 'IN',
          data: [44, 55, 67, 30, 80 ]
        },
        {
          name: 'OUT',
          data: [53, 32, 62, 35, 20]
        },
        
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
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
                  fontWeight: 900
                }
              }
            }
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: ''
        },
        xaxis: {
          categories: ["Front South", "Front West", " Front East", "Rear East", " Rear North"],
          labels: {
            formatter: function (val: any) {
              return val ;
            },
            style: {
              colors: ['#ffffff'] // Set the text fill color of x-axis labels to white
            }
            
          }
        },
        yaxis: {
          title: {
            text: undefined
          },
          labels: {
            style: {
              colors: ['#ffffff'] // Set the text fill color of x-axis labels to white
            }
          },
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + "K";
            }
          }
        },
        fill: {
          opacity: 1
          
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
          
        }
      }
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}


