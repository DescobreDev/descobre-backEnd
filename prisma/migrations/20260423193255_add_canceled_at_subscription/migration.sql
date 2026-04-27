/*
  Warnings:

  - Made the column `asaasSubscriptionId` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ALTER COLUMN "asaasSubscriptionId" SET NOT NULL;
