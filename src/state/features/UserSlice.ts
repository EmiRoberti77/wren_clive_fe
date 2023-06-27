import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  userid: number;
  company: string;
  policy: string;
  rights: string;
  name: string;
  surname: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  date: string | null;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
  },
});

export default UserSlice.reducer;
export const { addUser } = UserSlice.actions;
