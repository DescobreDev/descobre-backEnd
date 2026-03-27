import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
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

    if (!subscription?.active) {
      throw new ForbiddenException('Você precisa de um plano ativo.');
    }

    return true;
  }
}