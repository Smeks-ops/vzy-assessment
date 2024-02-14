import { TransactionStatus } from '@/interfaces/payments.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transactions extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true, enum: TransactionStatus, type: String })
  status: TransactionStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
