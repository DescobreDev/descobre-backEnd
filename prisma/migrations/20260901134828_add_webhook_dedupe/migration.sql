/*
  Warnings:

  - A unique constraint covering the columns `[asaasEventId]` on the table `WebhookLog` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WebhookLog" ADD COLUMN     "asaasEventId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "WebhookLog_asaasEventId_key" ON "WebhookLog"("asaasEventId");
