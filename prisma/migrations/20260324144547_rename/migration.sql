/*
  Warnings:

  - You are about to drop the column `salaryMax` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salaryMax",
ADD COLUMN     "salary" DECIMAL(10,2);
