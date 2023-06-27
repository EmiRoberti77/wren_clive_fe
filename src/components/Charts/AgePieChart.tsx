import React from "react";
import { Chart } from "react-google-charts";

const number=1;

export const data = [
  ["Age", "Percentage"],
  ["0-16", 10],
  ["17-23", 15],
  ["24-30", 26],
  ["31-36", 12],
  ["37-43", 11],
  ["44-50", 8],
  ["51-60", 10],
  ["60+", 8]
];

export const options = {
  backgroundColor: "transparent",
  is3D: true,
  legend: {
    textStyle: {
      color: "white",
      numberFormat: "#,##%"
    },
    
    
  
  },

};

export function AgePieChart() {
  return (
    <Chart
    className="AgePieChart"
      chartType="PieChart"
      data={data}
      options={options}
    />
  );
}
