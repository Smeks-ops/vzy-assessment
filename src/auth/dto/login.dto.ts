import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'vzy@gmail.com' })
  @IsNotEmpty({ message: 'isRequired' })
  @IsEmail({}, { message: 'mismatch' })
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @IsNotEmpty({ message: 'isRequired' })
  @IsString({ message: 'mismatch' })
  password: string;
}
