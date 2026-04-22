/*
  Warnings:

  - You are about to drop the column `isAnnual` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "isAnnual";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "isAnnual" BOOLEAN NOT NULL DEFAULT false;
