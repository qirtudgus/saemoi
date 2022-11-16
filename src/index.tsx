import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Cookies } from 'react-cookie';
import { UserServiceAutoLogin } from './store/userSlice';
import ScrollToTop from './components/pageMoveTopScroll';

const cookies = new Cookies();

//로그인 유지를 위한 함수, 토큰이 유효할 시 정보를 불러오는 디스패치, 토큰이 없을 시 return
function loadUser() {
  console.log(cookies.get('AT'));
  let AT = cookies.get('AT');
  store.dispatch(UserServiceAutoLogin.getUserAutoLogin(AT));
}
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
