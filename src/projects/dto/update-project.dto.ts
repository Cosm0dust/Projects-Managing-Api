import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 'Updated Project A' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ example: 'Updated description of Project A' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ example: 'userId456' })
  @IsOptional()
  @IsString()
  readonly createdBy?: string;
}