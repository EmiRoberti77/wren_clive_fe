import React, { useEffect } from 'react'
import PosDash from '../components/pos/PosDash'
import { useNavigate } from 'react-router-dom'
import { Page } from '.'
import PosQueryBuilder from '../components/pos/PosQueryBuilder'
import {
  GETCUST_BY_ID,
  getPosData
} from '../components/pos/api/dataendpoints'
import { useAppDispatch, useAppSelector } from '../state/store'
import {PosRow, addPosQuery} from '../state/features/PosSlice'
import './css/pospage.css'
import { server } from '../components/general/apihost'

const enum Month {
  JAN = 'Jan',
  FEB = 'Feb',
  MAR = 'Mar',
  APR = 'Apr',
  MAY = 'May',
  JUN = 'Jun',
  JUL = 'Jul',
  AUG = 'Aug',
  SEP = 'Sep',
  OCT = 'Oct',
  NOV = 'Nov',
  DEC = 'Dec'
}

const getCalendarMonth = (date:Date):string =>{
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var month_str;

  switch(month){
    case 1:
      month_str = Month.JAN
      break
    case 2:
      month_str = Month.FEB
      break
    case 3:
      month_str = Month.MAR
      break
    case 4:
      month_str = Month.APR
      break
    case 5:
      month_str = Month.MAY
      break
    case 6:
      month_str = Month.JUN
      break
    case 7:
      month_str = Month.JUL
      break
    case 8:
      month_str = Month.AUG
      break
    case 9:
      month_str = Month.SEP
      break
    case 10:
      month_str = Month.OCT
      break
    case 11:
      month_str = Month.NOV
      break
    case 12:
      month_str = Month.DEC
      break
  }

  return `${month_str}${day}${year}`
}

const subractDays = (startDate:string, stopDate:string):number => {
  const start:Date = new Date(startDate)
  const stop:Date = new Date(stopDate)
  const difMillies = stop.getTime() - start.getTime()
  const days = difMillies / 86400000
  return days
} 

const getTableArray = (start:string, stop:string) => {
  const startDate = new Date(start)
  const stopDate = new Date(stop)
  console.log(startDate, stopDate)
  const difMillis = stopDate.getTime() - startDate.getTime()
  const days = difMillis / 86400000
  console.log('days dif', days)

  const dateArray = []
  for(var i=0; i<days; i++){
    const newDay = getCalendarMonth( new Date( startDate.getTime() + i * 86400000) ) 
    dateArray.push(newDay)
  }

  return dateArray
}

interface PosPageProps {}
 
const PosPage:React.FC<PosPageProps> = () => {

  const dispatch = useAppDispatch()
  const {posrows} = useAppSelector((state)=>state.pos)

  const updateResults = () => {
    console.log('UPDATING POSROWS')
  }
  
  const onRunQuery = async (
    startDate:string,
    startTime:string,
    stopDate:string,
    stopTime:string,
    till_id:string,
    store_id:string,
    staff_id:string,
    indicator:string,
    payment_method_code:string,
    cust_id_type:string,
    transactionValue:string,
    sku:string,
    itemGrouping:string,
    desc:string,
    txn_num:string,
    limit:string
    ) => {
    // const formattedStartDate = getCalendarMonth(startDate)
    // const formatetdStopDate = getCalendarMonth(stopDate)
    const datesArray = getTableArray(startDate, stopDate)
    const daysdiff = subractDays(startDate, stopDate)
    var tableArray:any

    if(daysdiff == 0)
      tableArray = [getCalendarMonth( new Date(startDate))]
    else
      tableArray = getTableArray(startDate, stopDate)

    console.log(`query param=tables:${datesArray} daysdif=${daysdiff} starttime:${startTime} cust_id_type:${cust_id_type}`)

    const endpoint = GETCUST_BY_ID(
      server.host,
      Number.parseInt(server.port),
      tableArray,
      startTime,
      stopTime,
      till_id,
      store_id,
      staff_id,
      indicator,
      payment_method_code,
      cust_id_type,
      transactionValue,
      sku,
      itemGrouping,
      desc,
      txn_num,
      limit
    )

    console.log(endpoint)

    const rows = await getPosData(endpoint) as PosRow[]
    
    console.log(`rows.length:${rows.length}`)
    dispatch(addPosQuery({
      posrows:rows
    }))
    console.log('added pos/addPosQuery')
  }

  const {user} = useAppSelector((state)=>state.user)
  const navigate = useNavigate();
  
  return (
    <div className='maincontainer'>
      <div className='POSTopContainer'>
        <div className='TopContentPOS'>
          <div className='Title'>
            <span className='titlePOS'>POS</span>
          </div>
        </div>
      </div>
    <div className='background-main'>
      <table>
        <thead/>
        <tbody>
          <tr>
            <td className='querie-builder' >
              <PosQueryBuilder onRunQuery={onRunQuery}/>
            </td>
            <td className='results-table'>
              <PosDash onResultUpdate={updateResults} />
            </td>
          </tr>
        </tbody>
      </table>
    
    </div>
    </div>
  )
}

export default PosPage