import React, { useEffect } from 'react'
import LineChartComponent from '../data/test'

const HeatPage1 = () => {
  useEffect(()=>{
    console.log('mounted heatpage 1')
  },[])
  
  return (
    <>
      <div>
       Heatmaps 1
      <hr />
      </div>
    </>
  )
}

export default HeatPage1