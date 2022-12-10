import jwt from 'jsonwebtoken';
type TokenType = string | unknown;

export const createAccessToken = (id: string | any): TokenType => {
  try {
    console.log(`${id}님의 액세스 토큰 생성`);
    return jwt.sign({ id }, process.env.SECRET_TOKEN!, { expiresIn: '10h' });
  } catch (err) {
    return err;
  }
};

export const createRefreshToken = (id: string | any): TokenType => {
  try {
    console.log(`${id}님의 리프레쉬토큰 생성`);
    return jwt.sign({}, process.env.SECRET_TOKEN!, { expiresIn: '360h' });
  } catch (err) {
    return err;
  }
};

export default createAccessToken;
