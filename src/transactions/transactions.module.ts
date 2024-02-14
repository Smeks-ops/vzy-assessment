import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/users/entities/user.entity';
import {
  Transactions,
  TransactionsSchema,
} from './entities/transaction.entity';
import Stripe from 'stripe';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Transactions.name, schema: TransactionsSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, Stripe],
})
export class TransactionsModule {}
