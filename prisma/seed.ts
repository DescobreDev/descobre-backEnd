import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.plan.createMany({
    data: [
      {
        name: 'Starter',
        description: 'Ideal para pequenas empresas que estão começando.',
        price: 9.00,
        maxJobs: 5,
        maxAiResume: 10,
        maxAiSalary: 10,
        maxInterviews: 5,
        recommended: false,
      },
      {
        name: 'Basic',
        description: 'Ideal para empresas de porte médio.',
        price: 299.00,
        maxJobs: 70,
        maxAiResume: 45,
        maxAiSalary: 45,
        maxInterviews: 70,
        recommended: true,
      },
      {
        name: 'Ouro',
        description: 'Plano ideal para quem possui grandes corporações.',
        price: 499.00,
        maxJobs: 300,
        maxAiResume: 100,
        maxAiSalary: 100,
        maxInterviews: 300,
        recommended: false,
      },
    ],
  });
  console.log('Planos criados!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });