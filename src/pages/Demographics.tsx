import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './css/demographics.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Chart Import
import { SentimentChart } from '../components/Charts/SentimentChart';
import { AGMainChart, updateBarChart } from '../components/Charts/AGChart';
import {
  ApexGenderPieChart,
  updateGenderChart,
} from '../components/Charts/ApexGenderChart';
import {
  AgeSeriesChart,
  updateAgeChart,
} from '../components/Charts/AgeSeriesChart';
import dayjs, { Dayjs } from 'dayjs';

import { useAppSelector } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { Page } from '.';

//Endpoint
import axios from 'axios';
import {
  getDemographicsData,
  getDemographicsEndpoint,
} from '../components/endpoint/demographic_endpoint';
import { number } from 'prop-types';

const Demographics = () => {
  // Login Cred..
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(Page.LOGIN);
  }, []);

  const [loading, setLoading] = useState(false); // Loading state

  function AgeDropDown() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function LocationLevelDD() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>London</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function LocationDD() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Store 1</MenuItem>
            <MenuItem value={20}>Store 2</MenuItem>
            <MenuItem value={30}>Store 3</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function GenderDD() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Male</MenuItem>
            <MenuItem value={20}>Female</MenuItem>
            <MenuItem value={30}>Unknown</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function AgeRangeDD() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>0-9</MenuItem>
            <MenuItem value={20}>10-19</MenuItem>
            <MenuItem value={30}>30-39</MenuItem>
            <MenuItem value={30}>40-49</MenuItem>
            <MenuItem value={30}>50-59</MenuItem>
            <MenuItem value={30}>60-69</MenuItem>
            <MenuItem value={30}>70+</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  let Empcolorselect: string;

  function EmployeeColorDD() {
    const [EmpColor, setEmpColor] = React.useState('None');

    const handleChange = (event: SelectChangeEvent) => {
      setEmpColor(event.target.value);
      Empcolorselect = event.target.value;
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={EmpColor} onChange={handleChange} displayEmpty>
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Green'}>Green</MenuItem>
            <MenuItem value={'Yellow'}>Yellow</MenuItem>
            <MenuItem value={'Red'}>Red</MenuItem>
            <MenuItem value={'Blue'}>Blue</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  // From Date Picker

  const [FromDate, setFromDate] = useState<Dayjs | null>(dayjs('2023-06-01'));

  function FromDatepicker() {
    const handleFromDateChange = (newValue: Dayjs | null) => {
      setFromDate(newValue);
    };

    return (
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="From-date-picker"
            value={FromDate}
            onChange={handleFromDateChange}
            defaultValue={dayjs('2023-06-01')}
          />
        </LocalizationProvider>
      </div>
    );
  }

  // To Date Picker

  const [ToDate, setToDate] = useState<Dayjs | null>(dayjs('2023-06-05'));

  function ToDatepicker() {
    const handleToDateChange = (newValue: Dayjs | null) => {
      setToDate(newValue);
    };

    return (
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="To-date-picker"
            value={ToDate}
            onChange={handleToDateChange}
            defaultValue={dayjs('2023-06-01')}
          />
        </LocalizationProvider>
      </div>
    );
  }

  interface ButtonProps {
    onClick: () => void;
    label: string;
  }

  const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
    return <button onClick={onClick}>{label}</button>;
  };

  let demographicInstance: string;

  const handleClick = async () => {
    setLoading(true); // Set loading state to true

    console.log('Button clicked');
    if (FromDate && ToDate) {
      if (!Empcolorselect) {
        Empcolorselect = 'None';
      }

      console.log({ SelectedColor: Empcolorselect });
      const endpoint = getDemographicsEndpoint(
        '209.97.128.90',
        '5000',
        FromDate.format('DD-MM-YYYY'),
        ToDate.format('DD-MM-YYYY'),
        Empcolorselect
      );

      const success = await getDemographicsData(endpoint);
      // data = success.heatmap_data;

      console.log(success);
      updateBarChart(success);
      updateAgeChart(success);
      updateGenderChart(success);

      //AGMainChart(success);
    }

    setLoading(false); // Set loading state to false after data is updated
  };

  return (
    <div className="main-container">
      <div className="top-container">
        <div className="top-content">
          <div className="Title">
            <span className="title-demographic">Demographics</span>
          </div>
          <div className="refresh-button">
            <Button onClick={handleClick} label="Generate" />
          </div>
        </div>
      </div>

      <div className="DropDownContainer">
        <div className="FromDate" id="fromdate">
          <span className="datePickerLabel">From Date</span>
          <FromDatepicker />
        </div>
        <div className="ToDate" id="todate">
          <span className="datePickerLabel">To Date</span>
          <ToDatepicker />
        </div>
        <div className="DD">
          <span className="dropdown-label">LocationLevel</span>
          <LocationLevelDD />
        </div>
        <div className="DD">
          <span className="dropdown-label">Location</span>
          <LocationDD />
        </div>
        <div className="DD">
          <span className="dropdown-label">Gender</span>
          <GenderDD />
        </div>
        <div className="DD">
          <span className="dropdown-label">AgeRange</span>
          <AgeRangeDD />
        </div>
        <div className="DD">
          <span className="dropdown-label">Exclude Employee</span>
          <EmployeeColorDD />
        </div>
      </div>
      {/* Charts */}
      <div className="Chart_Container">
        {/* Bar Chart 1 */}
        <div className="chart_1">
          <span className="charttitle">Age & Gender Split</span>
          <AGMainChart />
        </div>
        {/* Pie Chart 2 */}
        <div className="chart_2">
          <span className="charttitle">Age Split</span>
          {/* <AgePieChart/> */}
          <div className="chartCss">
            <AgeSeriesChart />
          </div>
        </div>
        {/* Pie Chart 3 */}
        <div className="chart_3">
          <span className="charttitle">Gender Split</span>
          {/* <GenderChart/> */}
          <div className="chartCss">
            <ApexGenderPieChart />
          </div>
        </div>
      </div>

      <div className="Chart_Container2 ">
        <SentimentChart />
      </div>

      {loading && (
        <div className="loading-screen">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Demographics;

//RK
