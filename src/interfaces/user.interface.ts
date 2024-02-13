import { Document } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  active: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

