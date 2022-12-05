//View컴포넌트에서 useEffect를 사용하는것으로 변경하여 현재 사용하지않는 파일임
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../util/customAxios';

//비동기함수
export const UserListViewService = {
  /**
   * Get UserList
   */
  getUserList: createAsyncThunk('UserList/getUserList', async ({ number }: { number: string }, thunkApi) => {
    const { data } = await customAxios('get', `/UserList/view?number=${number}`, {});
    console.log(data);
    return data;
  }),
};

interface UserListInterface {
  id: string;
  socketId: string;
}

let initialState: UserListInterface[] = [
  {
    id: '',
    socketId: '',
  },
];

const UserList = createSlice({
  name: 'UserList',
  initialState,
  reducers: {
    connectedUser(state: UserListInterface[], action) {
      //[{id:'zxc',socketId:'1234'},{id:'qwe',socketId:'4555'},{id:'asd',socketId:'1222'}];
      console.log(action.payload);
      return (state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserListViewService.getUserList.pending, (state, actions) => {})
      .addCase(UserListViewService.getUserList.fulfilled, (state, actions) => {
        console.log(actions.payload);
      });
  },
});
export let { connectedUser } = UserList.actions;

export default UserList.reducer;
