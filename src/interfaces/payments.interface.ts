import { Document } from 'mongoose';

export enum TransactionStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export interface ITransactions extends Document {
  userId: string;
  amount: string;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}
