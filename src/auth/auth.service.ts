import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/auth.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { signToken } from '@/helpers/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      // check if user exists
      const existingUser = await this.userModel.findOne({ email });


      if (existingUser) {
        throw new BadRequestException('User already exists');
      }


      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        role: 'USER',
        active: true,
      });

      return {
        status: true,
        message: 'User created successfully',
        data: {
          user,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      if (!user.active) {
        throw new BadRequestException(
          'User account has been deactivated. Please contact support',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid login credentials');
      }

      const accessToken = signToken({
        sub: user.id,
        email: user.email,
      });

      return {
        status: true,
        message: 'User logged in',
        data: {
          accessToken,
          user,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'An error occured');
    }
  }
}
