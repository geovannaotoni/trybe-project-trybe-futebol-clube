import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const verifyToken = JWT.verify(authorization);
    if (verifyToken === 'Token must be a valid token') {
      return res.status(401).json({ message: verifyToken });
    }
    // opção 1: estendendo o tipo do req.user
    // req.user = verifyToken;

    // opção 2: usando o req.headers
    // req.headers.user = JSON.stringify(verifyToken);

    // opção 3: usando o res.locals
    res.locals.user = verifyToken;

    next();
  }
}

export default Validations;
