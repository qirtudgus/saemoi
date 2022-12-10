import jwt from 'jsonwebtoken';
// const SECRET_TOKEN: string = process.env.SECRET_TOKEN!;
type TokenType = string | unknown;

//유효할 시 토큰을 분해한값을, 만료 시 null 리턴
const verifyToken = (token: string): TokenType => {
  try {
    return jwt.verify(token, process.env.SECRET_TOKEN!);
  } catch (err) {
    return null;
  }
};

export default verifyToken;
