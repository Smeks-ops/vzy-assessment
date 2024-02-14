import { IRequest } from '../../helpers/auth.types';
import { verifyToken } from '@/helpers/auth.helper';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { get } from 'lodash';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async use(req: IRequest, res: Response, next: NextFunction) {
    try {
      const accessToken = get(req, 'headers.authorization', '').replace(
        /^Bearer\s/,
        '',
      );

      if (!accessToken) {
        throw new BadRequestException('Invalid Auth Credentials');
      }

      const { decoded, expired } = await verifyToken(
        accessToken,
        process.env.JWT_SECRET,
      );

      if (expired === true) {
        throw new BadRequestException('Login expired');
      }

      const user = await this.userModel.findById(decoded.sub);

      if (!user) {
        throw new BadRequestException('Invalid Auth Credentials');
      }

      if (!user.active) {
        throw new BadRequestException('User deactivated');
      }

      req.user = user;
      return next();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
