import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  displayName: string;

  @Prop()
  username: string;

  @Prop()
  id: string;

  @Prop()
  accessToken: string;

  @Prop()
  key: string;

  @Prop({ type: Object })
  plugins: object;
}

export const UserSchema = SchemaFactory.createForClass(User);
