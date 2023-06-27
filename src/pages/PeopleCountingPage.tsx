import React, { ChangeEvent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts'
import { 
  PC_ENDPOINT_GETTOTALS, 
  PC_ENDPOINT_GETTOTALSUM,
  PC_ENDPOINT_GETTOTALS_BY_COLUMN,
  PEOPLECOUNT_ENDPOINT_GETCOUNT, 
  PeopleCount, getPeopleCountData, 
  getPeopleCountTotals } from '../components/peoplecounting/peopleCount_endpoint';
import './css/PeopleCounting.css'
import { server } from '../components/general/apihost';
import { getContinets, getGeoEndpoint, getSys_int_parent_loc_id, tbl_geo_locations } from '../components/geo/geoendpoit';
import '../css/App.css'


interface DoorChart {
  //time:number
  countin:number
  countout:number
  name:string
}

interface doorCountGraphLegend {
  name:string
  colour:string
}

const doorCountGraphLegendArray: doorCountGraphLegend[] = [
  {
    name:'Door Count 1 in',
    colour:'gray'
  },
  {
    name:'Door Count 1 out',
    colour:'purple'
  },
  {
    name:'Door Count 2 in',
    colour:'blue'
  },
  {
    name:'Door Count 2 out',
    colour:'green'
  },
  {
    name:'Door Count 3 in',
    colour:'red'
  },
  {
    name:'Door Count 3 out',
    colour:'black'
  },
]

const selectoptions = [
  {value:'total', label:'total doors'},
  {value:'doors', lablel:'doors breakdown'}
]

const ANY = 'any'
interface PeopleCountingProps{}
const OPENINGTIMW:Number = 8000000

const enum times {
  OPENING = '80000',
  CLOSE = '220000'
}

const PeopleCountingPage = () => {

  const [peopleCount, setPeopleCount] = useState<any[]>([]) 
  const [doorCountNames, setDoorCountName] = useState<doorCountGraphLegend[]>([])
  const [barchat, setBarChart] = useState<boolean>(true)
  const [totalIn, setTotalIn] = useState<number>(0)
  const [totalOut, setTotalOut] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState('total')
  const [doorCountTotalInOutByTimePoint, setDoorCountTotalInOutByTimePoint] = useState<DoorChart[]>([])
  const [selectedDate, setSelectedDate] = useState(ANY)
  //const [storeId, setStoreId] = useState('20')
  const [totalTimePeriod, setTotalsTimePriod] = useState<number>(7)
  const [maxYvalueTotals, setMaxYValueTotals] = useState<number>(0)
  const [maxYvalueDoors, setMaxYValueDoors] = useState<number>(0)
  const [geoTypeId, setGeoTypeId] = useState(0)
  const [country, setCountry] = useState(0)
  const [area, setArea] = useState(-1)
  const [region, setRegion] = useState(-1)  
  const [store, setStore] = useState(-1)
  //const [devices, setDevices] = useState(0)
  const [continentsArray, setContinentsArray] = useState<tbl_geo_locations[]>([])
  const [countriesArray, setCountriesArray] = useState<tbl_geo_locations[]>([])
  const [areaArray, setAreaArray] = useState<tbl_geo_locations[]>([])
  const [regionArray, setRegionArray] = useState<tbl_geo_locations[]>([])
  const [storeArray, setStoreArray] = useState<tbl_geo_locations[]>([])

  const maxYValueArrayTotal:number[] = []
  const maxYValueArrayDoors:number[] = []

  useEffect(()=>{
    console.log('use effect mounting people counting')
    //get continent use memo hool as well to not load every time
    getContinents()
    console.log('change on totalTimePeriod', totalTimePeriod)

    return () => {
      console.log('unmounting')
    }

  },[totalTimePeriod, totalIn, totalOut])

  //CONTINENTS
  const getContinents = async () => {
    const endpoint = getContinets(
      server.host,
      server.port,
      1,
    )

    const result = await getGeoEndpoint(endpoint)
    setContinentsArray(state => result)
    console.log(result)
  }
  
  //COUNTRIES
  const getCountries = async (id:number) =>{

    const endpoint = getSys_int_parent_loc_id(
      server.host,
      server.port,
      id,
    )

    const result = await getGeoEndpoint(endpoint)
    console.log(endpoint)
    console.log(result)
    //setCountry(state => parseInt(result[0].sys_int_geo_loc_id))
    setCountriesArray(state => result)  
  }

  //AREAS
  const getArea = async (id:number) => {

    const endpoint = getSys_int_parent_loc_id(
      server.host,
      server.port,
      id,
    )

    const result = await getGeoEndpoint(endpoint)
    .then((res)=>{
      console.log('in then() for area')
      console.log(res)
      setAreaArray(state => res)  
      //setArea(state => parseInt(res[0].sys_int_geo_loc_id))
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //REGIONS
  const getRegion = async (id:number) =>{

    const endpoint = getSys_int_parent_loc_id(
      server.host,
      server.port,
      id,
    )

    const result = await getGeoEndpoint(endpoint)
    .then((res)=>{
      console.log('in .then()')
      //setRegion(state => parseInt(res[0].sys_int_geo_loc_id))
      setRegionArray(state => res)  
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  //STORES
  const getStores = async (id:number) =>{

    if(id === -1)
    {
      console.log('region id === -1 code will return')
      setRegion(-1)
      return
    }

    const endpoint = getSys_int_parent_loc_id(
      server.host,
      server.port,
      id,
    )

    const result = await getGeoEndpoint(endpoint)
    .then(res => {
      console.log(res)
      setStoreArray(state => res) 
      //setStore(parseInt(res[0].sys_int_geo_loc_id))
      console.log('get all stores for region_id=', id)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const onHandleDate = (e:ChangeEvent<HTMLInputElement>) =>{
    setSelectedDate(e.target.value)
  }

  const onFind = async () => {
    if(selectedDate === ANY || store === 0){
      console.log('missing querie param')
      return
    }

    if(totalTimePeriod === 0){
      console.log('incorrect total time period')
      return
    }

    switch(totalTimePeriod){
      case 1:
        //getDay();
        console.log("getDay() not implemented")
        return
      default:
        weeklyReport()
        return
    }
  }



  const mapData = async (peopleArray:PeopleCount[]):Promise<DoorChart[]> => {

    const peopleCount:any[] = []
    const dataAray:DoorChart[] = []

    const dataArray = peopleArray.map((row, i) =>{
      const doorsArray = row.value.split(':')
      
      var total_in_byTime:number = 0
      var total_out_byTime:number = 0
      

      const doorCountData =  doorsArray.map((door)=>{

        const dcValues = door.replace('[','').replace(']','').split(',')

        const peopleCountGraphPoint = {
          name: row.time.toString(),
          [dcValues[4]+' in']:dcValues[1],
          [dcValues[4]+' out']:dcValues[2]
        }

        //store all Y coordinates to get max value later
        maxYValueArrayDoors.push(Number.parseInt(dcValues[1]))
        maxYValueArrayDoors.push(Number.parseInt(dcValues[2]))

        //add total counts
        setTotalIn(state => state += Number.parseInt(dcValues[1]))
        setTotalOut(state => state += Number.parseInt(dcValues[2]))

       
        
        total_in_byTime += Number.parseInt(dcValues[1]) 
        total_out_byTime += Number.parseInt(dcValues[2]) 
        //store all Y coordinates to get max value later
        maxYValueArrayDoors.push(total_in_byTime)
        maxYValueArrayDoors.push(total_out_byTime)

        peopleCount.push(peopleCountGraphPoint)
      })

      const totCountGraphElement:DoorChart = {
          name:row.time.toString(),
          countin:total_in_byTime,
          countout:total_out_byTime
      }

      console.log(totCountGraphElement)
      dataAray.push(totCountGraphElement)

      setPeopleCount(state => peopleCount)

      console.log(doorCountTotalInOutByTimePoint)
    })

    setMaxYValueTotals(Math.max(...maxYValueArrayTotal))
    setMaxYValueDoors(Math.max(...maxYValueArrayDoors))

    return dataAray
  }

  const weeklyReport = async () => {
    console.log("const weeklyReport = async () => {")
    const fromDate = new Date(selectedDate)
    const toDate = new Date(fromDate)

    toDate.setDate(fromDate.getDate() + totalTimePeriod)
    console.log('fromdate', fromDate, 'todate', toDate)

    const fromDateStr =  `${fromDate.getFullYear()}-${fromDate.getMonth() + 1 }-${fromDate.getDate()}`
    const toDateStr = `${toDate.getFullYear()}-${toDate.getMonth() + 1 }-${toDate.getDate()}`

    console.log('fromDateStr', fromDateStr, 'toDateStr', toDateStr)

    var column = 'store'
    var id = store;

    if(store === -1){
      console.log('gone into R e g i o n mode')
      //go into region mode
      column = 'region'
      id = region

      if(region === -1){
        console.log('gone into A r e a mode')
        //go into area mode
        column = 'area'
        id = area
      }
    }

    

    const peopleCountToals = await getPeopleCountTotals(
        PC_ENDPOINT_GETTOTALS_BY_COLUMN(
        server.host,
        server.port,
        fromDateStr,
        toDateStr,
        column,
        id
      )
    )
    var highestYValue:number = 0

    let tIn:number = 0 
    let tOut:number = 0

    const doorChartArray = peopleCountToals.map((row)=>{
      var date:string = row.date
      //2023-03-06T00:00:00.000Z
      if(date.indexOf('T') > 0){
        date = date.split('T')[0]
      }

      const countRow:DoorChart = {
        countin:row.tot_in,
        countout:row.tot_out,
        name:date
      }

      //add counts
      tIn += Number.parseInt(row.tot_in.toString()) 
      console.log('countRow.countIn', countRow.countin)
      console.log('tIn', tIn)

      tOut += Number.parseInt(row.tot_out.toString()) 
      console.log('countRow.countOut', countRow.countout)
      console.log('tOut', tOut)

      maxYValueArrayTotal.push(countRow.countin)
      maxYValueArrayTotal.push(countRow.countout)

      console.log(countRow)
      return countRow
    })

    setMaxYValueTotals(Math.max(...maxYValueArrayTotal))

    console.log('highest value', highestYValue)
    console.log(peopleCountToals)
    setDoorCountTotalInOutByTimePoint(state => doorChartArray)
    console.log('tIn', tIn, 'tOut', tOut)
    console.log(totalIn, totalOut)
    setTotalIn(state => tIn)
    setTotalOut(state => tOut)
  }

  const getDay = () =>{

      const getPeopleCount = async () => {

        const endpoint = PEOPLECOUNT_ENDPOINT_GETCOUNT(
          server.host,
          server.port,
          selectedDate,
          times.OPENING,
          times.CLOSE,
          store //'20'
        )
        console.log(endpoint)

        const peopleCountArray = await getPeopleCountData(endpoint)

        setDoorCountName(state => doorCountGraphLegendArray)
        console.log(doorCountNames)
        mapData(peopleCountArray).then((success)=> {
          console.log('success', success)
          setDoorCountTotalInOutByTimePoint(state => success)
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    getPeopleCount()
  }

  return (
    <>    
     <div className='POSTopContainer'>
        <div className='TopContentPOS'>
          <div className='Title'>
            <span className='titlePOS'>FootFall</span>
          </div>
        </div>
      </div>
      <div className='main'>
        
      <div className='columns-container'>
        <div className='column1'>
          {/*Continent select drop box (1)*/}
          <select 
          value={1}
          className='select'
          name='continents_select' 
            onClick={()=>getCountries(1)}>

            {continentsArray.map((item)=>{
              return <option value={item.sys_int_geo_type_id}>{item.clnt_str_geo_loc_name}</option>
            })}
          </select>
          <hr />
          {/*Country select drop box (2)*/}
          <select 
            value={7}
            className='select'
            name='countries_select' 
            onClick={()=>getArea(7)}>
            {
              countriesArray.map((item)=>{
                return <option value={item.sys_int_parent_loc_id}>{item.clnt_str_geo_loc_name}</option>
              })
            }
          </select>
          <hr />
          {/*Area select drop box (3)*/}
          <select 
            className='select'
            name='area_select' 
            onChange={(e)=>{
              setArea(state => parseInt(e.target.value))
            }} 
            onClick={()=>getRegion(area)}>
            {
              areaArray.map((item)=>{
                return <option value={item.sys_int_geo_loc_id}>{item.clnt_str_geo_loc_name}</option>
              })
            }
          </select>
          <hr />
          {/*Region select drop box (4)*/}
          <select 
            className='select'
            name='region_select' 
            onChange={(e)=>{
                setRegion(state=>parseInt(e.target.value))
              }} 
              onClick={()=>getStores(region)}>
              <option value='-1'>None</option>
            {
              regionArray.map((item)=>{
                return <option value={item.sys_int_geo_loc_id}>{item.clnt_str_geo_loc_name}</option>
              })
            }
          </select>
          <hr />
          {/*Store select drop box (5)*/}
          <select 
            className='select'
            name='stores_select' 
            onChange={(e)=>{
              setStore(state=>parseInt(e.target.value))
              console.log('store',store,'e.target.value', e.target.value)
              }}>
              <option value='-1'>None</option>
            {
              
              storeArray.map((item)=>{
                return <option value={item.sys_int_geo_loc_id}>{item.clnt_str_geo_loc_name}</option>
              })
            }
          </select>
          <hr />
          <select 
            value='totals'
            className='select'>
            {/* <option value='total'>All Doors</option> */}
            <option value='doors'>Doors view</option>
          </select>
          <hr />
          <select
            className='select' 
            defaultValue={7}
            onChange={(e)=>setTotalsTimePriod(state => Number.parseInt(e.target.value))}>
            {/* <option value={1}>day</option> */}
            <option value={7}>week</option>
            <option value={30}>month</option>
            <option value={365}>year</option>
          </select>
          <hr />
          <input 
            className='select'
            type='date' 
            onChange={onHandleDate}
            />
          <hr />
          {/* <select
            className='select' 
            value={store}
            onChange={(e)=>setStoreId(e.target.value)}>
            <option value={store}>{store}</option>
            <option value={11}>Manchester</option>
            <option value={21}>London</option>
          </select> */}
          <hr />
          <button className='findButton' onClick={onFind}>Find</button>
        </div>
        <div className='column2'>  
          <LineChart 
            width={800} 
            height={600} 
            data={selectedOption === 'total' ? doorCountTotalInOutByTimePoint : peopleCount}
            margin={{top:5, right:30, left:10, bottom:5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='white'/>
            <YAxis domain={[0, selectedOption === 'total' ? maxYvalueTotals : maxYvalueDoors]} stroke='white' />
            <Tooltip />
            <Legend />
            {
              selectedOption === 'total' ? (
                <>
                  <Line type='monotone' dataKey='countin' stroke='white' strokeWidth={3} connectNulls={true} />
                  <Line type='monotone' dataKey='countout' stroke='red' strokeWidth={3} connectNulls={true} />
                </>
              ) :  doorCountNames.map(door => <Line type="monotone" dataKey={door.name} stroke={door.colour} connectNulls={true} /> )
            }
          </LineChart> 
          <p></p>
          <div className='chart_info' style={{
                textAlign: 'center',
                borderRadius: '10px',
                padding: '10px',
                color: 'black',
                backgroundColor: '#e5e5e5'}}>
            total In <b>{totalIn}</b> total Out <b>{totalOut}</b>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default PeopleCountingPage;
