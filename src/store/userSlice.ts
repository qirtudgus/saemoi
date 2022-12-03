import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import customAxios from '../util/customAxios';
import { Cookies } from 'react-cookie';
import { io } from 'socket.io-client';
const port = process.env.REACT_APP_IO_SERVER_API as string;
const socket = io(port);

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
  logoutUser: createAsyncThunk('user/logoutUser', async (thunkApi) => {
    const { data } = await customAxios('post', '/login/logout');
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
    logout(state: UserStateInterface) {
      state.isLogin = false;
      state.id = '';
      state.nickname = '';
      cookies.remove('AT');
      cookies.remove('RT');
      cookies.remove('id');
      cookies.remove('nickname');
      socket.emit('users.count', { id: '로그아웃' }, (res: any) => {
        console.log('로그인 에밋 후');
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserService.logoutUser.fulfilled, (state, actions) => {
        console.log('로그아웃 시도');
        state.isLogin = actions.payload.isLogin;
        state.id = actions.payload.id;
        state.nickname = actions.payload.nickname;
        //로그아웃 시 아이디를 담아 전송
        socket.emit('users.count', { id: '로그아웃' }, (res: any) => {
          console.log('로그인 에밋 후');
        });
      })
      .addCase(UserService.logoutUser.rejected, (state, actions) => {
        console.log('로그아웃 실패');
      })
      .addCase(UserService.getUser.pending, (state, actions) => {
        console.log('getUser가 펜딩중');
      })
      .addCase(UserService.getUser.fulfilled, (state, actions) => {
        //로그인 성공 시
        //actions의 인자
        // meta : 요청에 담아 보낸 데이터, 요청아이디, 요청상태
        // payload : 요청결과로 받아온 응답데이터
        console.log('getUser가 풀필드');
        state.isLogin = actions.payload.isLogin;
        state.id = actions.payload.id;
        state.nickname = actions.payload.nickname;
        //엑시오스 헤더에 AT를 담아둔다.
        //엑시오스 헤더에 id도 담아둔다?
        console.log(actions.payload.id);
        console.log(document.cookie);
        //로그인 시 소켓에 아이디를 담아 전송
        socket.emit('users.count', { id: state.id }, (res: any) => {
          console.log('로그인 에밋 후');
        });
      })

      .addCase(UserService.getUser.rejected, (state) => {
        console.log('getUser가 리젝티드');
      })
      .addCase(UserServiceAutoLogin.getUserAutoLogin.pending, (state, actions) => {
        console.log('자동로그인 시도');
      })
      .addCase(UserServiceAutoLogin.getUserAutoLogin.fulfilled, (state, actions) => {
        //자동 로그인 성공 시
        console.log('자동로그인 완료');
        console.log(actions);
        console.log(actions.payload);
        state.isLogin = actions.payload.isLogin;
        state.id = actions.payload.id;
        state.nickname = actions.payload.nickname;
        //로그인 시 소켓에 아이디를 담아 전송
        socket.emit('users.count', { id: state.id }, (res: any) => {
          console.log('로그인 에밋 후');
          // dispatch(connectedUser([{ id, socketId: socket.id }]));
        });
      })
      .addCase(UserServiceAutoLogin.getUserAutoLogin.rejected, (state, actions) => {
        console.log('자동로그인 실패');
        //접속 시 소켓에 아이디를 담아 전송
        socket.emit('users.count', { id: '첫접속' }, (res: any) => {
          console.log('로그인 에밋 후');
          // dispatch(connectedUser([{ id, socketId: socket.id }]));
        });
      });
  },
});
export let { logout } = user.actions;

export default user.reducer;
