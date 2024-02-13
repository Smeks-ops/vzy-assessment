import {
  Controller,
  Get,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IRequest } from '@/helpers/auth.types';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update-profile')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'Profile updated successfully',
  })
  async update(@Body() updateUserDto: UpdateUserDto, @Req() request: IRequest) {
    return this.usersService.updateUser(updateUserDto, request);
  }

  @Get('profile')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Profile fetched successfully',
  })
  async getProfile(@Req() request: IRequest) {
    return this.usersService.getProfile(request);
  }
}
