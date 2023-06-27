import React, { useEffect, useState } from 'react'
import { PosRow } from '../state/features/PosSlice'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import PosReceiptItem from './PosReceiptItem'
import { Page } from '.';
import './css/transacpage.css'
import {
  getTransactionByTxn_id,
  getPosData
} from '../components/pos/api/dataendpoints'
import { server } from '../components/general/apihost';
import Posvideo from '../components/pos/api/Posvideo';

const getPayCode = (code:string):string =>{
  switch(code){
    case '1':
      return 'AmericanExpress'
    case '2':
      return 'Cash'
    case '3':
      return 'Card'
    case '4':
      return 'Collection'
    case '5':
      return 'DIREXCH'
    case 'A':
      return 'American Express'
    case 'B':
      return 'Electron Card'
    case 'C':
      return 'Gift Card Sterling'
    case 'D':
      return 'Maestro'
    case 'E':
        return 'Master Card'
    case 'F':
        return 'MCard Debit'
    case 'G':
      return 'Store Card'
    case 'H':
      return 'Visa Credit'
    case 'I':
       return 'Visa Debit'
    case 'J':
      return 'IFC'
    default:
      return 'No payment code'
  }
}

interface PosTransacProps {}

const PosTransacPage:React.FC<PosTransacProps> = () => {

  //const { posrows } = useAppSelector(state => state.pos)
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const [posItem, setPosItem] = useState<PosRow>(JSON.parse(query.get('row')!))
  const [posreciept, setPosreceipt] = useState<PosRow[]>([])
  const [video, setVideo] = useState<boolean>(false)
  const navigate = useNavigate()
  const totalValues:number[] = []

  useEffect(()=>{
    console.log('reciept page on top', window.top)
    window.focus();
    window.resizeTo(700, 600)
    //call api to get all reciept data
    const getReciptData = async () => {
      const rows  = await getPosData(getTransactionByTxn_id(
        server.host,
        server.port,
        posItem.txn_date,
        posItem.txn_id
      ))

      setPosreceipt(state => rows!)
      console.log(posreciept)
    }
    
    getReciptData()
  },[])

  const goBack = () => {
   navigate(Page.POSPAGE)   
  }

  function formatRRP(num:number) {
    const result = Math.floor(num / 100 * 100) / 100;
    return parseFloat(result.toFixed(2));
  }

  const convertime = (timeString:string) =>{
    // Extract hours, minutes, and seconds substrings
    if(timeString.length == 5)
      timeString = '0' + timeString

    const hours = timeString.substr(0, 2);
    const minutes = timeString.substr(2, 2);
    const seconds = timeString.substr(4, 2);
    
    // Create a Date object with the extracted values
    const time = new Date();
    time.setHours(Number.parseInt(hours));
    time.setMinutes(Number.parseInt(minutes));
    time.setSeconds(Number.parseInt(seconds));
    
    return time.toLocaleTimeString()
  }

  const onDisplayVideo = () => {
    setVideo(state => !video)
    if(video){
      window.resizeTo(700, 600)
    } else {
      window.resizeTo(1280, 700)
    }
  }

  return (
    <div className='container'>
      <div className={video ? 'column1_open' : 'column1_close'}>
      <div className='reciept-main'>
        <div className='reciept-main-logo'>
          <img src='/shoplogo.png' height={105} width={340}/>              
        </div>
        <p></p>
        <div><h4>Store:{posItem.store_id}</h4></div>
        <p></p>
        <div>date:{posItem.txn_date}&nbsp;-&nbsp;{convertime(posItem.txn_time)}</div>
        <div>Transaction id:{posItem.txn_id}</div>
        <div>Staff id:</div>
        
        
        <table>
          <thead>
            <tr style={{textAlign:'center'}}>
              <th>txt num</th>
              <th>sku</th>
              <th>sub id</th>
              <th>desc</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
          {posreciept.map((item, index)=>{
              totalValues.push(item.item_value_rrp)
              return  <PosReceiptItem posrow={item}/>
            })}
          </tbody>
        </table>
        <div className='paymenttype'>Payment methods:{getPayCode(posItem.pay_method_code)}</div>
        <div className='totalprice'>
        debit my account with : {
                                  formatRRP(totalValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
                                  .toLocaleString('en-UK',{
                                                            style:'currency',
                                                            currency:'GBP'})}
        </div>
        <div className='staffandtill'>
            STAFF ID {posItem.staff_id} - TILL {posItem.till_id}                          
        </div>
        <button
          className='videobtn' 
          onClick={()=>onDisplayVideo()}>{video ? '<' : '>'}</button>
      </div>
      </div>
      <div className='column2'>
        { video && <Posvideo  videoPath='/till1.mp4'/> }
      </div>
    </div>
  )
}

export default PosTransacPage