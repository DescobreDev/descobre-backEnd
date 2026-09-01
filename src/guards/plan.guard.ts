import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.companyId) {
      throw new ForbiddenException('Você precisa ter uma empresa vinculada.');
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { companyId: user.companyId },
    });

    if (!subscription) {
      throw new ForbiddenException('Você precisa de um plano ativo.');
    }

    const now = new Date();
    const expired = subscription.endDate && subscription.endDate <= now;

    if (expired && subscription.active) {
      await this.prisma.subscription.update({
        where: { companyId: user.companyId },
        data: { active: false },
      });

      throw new ForbiddenException('Seu plano expirou. Renove para continuar.');
    }

    const withinPeriod = subscription.endDate && subscription.endDate > now;
    if (subscription.active && withinPeriod) return true;
    if (subscription.canceledAt && withinPeriod) return true;

    throw new ForbiddenException('Seu plano expirou. Renove para continuar.');
  }
}
