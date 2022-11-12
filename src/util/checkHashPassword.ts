//인자에 패스워드를 넣고 호출하면 salt값과 암호화된 패스워드가 담긴 객체를 반환
import CryptoJS from 'crypto-js';

export const checkHashPassword = (Password: string, hashPassword: string, salt: string): boolean => {
  const newHashPassword: string = CryptoJS.HmacSHA256(Password, salt).toString();
  return hashPassword === newHashPassword ? true : false;
};

export default checkHashPassword;
