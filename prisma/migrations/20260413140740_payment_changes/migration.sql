-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "asaasCustomerId" TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "asaasSubscriptionId" TEXT;

-- CreateTable
CREATE TABLE "CardToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "lastFour" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CardToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "asaasPaymentId" TEXT NOT NULL,
    "asaasSubscriptionId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardToken_companyId_key" ON "CardToken"("companyId");

-- AddForeignKey
ALTER TABLE "CardToken" ADD CONSTRAINT "CardToken_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
