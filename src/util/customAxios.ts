import axios from 'axios';

const DOMAIN_ENV = process.env.REACT_APP_SERVER_API;

export const customAxios = async (method: string, url: string, data?: any): Promise<any> => {
  return await axios({
    method,
    url: DOMAIN_ENV + '/api' + url,
    data,
  });
};
export default customAxios;
