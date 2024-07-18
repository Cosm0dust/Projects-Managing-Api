import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Project A' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Description of Project A' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  readonly createdBy: string;
}