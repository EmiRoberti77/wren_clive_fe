import React from 'react'
import { PosRow } from '../state/features/PosSlice'

interface PosReceiptItem {
  posrow:PosRow
}

const PosReceiptItem:React.FC<PosReceiptItem> = ({posrow}) => {

  function formatRRP(num:number) {
    const result = Math.floor(num / 100 * 100) / 100;
    return parseFloat(result.toFixed(2));
  }


  return (
    <tr style={{textAlign:'center'}}>
      <td>{posrow.txn_num}</td>
      <td>{posrow.item_sku}</td>
      <td>{posrow.subgrp_id}</td>
      <td>{posrow.item_desc}</td>
      <td>{formatRRP(posrow.item_value_rrp).toLocaleString('en-UK',{ style:'currency',currency:'GBP'})}</td>    
    </tr>
  )
}

export default PosReceiptItem