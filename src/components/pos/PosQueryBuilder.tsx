import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppSelector } from '../../state/store'
import './css/pos.css'
interface PosQueryBuilderProps {
  onRunQuery:(
    startDate:string,
    stopDate:string,
    startTime:string,
    stopTime:string,
    cust_id_type:string,
    till_id:string,
    store_id:string,
    staff_id:string, 
    indicator:string,
    payment_method_code:string,
    transactionValue:string,
    sku:string,
    itemGrouping:string,
    brand:string,
    txn_num:string,
    Limit:string,
    )=>void;
}  

const PosQueryBuilder:React.FC<PosQueryBuilderProps> = ({onRunQuery}) => {

  const getTodaysDate = ():string =>{
    const today = new Date()
    return `${today.getFullYear()}` + '-' +
    `${(today.getMonth() + 1).toString().padStart(2,'0')}` + '-' +
    `${today.getDate().toString().padStart(2,'0')}`
  }

  const {posrows}= useAppSelector((state)=>state.pos)
  const [cust_id_type, setCust_id_type] = useState<string>('1')
  const [store_id, setStore_id] = useState<string>('any')
  const [startDate, setStartDate] = useState<string>(getTodaysDate())
  const [startTime, setStartTime] = useState<string>('09:00')
  const [stopDate, setStopDate] = useState<string>(getTodaysDate())
  const [stopTime, setStopTime] = useState<string>('18:00')
  const [errorMessage, setErrorMessage] = useState('')
  const [till_id, setTill_id] = useState('any')
  const [staff_id, setStaff_id] = useState('any')
  const [inidicator, setIndicator] = useState('any')
  const [payment_method_code, setPayment_method_code] = useState('any')
  const [itemSKU, setItemSKU] = useState('any')
  const [locationid, setLocationID] = useState('any')
  const [brand, setBrand] = useState('any')
  const [itemGrouping, setItemGrouping] = useState('any')
  const [txn_num, setTxn_num] = useState('any')
  const [transactionValue, setTransactionValue] = useState('any')

  useEffect(()=>{
    
    //setStartDate(state=>getTodaysDate().replace(':','')+'00')))
    //setStopDate(state=>getTodaysDate())

    console.log(startDate, stopDate)
  },[])



  const onRunQueryAction = () => {
    if(!validateInputs())
      return
    
      onRunQuery(
        startDate,
        startTime.replace(':','') + '00',
        stopDate,
        stopTime.replace(':','') + '00', 
        till_id,
        store_id,
        staff_id,
        inidicator,
        payment_method_code,
        cust_id_type,
        transactionValue,
        itemSKU,
        itemGrouping,
        brand,
        txn_num,
        '300'
      )

      setErrorMessage('')
  }

  const validateInputs = () => {
    if(!startDate){
      setErrorMessage('missing start date')
      return false;
    }

    if(!stopDate){
      setErrorMessage('missing stop date')
      return false;
    }

    if(!startTime){
      setErrorMessage('missing start time')
      return false;
    }

    if(!stopTime){
      setErrorMessage('missing start date')
      return false;
    }

    if(!cust_id_type){
      setErrorMessage('missing cust_id_type')
      return false;
    }

    if(!store_id){
      setErrorMessage('missing store id')
      return false;
    }

    if(!till_id){
      setErrorMessage('missing till id')
      return false;
    }

    if(!inidicator){
      setErrorMessage('missing indicator')
      return false;
    }

    if(!staff_id){
      setErrorMessage('missing staff id')
      return false;
    }

    if(!itemSKU){
      setErrorMessage('missing itemSKU')
      return false;
    }

    if(!locationid){
      setErrorMessage('missing locationid')
      return false;
    }

    if(!brand){
      setErrorMessage('missing brand')
      return false;
    }

    if(!itemGrouping){
      setErrorMessage('missing itemGrouping')
      return false;
    }

    if(!txn_num){
      setErrorMessage('missing txn_num')
      return false;
    }

    if(!transactionValue){
      setErrorMessage('missing transactionValue')
      return false;
    }
    
    if(!payment_method_code){
      setErrorMessage('missing payment_method_code')
      return false;
    }

    if(startTime >= stopTime){
      setErrorMessage('stop time needs to be greater then start time')
      return false;
    }

    if(new Date(startDate) > new Date(stopDate) ){
      setErrorMessage('start date is greater then stop date')
    }

    return true;
  }
  const onTimeChange = (e:ChangeEvent<HTMLInputElement>) => {
      console.log('onTimeChange',e.target.value)
  }

  return (
    <div style={{fontSize:'12px'}}>
      <ul className='no-bullet'>
        <div>Start date & time</div>
        <li key='datestart'>
          <input 
            value={startDate}
            type='date' 
            onChange={(e)=>{
              onTimeChange(e)
              setStartDate(state => e.target.value)
            }}/>    
        <input 
        type='time' 
        value={startTime}
        onChange={(e)=>setStartTime(state => e.target.value)}/>     
        </li>
        <div>Stop data & time</div>
        <li key='datestop'>
          <input 
            type='date' 
            value={stopDate}
            onChange={(e)=>setStopDate(state => e.target.value)}/>   
         <input 
            type='time' 
            value={stopTime}
            onChange={(e)=>setStopTime(state => e.target.value)}/>    
        </li>
        <div>Till id</div>
        <li key='till_id'>
          <input 
            value={till_id}
            placeholder='till id'
            type='text' 
            onChange={(e)=>setTill_id(e.target.value)}/>     
        </li>
        <div>Sale or Return</div>
        <li key='indicator'>
          <select onChange={(e)=>setIndicator(e.target.value)}>
              <option value='any'>Any</option>
              <option value='0'>Sale</option>
              <option value='1'>Return</option>
           </select>
        </li>
        <div>Customer type</div>
        <li key='cust_id_type'>
          <select  onChange={(e)=>setCust_id_type(e.target.value)}>
              <option value='any'>Any</option>
              <option value='0'>Online</option>
              <option value='1'>In Store</option>
           </select>   
        </li>
        <div>Location</div>
        <li key='location'>
          <input 
            value={locationid}
            type='text' 
            disabled={true}
            onChange={(e)=>setLocationID(e.target.value)}/>     
        </li>
        <li key='txn_num'>
          <div>Txn number</div>
          <input 
            value={txn_num}
            type='text' 
            onChange={(e)=>setTxn_num(state => e.target.value)}/>     
        </li>
        <div>Item Group</div>
        <li key='item_group'>
          <input 
            value={itemGrouping}
            type='text' 
            onChange={(e)=>setItemGrouping(e.target.value)}/>     
        </li>
        <div>Store id</div>
        <li key='store_id'>
          <input 
            value={store_id}
            type='text' 
            onChange={(e)=>setStore_id(e.target.value)}/>     
        </li>
        <div>Staff id</div>
        <li key='staff_id'>
          <input 
            value={staff_id}
            type='text' 
            onChange={(e)=>setStaff_id(e.target.value)}/>     
        </li>
        <div>Payment method</div>
        <li key='payment_method_code'>   
        <select onChange={(e)=>setPayment_method_code(e.target.value)}>
              <option value='any'>any</option>
              <option value='1'>AmericanExpress</option>
              <option value='2'>Cash</option>
              <option value='3'>Card</option>
              <option value='4'>Collection</option>
              <option value='5'>DIREXCH</option>
              <option value='A'>American Express</option>
              <option value='B'>Electron Card</option>
              <option value='C'>Gift Card Sterling</option>
              <option value='D'>Maestro</option>
              <option value='E'>Master Card</option>
              <option value='F'>Master Card Debit</option>
              <option value='G'>Store Card</option>
              <option value='H'>Visa Credit</option>
              <option value='I'>Visa Debit</option>
              <option value='J'>IFC</option>
           </select>
        </li>
        <div>Description</div>
        <li key='item_desc'>
          <input 
            value={brand}
            type='text' 
            onChange={(e)=>setBrand(e.target.value)}/>     
        </li>
        <hr/>
        <div>Item SKU</div>
        <li key='item_sku'>
          <input 
            value={itemSKU}
            type='text' 
            onChange={(e)=>setItemSKU(e.target.value)}/>     
        </li>
        <hr />
        <div>Transaction value</div>
        <li key='transaction_value'> 
           <select  onChange={(e)=>setTransactionValue(e.target.value)}>
              <option value='any'>Any</option>
              <option value='g500:any'>sale over £5</option>
              <option value='g1000:any'>sale over £10</option>
              <option value='g1500:any'>sale over £15</option>
              <option value='g2000:any'>sale over £20</option>
              <option value='g3000:any'>sale over £30</option>
              <option value='g4000:any'>sale over £40</option>
              <option value='g1000:l2000'>sale over £10 & less £20</option>
              <option value='g1500:l3000'>sale over £15 & less £30</option>
              <option value='g2000:l4000'>sale over £20 & less £40</option>
              <option value='g3000:l4000'>sale over £30 & less £40</option>
              <option value='g4000:l10000'>sale over £40 & less £100</option>
              <option value='l-1000:any'>return over £10</option>
              <option value='l-3000:any'>return over £30</option>
              <option value='l-5000:any'>return over £50</option>
              <option value='l-7000:any'>return over £70</option>
              <option value='l-10000:any'>return over £100</option>
           </select>    
        </li>
        <hr />
        <li key='client_not_prsent'>
          <label>Customet not present</label> 
          <input type='checkbox' id="person-check" name='check' value="customer not present" />
        </li>
        <hr />
        <li key='runquery'>
          <button className='findButton' onClick={()=>onRunQueryAction()}>Find</button>
        </li>
      </ul>
      <p style={{color:'red'}}>{errorMessage}</p>
    </div>
  )
}

export default PosQueryBuilder