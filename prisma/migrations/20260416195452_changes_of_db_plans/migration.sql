/*
  Warnings:

  - Added the required column `annualPrice` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "annualPrice" DECIMAL(10,2) NOT NULL;
