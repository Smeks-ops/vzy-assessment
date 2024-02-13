import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { IRequest } from '@/helpers/auth.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '@/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async updateUser(updateUserDto: UpdateUserDto, request: IRequest) {
    try {
      const { id } = request.user;
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (!user.active) {
        throw new Error('User deactivated please reach out to support');
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        {
          ...updateUserDto,
        },
        {
          new: true, // Return the updated user instead of the old user
        },
      );

      return {
        status: true,
        message: 'User updated successfully',
        data: {
          user: updatedUser,
        },
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while updating user',
      );
    }
  }

  async getProfile(request: IRequest) {
    try {
      const { id } = request.user;
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.active) {
        throw new Error('User deactivated please reach out to support');
      }

      return {
        status: true,
        message: 'User profile fetched successfully',
        data: {
          user,
        },
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while getting user',
      );
    }
  }
}
