import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ message: 'isRequired' })
  @MaxLength(40, { message: 'tooLong' })
  @IsString({ message: 'mismatch' })
  name: string;

}
