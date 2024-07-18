import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true, index: true, unique: true,  validate: /\S+@\S+\.\S+/  })
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  accessToken: string;

  @Prop()
  tokenExpiration: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] }) 
  projects: Types.ObjectId[]; 

}

export const UserSchema = SchemaFactory.createForClass(User);
