import express, { Request, Response, NextFunction } from 'express';

export const registerRouter = express.Router();

registerRouter.post('/join', (req, res) => {
  const { id, password, confirmPassword, nickname } = req.body;

  console.log(id, password, confirmPassword, nickname);

  res.status(200).json({ a: 'haha' });
});
