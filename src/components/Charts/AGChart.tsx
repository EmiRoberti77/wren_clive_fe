import { render } from "react-dom";
import React, { PureComponent, Component, useState } from "react";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";
import Demographics from "../../pages/Demographics";

interface DemographicsData {
  [key: string]: {
    Male: number;
    Female: number;
    unknown: number;
  };
}

interface Age_Gender_OutputFormat {
  "Male": number[];
  "Female": number[];
  "unknown": number[];
}

function age_gender_bar(data: DemographicsData): Age_Gender_OutputFormat {
  const male: number[] = [];
  const female: number[] = [];
  const unknwn: number[] = [];
  const keys: string[] = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    male.push(data[keys[i]]["Male"]);
    female.push(data[keys[i]]["Female"]);
    unknwn.push(data[keys[i]]["unknown"]);
  }
  return { "Male": male, "Female": female, "unknown": unknwn };
}

interface AGMainChartProps {
  data: DemographicsData;
}
let updateChartData: React.Dispatch<any>;
export function updateBarChart(data:DemographicsData):void{
  const series:Age_Gender_OutputFormat= age_gender_bar(data);
  updateChartData([
    {
      name: "Male",
      data: series['Male'],
    },
    {
      name: "Female",
      data: series['Female'],
    },
  ]);
  console.log("updated!")

}
export function AGMainChart(): JSX.Element {
  //const Seriesdata: Age_Gender_OutputFormat = age_gender_bar(data);
  const [series, setSeries] = useState<any>([
    {
      name: "Male",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: "Female",
      data: [3, 60, 35, 80, 49, 70, 20, 81],
    },
  ]);
  updateChartData=setSeries;

  const options = {
    colors: ["#3861F3", "#F555F5"],
    chart: {
      id: "Demographic-Chart",
    },
    xaxis: {
      categories: [
        "0-9",
        "10-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70+",
      ],
      labels: {
        style: {
          colors: "#ffffff", // Set x-axis labels color to white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff", // Set y-axis labels color to white
        },
      },
    },
    grid: {
      show: true, // Set to true to show grid lines
      borderColor: "#091552", // Set the color of the grid lines to white
      opacity: 0.1,
    },
  };

  /*const series = [
    {
      name: "Male",
      data: Seriesdata["Male"],
    },
    {
      name: "Female",
      data: Seriesdata["Female"],
    },
  ];*/

  return (
    <div className="AGChart_main">
      <div className="row">
        <div className="col-4">
          <Chart options={options} series={series} type="bar" width="420" />
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}