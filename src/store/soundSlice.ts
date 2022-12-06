//View컴포넌트에서 useEffect를 사용하는것으로 변경하여 현재 사용하지않는 파일임
import { createSlice } from '@reduxjs/toolkit';

let initialState: boolean = false;

const Sound = createSlice({
  name: 'Sound',
  initialState,
  reducers: {
    SoundtDispatch(state: boolean, action) {
      //[{id:'zxc',socketId:'1234'},{id:'qwe',socketId:'4555'},{id:'asd',socketId:'1222'}];
      return true;
    },
    SoundtFalseDispatch(state: boolean, action) {
      //[{id:'zxc',socketId:'1234'},{id:'qwe',socketId:'4555'},{id:'asd',socketId:'1222'}];
      return false;
    },
  },
});
export let { SoundtDispatch, SoundtFalseDispatch } = Sound.actions;

export default Sound.reducer;
