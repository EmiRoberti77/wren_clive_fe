import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
interface DemographicsData {
  [key: string]: {
    Male: number;
    Female: number;
    unknown: number;
  };
}

function gender_split(data: DemographicsData): number[] {
  const out:number[]=[0,0,0];
  const keys:string[] = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
      out[0]=out[0]+data[keys[i]]["Male"];
      out[1]=out[1]+data[keys[i]]["Female"];
      out[2]=out[2]+data[keys[i]]["unknown"];
  }
return out;
}

let updateGenderChartData: React.Dispatch<any>;
export function updateGenderChart(data:DemographicsData):void{
  const series1:number[]= gender_split(data);
  updateGenderChartData(series1);
  console.log({message:"updated Gender!",data:series1});

}
export const ApexGenderPieChart = () => {
  const chartRef = useRef(null);
  const [series, setSeries1] = useState<any>([45, 55]);
  updateGenderChartData=setSeries1;

  useEffect(() => {
    const options = {
      series: series,
      chart: {
        
        type: 'pie',
      },
      labels: ['Male', 'Female', 'Unknown'],
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
      colors: ["#3861F3", "#F555F5","#808080"],
      stroke: {
        show: false, // Add this property to remove the stroke
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
