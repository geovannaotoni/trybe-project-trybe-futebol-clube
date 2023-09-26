import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login(email, password);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public static getRole(req: Request, res: Response) {
    // opção 1: estendendo o tipo do req.user
    // const payload = req.user;
    // return res.status(200).json({ role: payload?.role });

    // opção 2: usando o req.headers
    // const { user } = req.headers;
    // const userParsed = JSON.parse(user as string);
    // return res.status(200).json({ role: userParsed.role });

    // opção 3: usando o res.locals
    const { role } = res.locals.user;
    return res.status(200).json({ role });
  }
}
