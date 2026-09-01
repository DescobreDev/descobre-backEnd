import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AsaasService } from './asaas.service';
import { PaymentsController } from './payments.controller';
import { WebhookController } from './webhook.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [PaymentsController, WebhookController],
  providers: [AsaasService],
  exports: [AsaasService],
})
export class PaymentsModule {}
