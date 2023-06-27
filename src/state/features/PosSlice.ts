import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PosRow {
  store_id:        string;
  txn_id:          string;
  txn_num:         string;
  txn_time:        string;
  txn_date:        string;
  staff_id:        string;
  till_id:         string;
  cust_id:         null;
  cust_id_type:    string;
  pay_method_type: string;
  pay_method_code: string;
  gift_rcpt:       string;
  boo_exception:   number;
  item_txn_type:   string;
  nor_indicator:   number;
  item_sku:        string;
  subgrp_id:       string;
  item_desc:       string;
  item_value_rrp:  number;
  disc_type:       string;
  disc_code:       null;
  disc_rate:       null;
  disc_value:      null;
  sundry_code:     null;
}

export interface PosState {
  posrows:PosRow[]
}

const initialState:PosState = {
  posrows : []
}

export const PosSlice=createSlice({
  name:'pos',
  initialState,
  reducers:{
    addPosQuery:(state, action:PayloadAction<{posrows:PosRow[]}>)=>{
      console.log('in addPosQuery')
      console.log(action.payload.posrows)
      state.posrows = action.payload.posrows
      
    }
  }
})

export default PosSlice.reducer;
export const {addPosQuery} = PosSlice.actions;

