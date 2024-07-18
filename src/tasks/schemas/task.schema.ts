import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { TaskStatus } from '../types/enums';

@Schema()
export class Task extends Document {
  @ApiProperty({ example: 'Task A', description: 'The title of the task' })
  @Prop({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Description of Task A', description: 'Optional description of the task' })
  @Prop()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: '6123456789abcdef01234567', description: 'ID of the project to which this task belongs' })
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  @IsMongoId()
  project: Types.ObjectId;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.NEW, description: 'Current status of the task' })
  @Prop({ required: true, enum: TaskStatus, default: TaskStatus.NEW })
  @IsEnum(TaskStatus)
  status: string;

  @ApiProperty({ example: '2024-07-18T12:00:00.000Z', description: 'Date and time when the task was created' })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);