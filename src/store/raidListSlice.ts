//View컴포넌트에서 useEffect를 사용하는것으로 변경하여 현재 사용하지않는 파일임
import { createSlice } from '@reduxjs/toolkit';

export interface RaidListInterface {
  monsterName: string;
  raidDifficulty: string;
  raidCode: string;
  type: string;
  date: string;
  deleteDate: string;
  etcText: string;
  optionList: string;
  socketId: string;
}

// let initialState: RaidListInterface[] | null = [
//   {
//     monsterName: '',
//     raidDifficulty: '',
//     raidCode: '',
//     type: '',
//     date: '',
//     deleteDate: '',
//     raidText: '',
//     raidOption: '',
//   },
// ];
let initialState: RaidListInterface[] | [] = [];

const RaidList = createSlice({
  name: 'RaidList',
  initialState,
  reducers: {
    RaidListDispatch(state: RaidListInterface[], action) {
      console.log('소켓테스트에서 스토어가 받아온 값');
      console.log(action.payload);
      return (state = [...action.payload]);
    },
  },
});
export let { RaidListDispatch } = RaidList.actions;

export default RaidList.reducer;
