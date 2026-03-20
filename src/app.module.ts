import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlansModule } from './plans/plans.module';
import { CompanyModule } from './company/company.module';
import { UsageModule } from './usage/usage.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, CompanyModule, PlansModule, UsageModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}