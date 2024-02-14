import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionStatus } from '@/interfaces/payments.interface';
import Stripe from 'stripe';
@Controller('webhook')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private stripe: Stripe,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  @Post('stripe')
  async handleStripeWebhook(@Body() body: any, @Req() request: Request) {
    // verify stripe signature
    const sig = request.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (!sig || !endpointSecret)
        throw new Error('Missing necessary configuration.');

      event = this.stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      throw new HttpException(
        'Webhook signature verification failed.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Handle event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentId = event.data.object.id; // payment intent id
        await this.transactionsService.updateTransactionStatus(
          paymentId,
          TransactionStatus.PAID,
        );
        break;

      case 'payment_intent.payment_failed':
        await this.transactionsService.updateTransactionStatus(
          paymentId,
          TransactionStatus.FAILED,
        );
        break;

      case 'payment_intent.pending':
        await this.transactionsService.updateTransactionStatus(
          paymentId,
          TransactionStatus.PENDING,
        );

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }
}
