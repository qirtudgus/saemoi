//View컴포넌트에서 useEffect를 사용하는것으로 변경하여 현재 사용하지않는 파일임
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

interface BoardInterface {
  index: string;
  title: string;
  content: string;
}

let initialState: BoardInterface = {
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
