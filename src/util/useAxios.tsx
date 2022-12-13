import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DOMAIN_ENV = process.env.REACT_APP_SERVER_API;
axios.defaults.withCredentials = true;

const useAxios = (initMethod: string, initUrl: string) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState(initMethod);
  const [url, setUrl] = useState(initUrl);

  const [data, setData] = useState<any | null>();
  const fetch = async (): Promise<any> => {
    await axios({
      method,
      url: DOMAIN_ENV + '/api' + url,
      data,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.response.status);
        alert('토큰이 만료되었습니다. 로그인 후 이용해주세요!');
        navigate('/');
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return [data];
};
export default useAxios;
