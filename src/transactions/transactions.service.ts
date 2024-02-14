import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ITransactions,
  TransactionStatus,
} from '@/interfaces/payments.interface';
import { Model } from 'mongoose';
import { Transactions } from './entities/transaction.entity';
import { User } from '@/users/entities/user.entity';
import { IUser } from '@/interfaces/user.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name)
    private transactionsModel: Model<ITransactions>,
    @InjectModel(User.name) private userModel: Model<IUser>,
  ) {}

  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus,
  ) {
    const session = await this.transactionsModel.startSession();
    session.startTransaction();
    try {
      const transaction = await this.transactionsModel
        .findById(transactionId)
        .session(session);

      if (!transaction) {
        throw new BadRequestException('Transaction not found');
      }

      const user = await this.userModel
        .findById(transaction.userId)
        .session(session);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Update transaction status
      await this.transactionsModel.findByIdAndUpdate(
        transactionId,
        { status },
        { session },
      );

      // Update user status if necessary
      if (status === TransactionStatus.PAID) {
        await this.userModel.findByIdAndUpdate(
          transaction.userId,
          { status: TransactionStatus.PAID },
          { session },
        );
      }

      await session.commitTransaction();
      return {
        status: true,
        message: 'Transaction status updated successfully',
      };
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(
        error.message || 'An error occurred while updating transaction status',
      );
    } finally {
      session.endSession();
    }
  }
}
