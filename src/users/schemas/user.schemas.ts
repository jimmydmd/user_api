import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

class Address {
  @Prop({ required: true })
  city: string;
}

class Company {
  @Prop({ required: true })
  name: string;
}

@Schema()
export class User {
  @Prop({ required: true }) name: string;

  @Prop({ required: true, unique: true }) email: string;

  @Prop() username: string;

  @Prop() phone: string;

  @Prop() website: string;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ type: Company, required: true })
  company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);
