import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../util/customAxios';

//비동기함수
export const BoardViewService = {
  /**
   * Get board
   */
  getBoard: createAsyncThunk('board/getBoard', async ({ number }: { number: string }, thunkApi) => {
    const { data } = await customAxios('get', `/board/view?number=${number}`, {});
    console.log(data);
    return data;
  }),
};

interface UserStateInterface {
  index: string;
  title: string;
  content: string;
}

let initialState: UserStateInterface = {
  index: '',
  title: '',
  content: '',
};

const board = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BoardViewService.getBoard.pending, (state, actions) => {})
      .addCase(BoardViewService.getBoard.fulfilled, (state, actions) => {
        state.index = actions.payload.index;
        state.title = actions.payload.title;
        state.content = actions.payload.content;
        console.log(actions.payload);
      });
  },
});
export let {} = board.actions;

export default board.reducer;
