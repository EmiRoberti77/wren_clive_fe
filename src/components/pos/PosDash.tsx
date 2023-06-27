import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/pos.css'
import { useAppSelector } from '../../state/store';
import { Link } from 'react-router-dom';
import { Page } from '../../pages';
import PosSlice, { PosRow } from '../../state/features/PosSlice';

interface PosDashProps {
  onResultUpdate:()=>void;
}

//on-line collection       3 
//on-line return           4
//in-store sale            1
//in-store return          2
//in-store order           5
const transcationType = ['in-store sale', 'in-store return', 'on-line collection', 'on-line return', 'in-store order']
const custIdType = ['Online', 'In Store']

const PosDash:React.FC<PosDashProps> = ({onResultUpdate}) => {

  const { posrows } = useAppSelector((state) => state.pos);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(posrows.length / itemsPerPage)
  );
  const pagesToShow = 10;
  const pageOffset = Math.floor(pagesToShow / 2);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const rowsToShow = posrows.slice(startIndex, endIndex);
  
  useEffect(() => {
    setTotalPages((state) => Math.ceil(posrows.length / itemsPerPage));
    console.log(
      `startIndex ${startIndex}, currentPage ${currentPage}, totalPages ${totalPages}`
    );
  }, [posrows]);

  const pageRangeStart = Math.max(1, currentPage - pageOffset);
  const pageRangeEnd = Math.min(totalPages, currentPage + pageOffset);
  const pages = Array.from({ length: pageRangeEnd - pageRangeStart + 1 }, (_, i) => i + pageRangeStart);

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

  const handleClick = (pos: PosRow) => {
    const width = 800;
    const height = 500;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
  
    window.open(
      `${Page.POSTRANSAC}?${new URLSearchParams({row:JSON.stringify(pos)})}`,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,alwaysRaised=yes`
    );
  };

  return (
    <>
    <div>
      <table>
        <thead style={{textAlign:'center'}}>
          <tr>
             <th key='1'>Row</th>
             <th key='2'>Account</th>
             <th key='3'>online/store</th>
             <th key='4'>store</th>
             <th key='5'>transaction type</th>
             <th key='6'>Txn num</th>
             <th key='7'>date</th>
             <th key='8'>time</th>
             <th key='9'>till&nbsp;&nbsp;&nbsp;</th>
             <th key='10'>Staff id</th>
             <th key='11'>Value</th>
             <th key='12'>SKU</th>
             <th key='14'>Desc</th>
          </tr>
        </thead>
        <tbody>
        {
         rowsToShow.map((pos, index)=>{
           return <tr>
             <td><button className='rbutton'
              onClick={()=>handleClick(pos)}
             >R</button></td>
             <td>{pos.cust_id ? pos.cust_id : 'none'}</td>
             <td>{custIdType[parseInt(pos.cust_id_type)]}</td>
             <td>{pos.store_id}</td>
             <td>{transcationType[parseInt(pos.item_txn_type)-1]}</td>
             <td>{pos.txn_num}</td>
             <td>{pos.txn_date}</td>
             <td>{convertime(pos.txn_time)}</td>
             <td>{pos.till_id}</td>
             <td>{pos.staff_id}</td>
             <td className={pos.item_value_rrp < 0 ? 'negative-value' : 'positive-value'}>
               {formatRRP(pos.item_value_rrp).toLocaleString('en-UK',{
               style:'currency',
               currency:'GBP'
             })}</td>
             <td>{pos.item_sku ? pos.item_sku : 'none'}</td>
             <td>{pos.item_desc ? pos.item_desc : 'none'}</td>
           </tr>
         })
        }
        </tbody>
      </table>
      <div>
      total results:{totalPages * itemsPerPage} total pages:{totalPages} current page:{currentPage}
      
      <div className='pagebutton-container' >
      {pages.map((page) => (
      <button className='rbutton' key={page} onClick={() => setCurrentPage(page)}>
        {page === currentPage ? "*" : page}
      </button>
    ))}
      </div>
    </div>
    </div>
    </>
  )
}

export default PosDash