//View컴포넌트에서 useEffect를 사용하는것으로 변경하여 현재 사용하지않는 파일임
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import customAxios from '../util/customAxios';

let initialState: number = 0;

const UserCount = createSlice({
  name: 'UserCount',
  initialState,
  reducers: {
    userCountDispatch(state: number, action) {
      //[{id:'zxc',socketId:'1234'},{id:'qwe',socketId:'4555'},{id:'asd',socketId:'1222'}];
      console.log(action.payload);
      return (state = action.payload);
    },
  },
});
export let { userCountDispatch } = UserCount.actions;

export default UserCount.reducer;
