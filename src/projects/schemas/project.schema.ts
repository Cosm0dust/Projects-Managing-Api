import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; 

@Schema()
export class Project extends Document {
  @ApiProperty({ example: 'Project A' }) 
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Description of Project A' }) 
  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[];

  @ApiProperty({ example: '2024-07-18T12:00:00.000Z' }) 
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project); 