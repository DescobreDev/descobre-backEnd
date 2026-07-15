/*
  Warnings:

  - You are about to drop the column `desiredSalary` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "desiredSalary",
ADD COLUMN     "acceptsTravel" BOOLEAN,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "contractTypes" "ContractType"[],
ADD COLUMN     "desiredSalaryMax" DECIMAL(10,2),
ADD COLUMN     "desiredSalaryMin" DECIMAL(10,2),
ADD COLUMN     "experienceLevel" "ExperienceLevel",
ADD COLUMN     "salaryNegotiable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "state" TEXT;
