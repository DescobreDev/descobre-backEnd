import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.plan.createMany({
    data: [
      { name: "Básico", price: 49.9, maxJobs: 3 },
      { name: "Profissional", price: 99.9, maxJobs: 10 },
      { name: "Enterprise", price: 199.9, maxJobs: 999 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });