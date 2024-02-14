import { TransactionStatus } from '@/interfaces/payments.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: false })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true, enum: ['ADMIN', 'USER'] })
  role: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: false, enum: TransactionStatus, type: String })
  status: TransactionStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
