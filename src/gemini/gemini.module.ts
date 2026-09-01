import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { UsageService } from '../usage/usage.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GeminiController],
  exports: [GeminiService],
  providers: [GeminiService, UsageService, PrismaService],
})
export class GeminiModule {}
