export function getDemographicsEndpoint(
    url:string,
    port:string,
    sdate: string,
    edate: string,
    color:string
    

    
  ): string {
    return `http://${url}:${port}/api/demographics?sdate=${sdate}&edate=${edate}&color=${color}`;
  }
  
  export const getDemographicsData = async (endpoint: string): Promise<any> => {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        mode: 'cors',
      });
  
      if (!response.ok) {
        throw new Error('Network Error:Code:emi:23');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  