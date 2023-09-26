import { Secret, SignOptions, sign, verify } from 'jsonwebtoken';
import { IPayload } from '../Interfaces/users/IUser';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  private static jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static sign(payload: IPayload): string {
    return sign(payload, this.secret, this.jwtConfig);
  }

  static verify(authorization: string): IPayload | 'Token must be a valid token' {
    try {
      const token = authorization.split(' ')[1];
      return verify(token, this.secret) as IPayload;
    } catch (e) {
      return 'Token must be a valid token';
    }
  }
}
