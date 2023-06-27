import { PosRow } from "../../../state/features/PosSlice"

//2023-03-01 -> Mar72023
const converDate = (datestr:string):string => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const timeSplit = datestr.split('-')
  const year = timeSplit[0]
  const month = months[Number.parseInt(timeSplit[1]) -1 ]
  const day = parseInt(timeSplit[2])
  return `${month}${day}${year}`
}

export const GETCUST_BY_ID = (
  ip:string, 
  port:number,
  tablenames:string[],
  starttime:string,
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
  max:string='200' 
  ) => {
    var till_id_param = '&till_id='+till_id
    var store_id_param = '&store_id='+store_id
    var staff_id_param = '&staff_id='+staff_id
    var indicator_param = '&indicator='+indicator
    var payment_method_code = '&payment_method_code='+payment_method_code
    var transactionValue_param = `&transactionValue=`+transactionValue
    var sku_param = `&sku=`+sku
    var itemGrouping_param = `&itemGrouping=`+itemGrouping
    var desc_param = `&desc=`+desc
    var tex_num_param = `&txn_num=`+txn_num

  const endpoint = `http://${ip}:${port}/api/v1/pos/getcust_id_type?tablenames=` +
  `${tablenames}&starttime=${starttime}&stoptime=${stopTime}` +
  `${till_id_param}` +
  `${store_id_param}` + 
  `${staff_id_param}` + 
  `${indicator_param}` +
  `${payment_method_code}` +
  `${sku_param}` +
  `${itemGrouping_param}` +
  `${desc_param}` +
  `${transactionValue_param}&cust_id_type=${cust_id_type}`+
  `${tex_num_param}&max=${max}`

  console.log(endpoint)

  return endpoint
}

export const getTransactionByTxn_id = (
  ip:string,
  port:string,
  date:string,
  txn_id:string
) => {
  console.log('date from getTransactionByTxn_id=',date)
  console.log('converted date=', converDate(date))
  return `http://${ip}:${port}/api/v1/pos/gettxn_id?date=${converDate(date)}&txn_id=${txn_id}`
}

export const getPosData = async (endpoint:string) => {
  try{
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
      })

      if(!response.ok){
        throw new Error('Network Error:Code:emi:23')
      }

      const data = await response.json();
      console.log(data);
      return data as PosRow[];
  }catch(error){
    console.log(error);
  }
}