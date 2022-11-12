import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DOMAIN_ENV = process.env.REACT_APP_SERVER_API;
axios.defaults.withCredentials = true;
export const customAxios = async (method: string, url: string, data?: any): Promise<any> => {
  return await axios({
    method,
    url: DOMAIN_ENV + '/api' + url,
    data,
  }).catch((err) => {
    console.log(err.response);
    console.log(err.response.data);
    console.log(err.response.status);
    alert('토큰이 만료되었습니다. 로그인 후 이용해주세요!');
    window.location.replace('/login');
  });
};
export default customAxios;
