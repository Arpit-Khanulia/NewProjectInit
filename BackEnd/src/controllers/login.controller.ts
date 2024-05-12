import { Request, Response } from 'express';

const login = (req: Request, res: Response) => {
  console.log('this is login ');
  res.send({ message: 'this is login' });
};

export { login };
