import { configureStore} from "@reduxjs/toolkit";
import UserSlice from "./features/UserSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import PosSlice from "./features/PosSlice";

const store = configureStore({
  reducer:{
    user:UserSlice,
    pos:PosSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//custom hook
export const useAppDispatch:()=>AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector

export default store;