import express, { Request, Response, NextFunction } from 'express';
import createHashPassword from '../../src/util/createHashPassword.js';
import { db } from '../saemoi_db.js';
export const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  console.log(req.body.id);
  console.log(req.body.pw);
  res.send('haha');
});
