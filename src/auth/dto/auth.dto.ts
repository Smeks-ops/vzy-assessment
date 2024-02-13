import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'vzy@gmail.com' })
  @IsEmail({}, { message: 'mismatch' })
  @IsNotEmpty({ message: 'isRequired' })
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @IsNotEmpty({ message: 'isRequired' })
  @IsString({ message: 'mismatch' })
  @MinLength(8, { message: 'tooShort' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'mismatch',
  })
  password: string;
}
