import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  readonly password: string;
}