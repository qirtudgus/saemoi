import express, { Request, Response, NextFunction } from 'express';

export const registerRouter = express.Router();

registerRouter.post('/join', (req, res) => {
  console.log(req.body);
  res.status(200).json({ a: 'haha' });
});
