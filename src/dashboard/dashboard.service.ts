import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(companyId: number) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const activeJobs = await this.prisma.job.count({
      where: { companyId, active: true, status: 'ACTIVE' },
    });

    const jobsWithCandidates = await this.prisma.job.findMany({
      where: { companyId, active: true, status: 'ACTIVE' },
      select: {
        id: true,
        title: true,
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    const jobsDaysOpen = await this.prisma.job.findMany({
      where: { companyId, active: true, status: 'ACTIVE' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        deadline: true,
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    const [hiredThisMonth, hiredTotal] = await Promise.all([
      this.prisma.job.count({
        where: {
          companyId,
          status: 'HIRED',
          updatedAt: { gte: startOfMonth },
        },
      }),
      this.prisma.job.count({
        where: { companyId, status: 'HIRED' },
      }),
    ]);

    const candidatesThisMonth = await this.prisma.application.count({
      where: {
        job: { companyId },
        appliedAt: { gte: startOfMonth },
      },
    });

    return {
      activeJobs,
      candidatesThisMonth,
      jobsWithCandidates: jobsWithCandidates.map((j) => ({
        id: j.id,
        title: j.title,
        candidates: j._count.applications,
      })),
      jobsDaysOpen: jobsDaysOpen.map((j) => ({
        id: j.id,
        title: j.title,
        daysOpen: Math.floor(
          (now.getTime() - new Date(j.createdAt).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
        deadline: j.deadline,
        candidates: j._count.applications,
      })),
      hiredThisMonth,
      hiredTotal,
    };
  }
}
