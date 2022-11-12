import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import customAxios from '../util/customAxios';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
//비동기함수
export const UserService = {
  /**
   * Get User
   */
  getUser: createAsyncThunk('user/getUser', async ({ id, pw }: { id: string; pw: string }, thunkApi) => {
    const { data } = await customAxios('post', '/login', { id, pw });
    console.log(data);
    return data;
  }),
};

export const UserServiceAutoLogin = {
  /**
   * Get User
   */
  getUserAutoLogin: createAsyncThunk('user/getUserAutoLogin', async ({ AT }: { AT: string }, thunkApi) => {
    const { data } = await customAxios('post', '/login/autologin', { AT });
    console.log(data);
    return data;
  }),
};

interface UserStateInterface {
  id: string;
  nickname: string;
  isLogin: boolean;
}

let initialState: UserStateInterface = {
  id: '',
  nickname: '',
  isLogin: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeNickname(state: UserStateInterface, actions) {
      console.log(actions);
      state.nickname = 'john';
      state.id = actions.payload.nick;
      state.isLogin = true;
    },
    logout(state: UserStateInterface) {
      state.isLogin = false;
      state.id = '';
      state.nickname = '';
      cookies.remove('AT');
      cookies.remove('RT');
      cookies.remove('id');
      cookies.remove('nickname');
      localStorage.removeItem('AT');
      localStorage.removeItem('RT');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserService.getUser.pending, (state, actions) => {
        console.log('getUser가 펜딩중');
      })
      .addCase(UserService.getUser.fulfilled, (state, actions) => {
        //actions의 인자
        // meta : 요청에 담아 보낸 데이터, 요청아이디, 요청상태
        // payload : 요청결과로 받아온 응답데이터
        console.log('getUser가 풀필드');
        console.log(state);
        console.log(actions);
        console.log(actions.meta);
        console.log(actions.payload);
        //로그인이 정상적이면 여기에 AT와 RT가 들어있다.
        localStorage.setItem('AT', actions.payload.AT);
        localStorage.setItem('RT', actions.payload.RT);
        state.isLogin = actions.payload.isLogin;
        state.id = actions.payload.id;
        state.nickname = actions.payload.nickname;
        //엑시오스 헤더에 AT를 담아둔다.
        //엑시오스 헤더에 id도 담아둔다?
        console.log(actions.payload.id);
        axios.defaults.headers.common['Authorization'] = actions.payload.AT;
        axios.defaults.headers.common['Authorization2'] = actions.payload.RT;
        axios.defaults.headers.common['Id'] = actions.payload.id;
        console.log(document.cookie);
      })
      .addCase(UserService.getUser.rejected, (state) => {
        console.log('getUser가 리젝티드');
      })
      .addCase(UserServiceAutoLogin.getUserAutoLogin.pending, (state, actions) => {
        console.log('자동로그인 시도');
      })
      .addCase(UserServiceAutoLogin.getUserAutoLogin.fulfilled, (state, actions) => {
        console.log('자동로그인 완료');
        console.log(actions);
        console.log(actions.payload);
        state.isLogin = actions.payload.isLogin;
        state.id = actions.payload.id;
        state.nickname = actions.payload.nickname;
      });
  },
});
export let { changeNickname, logout } = user.actions;

export default user.reducer;
