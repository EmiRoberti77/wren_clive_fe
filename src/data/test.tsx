import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface DataPoint {
  timestamp: number;
  datetime: string;
  'Door Count 1': number;
  'Door Count 1+': number;
  'Door Count 1-': number;
  'Door Count 1*': number;
  'Door Count 2': number;
  'Door Count 2+': number;
  'Door Count 2-': number;
  'Door Count 2*': number;
}

const data: DataPoint[] = [
  { timestamp: 1679356800, datetime: '2023-03-21 00:00:00', 'Door Count 1': 20, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 20, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
  { timestamp: 1679357700, datetime: '2023-03-21 00:15:00', 'Door Count 1': 19, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 20, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
  { timestamp: 1679356800, datetime: '2023-04-21 00:00:00', 'Door Count 1': 40, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 19, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
  { timestamp: 1679357700, datetime: '2023-04-21 00:15:00', 'Door Count 1': 35, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 31, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
  { timestamp: 1679356800, datetime: '2023-05-21 00:00:00', 'Door Count 1': 40, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 19, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
  { timestamp: 1679357700, datetime: '2023-05-21 00:15:00', 'Door Count 1': 35, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 31, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
  { timestamp: 1679356800, datetime: '2023-06-21 00:00:00', 'Door Count 1': 40, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 19, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
  { timestamp: 1679357700, datetime: '2023-06-21 00:15:00', 'Door Count 1': 35, 'Door Count 1+': 0, 'Door Count 1-': 0, 'Door Count 1*': 11130, 'Door Count 2': 31, 'Door Count 2+': 0, 'Door Count 2-': 0, 'Door Count 2*': -10375 },
];

const formatData = (data: DataPoint[]) => {
  return data.map((d) => ({
    name: d.datetime,
    'Door Count 1': d['Door Count 1'],
    'Door Count 2': d['Door Count 2'],
  }));
};

const LineChartComponent:React.FC = () => {
  const formattedData = formatData(data);
  return (
    <LineChart width={600} height={300} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Door Count 1" stroke="#8884d8" />
      <Line type="monotone" dataKey="Door Count 2" stroke="#82ca9d" />
    </LineChart>
  );
};

export default LineChartComponent;
