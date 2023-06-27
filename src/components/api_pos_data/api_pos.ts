import { Posdata } from '../../data/PosModule';

export interface AI_Server {
  ip:string;
  port:number;
} 

export const AIServer: AI_Server = {
  ip:'127.0.0.1',
  port:5000
}

export const ENDPOINT = () => 'http://127.0.0.1:5000/api/users';

export const ENDPOINT_URL_INDI = (ip:string, port:number) => `http://${ip}:${port}/api/pos/indicator`

export const ENDPOINT_URL_DRFLAS = (ip:string, port:number) => `http://${ip}:${port}/api/pos/drflag`

// const apipath = http://127.0.0.1:5000/api/pos/indicator/
//INDICATOR 0 || 1 , TRANS_TSTARTTIME h:m:s example = 80000 
export const POSALL_AFTER_HOUR_INDICATOR_TODAY = (
  apipath:string,
  startimte:string, //210000
  stoptime:string,  //80000
  sday:string, 
  smomth:string,
  syear:string,
  eday:string, 
  emomth:string,
  eyear:string,
  indicator:string, //1
  ) => `${apipath}?SMONTH=${smomth}&SDAY=${sday}&SYEAR=${syear}&EMONTH=${emomth}&EDAY=${eday}&EYEAR=${eyear}&TRANS_TIME_START=${startimte}&TRANS_TIME_STOP=${stoptime}&RETURN_INDICATOR=${indicator}`;

//DR_FLAG P / R / 0
// const apipath = http://127.0.0.1:5000/api/pos/dir_flag/
export const POSALL_AFTERHOURS_DIR_FLAG_DATEPERIOD = (
  apipath:string,
  startimte:string, 
  stoptime:string,  
  sday:string, 
  smomth:string,
  syear:string,
  eday:string, 
  emomth:string,
  eyear:string,
  dr_flag1:string,  //p
  dr_flag2:string,  //r
) => `${apipath}?SMONTH=${smomth}&SDAY=${sday}&SYEAR=${syear}&EMONTH=${emomth}&EDAY=${eday}&EYEAR=${eyear}&TRANS_TIME_START=${startimte}&TRANS_TIME_STOP=${stoptime}&DIR_FLAG1=${dr_flag1}&DIR_FLAG2=${dr_flag2}`;

//SELECT * FROM [dbo].[TP_ExternalSDJan  19 2023] 
//WHERE (TRANS_TIME<80000 OR TRANS_TIME>210000) AND (DIR_FLAG = 'P' OR DIR_FLAG = 'R'

export const POSALL_TIMEPERIOD = 'http://127.0.0.1:5000/api/pos/indicator?TRANS_TIME_START=${startimte}&TRANS_TIME_STOP=80000&RETURN_INDICATOR=1'

export const getPosData = async (endpoint:string):Promise<Posdata[]> => {
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
      return data as Posdata[]
  }catch(error){
    console.log(error);
    return [];
  }
}