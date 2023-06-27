export interface Door {
  count:number,
  count_in:number,
  count_out:number,
  count_tot:number
}

export interface PeopleCount {
  date:number
  time:number
  value:string
  storeid:number
  geo:number
  location:number
}

export interface PeopleCountTotals {
  area:number
  continent:number
  country:number
  date:string
  region:number
  store:number
  tot_in:number
  tot_out:number
}

export const PEOPLECOUNT_ENDPOINT_GETCOUNT = (
  url:string,
  port:string,
  datestart:string,
  timestart:string,
  timestop:string,
  storeid:number
) => {
   return `http://${url}:${port}/api/v1/peoplecounting/getcount?`
   + `datestart=${datestart}&timestart=${timestart}&datestop=${datestart}`
   + `&timestop=${timestop}&storeid=${storeid}`
}

//http://localhost:3000/api/v1/peoplecounting/totals?startdate=2023-03-05&stopdate=2023-03-07&site=21
export const PC_ENDPOINT_GETTOTALS = (
  url:string,
  port:string,
  fromdate:string,
  todate:string,
  siteid:number
) => {
  return  `http://${url}:${port}/api/v1/peoplecounting/totals?` +
          `startdate=${fromdate}&`+
          `todate=${todate}&` +
          `site=${siteid}`
}

export const PC_ENDPOINT_GETTOTALS_BY_COLUMN = (
  url:string,
  port:string,
  fromdate:string,
  todate:string, 
  column:string, 
  id:number
) => {
  return  `http://${url}:${port}/api/v1/peoplecounting/gettotalsdaybycolumn?` +
          `startdate=${fromdate}&todate=${todate}&column=${column}&id=${id}`
}

export const PC_ENDPOINT_GETTOTALSUM = (
  url:string,
  port:string,
  fromdate:string,
  todate:string,
  column:string,
  id:number
) => {
  return  `http://${url}:${port}/api/v1/peoplecounting/gettotalsby?`+
          `column=${column}&id=${id}&startdate=${fromdate}&todate=${todate}`
}

export const getPeopleCountData = async (endpoint:string) => {
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

      const data:PeopleCount[] = await response.json();
      return data
  }catch(error){
    console.log(error);
    return []
  }
}

export const getPeopleCountTotals = async (endpoint:string) => {
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

      const data:PeopleCountTotals[] = await response.json();
      return data
  }catch(error){
    console.log(error);
    return []
  }
}