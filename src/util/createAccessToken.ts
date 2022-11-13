import jwt from 'jsonwebtoken';
const SECRET_TOKEN: string = process.env.SECRET_TOKEN!;
type TokenType = string | unknown;

export const createAccessToken = (id: string | any): TokenType => {
  try {
    console.log(`${id}님의 토큰 생성`);
    return jwt.sign({ id }, SECRET_TOKEN, { expiresIn: '10h' });
  } catch (err) {
    return err;
  }
};

export const createRefreshToken = (id: string | any): TokenType => {
  try {
    console.log(`${id}님의 토큰 생성`);
    return jwt.sign({}, SECRET_TOKEN, { expiresIn: '360h' });
  } catch (err) {
    return err;
  }
};

export default createAccessToken;
