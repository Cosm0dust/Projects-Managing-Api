import { IsString, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { TaskStatus } from '../types/enums';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task A', description: 'The title of the task' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Description of Task A', description: 'Optional description of the task' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ example: '6123456789abcdef01234567', description: 'ID of the project to which this task belongs' })
  @IsMongoId()
  readonly project: Types.ObjectId;

  @ApiProperty({ enum: TaskStatus, description: 'The status of the task' })
  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status?: TaskStatus;
}


