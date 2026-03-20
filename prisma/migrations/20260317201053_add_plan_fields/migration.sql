/*
  Warnings:

  - Added the required column `description` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAiResume` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAiSalary` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxInterviews` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "maxAiResume" INTEGER NOT NULL,
ADD COLUMN     "maxAiSalary" INTEGER NOT NULL,
ADD COLUMN     "maxInterviews" INTEGER NOT NULL,
ADD COLUMN     "recommended" BOOLEAN NOT NULL DEFAULT false;
