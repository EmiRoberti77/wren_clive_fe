export function getHeatMapendpoint (
  url,
  port,
  sdate,
  edate,
  stime, 
  etime,
  points,
  strenth,
  tablename
) {
  return `http://${url}:${port}/api/heatmaps?sdate=${sdate}&edate=${edate}&stime=${stime}&etime=${etime}&polygon=[${points}]&strength=${strenth}&tablename=${tablename}`;
}


export const getheatmapdata = async (endpoint) => {
  
  try {
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
      return data

  }catch(error){
    console.log(error);
  }
}