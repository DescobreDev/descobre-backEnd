import { Module } from '@nestjs/common';
import { DiscController } from './disc.controller';
import { DiscService } from './disc.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DiscController],
  providers: [DiscService],
})
export class DiscModule {}
