import React, { useEffect } from 'react';
import { useAppSelector } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { Page } from '.';
import './css/homepage.css';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import ChangingProgressProvider from '../components/progressbar/ChangingProgressProvider';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Line } from 'react-chartjs-2';

import { FFchart } from '../components/Charts/FootfallChart';

import { FFBarChart } from '../components/Charts/footfallBarChart';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  // Login Cred..
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(Page.LOGIN);
  }, []);

  //Home Page Code
  function SelectDIsplayProfile() {
    const [profile, setProfile] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setProfile(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={profile} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Profile 1</MenuItem>
            <MenuItem value={20}>Profile 2</MenuItem>
            <MenuItem value={30}>Profile 3</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function SelectTimeInterval() {
    const [timeInterval, setTimeInterval] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setTimeInterval(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={timeInterval} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>TI1</MenuItem>
            <MenuItem value={20}>TI2</MenuItem>
            <MenuItem value={30}>TI3</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function SelectLocationLevel() {
    const [locationLevel, setLocationLevel] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setLocationLevel(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={locationLevel} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>TI1</MenuItem>
            <MenuItem value={20}>TI2</MenuItem>
            <MenuItem value={30}>TI3</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  function SelectLocation() {
    const [location, setLocation] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setLocation(event.target.value);
    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={location} onChange={handleChange} displayEmpty>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>TI1</MenuItem>
            <MenuItem value={20}>TI2</MenuItem>
            <MenuItem value={30}>TI3</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  // Live Occupancy

  const LiveOccupancy: React.FC = () => {
    const renderCircularProgress = (value: number) => (
      <div style={{ width: '100px', height: '100px' }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: 'butt',
            trailColor: '#f2f2f2',
            textColor: '#fff',
            textSize: '16px',
            pathColor: '#0075FF',
          })}
        />
      </div>
    );

    return (
      <ChangingProgressProvider values={[80]}>
        {(value) => renderCircularProgress(value)}
      </ChangingProgressProvider>
    );
  };

  // Current Period

  const CurrentPeriod: React.FC = () => {
    const renderCircularProgress = (value: number) => (
      <div style={{ width: '100px', height: '100px' }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: 'butt',
            trailColor: '#f2f2f2',
            textColor: '#fff',
            textSize: '16px',
            pathColor: '#FFC700',
          })}
        />
      </div>
    );

    return (
      <ChangingProgressProvider values={[60]}>
        {(value) => renderCircularProgress(value)}
      </ChangingProgressProvider>
    );
  };

  // Previous Priod

  const PreviousPeriod: React.FC = () => {
    const renderCircularProgress = (value: number) => (
      <div style={{ width: '100px', height: '100px' }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: 'butt',
            trailColor: '#f2f2f2',
            textColor: '#fff',
            textSize: '16px',
            pathColor: '#24FF00',
          })}
        />
      </div>
    );

    return (
      <ChangingProgressProvider values={[120]}>
        {(value) => renderCircularProgress(value)}
      </ChangingProgressProvider>
    );
  };

  //This Period LAst Year
  const ThisPeriodLY: React.FC = () => {
    const renderCircularProgress = (value: number) => (
      <div style={{ width: '100px', height: '100px' }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          circleRatio={0.75}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: 'butt',
            trailColor: '#f2f2f2',
            textColor: '#fff',
            textSize: '16px',
            pathColor: '#8F00FF',
          })}
        />
      </div>
    );

    return (
      <ChangingProgressProvider values={[90]}>
        {(value) => renderCircularProgress(value)}
      </ChangingProgressProvider>
    );
  };

  //Footfall Chart

  return (
    <div className="home-main-container">
      {/* Sign in component
      <div className='Signin'>
      {user?.email} This is the home page 
      </div> */}

      {/* Home Page */}

      {/* Top Header + Search Bar + sign in & Settings */}
      <div className="home-top-container">
        <div className="home-top-content">
          <div className="Title">
            <span className="title-home">Home</span>
          </div>
        </div>
      </div>
      {/* Drop Downs */}
      <div className="home-DropDownContainer">
        <div className="AgeDD">
          <span className="DDtext">Select Display Profile</span>
          <SelectDIsplayProfile />
        </div>
        <div className="AgeDD">
          <span className="DDtext">Time Interval</span>
          <SelectTimeInterval />
        </div>
        <div className="AgeDD">
          <span className="DDtext">Location Level</span>
          <SelectLocationLevel />
        </div>
        <div className="AgeDD">
          <span className="DDtext">Location</span>
          <SelectLocation />
        </div>
      </div>

      {/* Footfall  */}
      <div className="home-top-container">
        <div className="home-top-content">
          <div className="Title">
            <span className="title-home">Footfall</span>
          </div>
        </div>
      </div>
      <div className="analytics-gauge-container">
        <div className="Gauge-card">
          <span>Live Occupancy</span>
          <LiveOccupancy />
          <div className="info">
            <span>info</span>
          </div>
        </div>
        <div className="Gauge-card">
          <span>Current Period</span>
          <CurrentPeriod />
          <span>info</span>
        </div>
        <div className="Gauge-card">
          <span>PreviousPeriod</span>
          <PreviousPeriod />
          <span>info</span>
        </div>
        <div className="Gauge-card">
          <span>This Period Last Year</span>
          <ThisPeriodLY />
          <span>info</span>
        </div>
      </div>

      <div className="footfall-container">
        <div className="footfall-chart">
          <span>Foot fall </span>
          <FFchart />
        </div>

        <div className="footfall-bargraph">
          <span>Foot fall Entrance</span>
          <FFBarChart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
