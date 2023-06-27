import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Gender", "Percentage"],
  ["Male", 70],
  ["Female", 30]
];

export const options = {
  backgroundColor: "transparent",
  is3D: true,
  legendTextStyle: {
    color: "white"
  },
  colors: ["#3366cc","#F555F5"] // Set transparent color for the "Gender" column
};

export function GenderChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
     
    />
  );
}


