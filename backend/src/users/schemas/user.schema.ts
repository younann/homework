import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  googleId: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  profileImage: string;

  @Prop({ type: [String], default: [] })
  favoriteStocks: string[];

  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
