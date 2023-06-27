import { TabContainerProps } from "react-bootstrap";

export interface tbl_geo_locations {
  sys_int_geo_loc_id:    string;
  sys_int_geo_type_id:   string;
  sys_int_parent_loc_id: string;
  clnt_str_geo_loc_name: string;
  clnt_str_geo_loc_code: string;
  sys_active_from:       Date;
  sys_active_to:         Date;
  cust_fld_001:          string;
  cust_fld_002:          string;
}

export const getContinets = (
  url:string,
  port:string,
  sys_int_geo_type_id:number
) => {
  return  `http://${url}:${port}/api/v1/geo/` +
          `getcontinents?sys_int_geo_type_id=${sys_int_geo_type_id}`
}

export const getSys_int_parent_loc_id = (
  url:string,
  port:string,
  sys_int_parent_loc_id:number
) => {
  return  `http://${url}:${port}/api/v1/geo/` +
          `getparent_loc_id?sys_int_parent_loc_id=${sys_int_parent_loc_id}` 
}

export const getGeoEndpoint = async (endpoint:string):Promise<tbl_geo_locations[]> => {
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

      const data:tbl_geo_locations[] = await response.json();
      return data

  }catch(err){
    console.log(err)
    return [] as tbl_geo_locations []
  }
}