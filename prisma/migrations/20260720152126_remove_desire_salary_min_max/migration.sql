/*
  Warnings:

  - You are about to drop the column `desiredSalaryMax` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `desiredSalaryMin` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "desiredSalaryMax",
DROP COLUMN "desiredSalaryMin",
ADD COLUMN     "desiredSalary" DECIMAL;
