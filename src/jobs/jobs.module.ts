import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsageModule } from '../usage/usage.module';

@Module({
  imports: [PrismaModule, AuthModule, UsageModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}