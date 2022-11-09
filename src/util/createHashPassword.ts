//인자에 패스워드를 넣고 호출하면 salt값과 암호화된 패스워드가 담긴 객체를 반환
import CryptoJS from 'crypto-js';

interface passwordSet {
  salt: string;
  hashPassword: string;
}

export const createHashPassword = (password: string): passwordSet => {
  const salt: string = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  const hashPassword: string = CryptoJS.HmacSHA256(password, salt).toString();
  return { salt: salt, hashPassword: hashPassword };
};

export default createHashPassword;
