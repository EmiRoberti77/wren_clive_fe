import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';

interface DemographicsData {
  [key: string]: {
    Male: number;
    Female: number;
    unknown: number;
  };
}

function age_split(data: DemographicsData): number[] {
  const out: number[] = [];
  const keys: string[] = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    out.push(data[keys[i]]["Male"] + data[keys[i]]["Female"] + data[keys[i]]["unknown"]);
  }
  return out;
}

let updateAgeChartData: React.Dispatch<any>;
export function updateAgeChart(data: DemographicsData): void {
  const series2: number[] = age_split(data);
  updateAgeChartData(series2);
  console.log({ message: "updated Age!", data: series2 });
}

export const AgeSeriesChart = () => {
  const chartRef = useRef(null);

  const [series, setSeries2] = useState<any>([45, 55, 60, 40, 34, 75, 30, 48]);
  updateAgeChartData = setSeries2;

  useEffect(() => {
    const options = {
      series: series,

      chart: {
        type: 'pie',
      },
      labels: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },

        },
      }],
      //colors: ['#0047FF','#1657FF','#4176FF','#3C72FF','#5F8BFF','#7DA2FF','#96B3FF','#B2C8FF'],
      stroke: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: (value: number, { seriesIndex, dataPointIndex }: { seriesIndex: number, dataPointIndex: number }) => {
            const label = options.labels[dataPointIndex];
            const seriesValue = options.series[seriesIndex];
            return `${seriesValue}`;
          }
        }
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [series]);

  return <div id="chart" ref={chartRef}></div>;
};
