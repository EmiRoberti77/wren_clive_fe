export const getCurrentDate = ():string =>{
  const today = new Date();
  const d = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`
  console.log(d)
  return d;
}

//converts format in->08:00 to out->80000 for endpoint use
export const formatTime = (time:string):string => {
  time = time.replaceAll(':','');
  if(time.startsWith('0',0)){
    time = time.slice(1)
  }

  return time + '00';
}

export const formatDateValue = (date:string):string => {
  if(date.startsWith('0')){
    return date.slice(1)
  }
  return date
}