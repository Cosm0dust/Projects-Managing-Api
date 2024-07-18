import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../types/enums';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task A', description: 'The updated title of the task' })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @ApiProperty({ example: 'Updated description of Task A', description: 'The updated description of the task' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ enum: TaskStatus, description: 'The updated status of the task' })
  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status?: string;
}