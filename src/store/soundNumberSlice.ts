//View컴포넌트에서 useEffect를 사용하는것으로 변경하여 현재 사용하지않는 파일임
import { createSlice } from '@reduxjs/toolkit';

let initialState: number = 0;

const SoundNumber = createSlice({
  name: 'SoundNumber',
  initialState,
  reducers: {
    SoundNumberDispatch(state: number, action) {
      //[{id:'zxc',socketId:'1234'},{id:'qwe',socketId:'4555'},{id:'asd',socketId:'1222'}];
      return action.payload;
    },
  },
});
export let { SoundNumberDispatch } = SoundNumber.actions;

export default SoundNumber.reducer;
