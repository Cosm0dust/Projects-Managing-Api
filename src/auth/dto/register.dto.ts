import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsEmail()
  readonly email: string;
}
