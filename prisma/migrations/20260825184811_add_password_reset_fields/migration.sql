-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastResetCodeSentAt" TIMESTAMP(3),
ADD COLUMN     "resetPasswordAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "resetPasswordCode" TEXT,
ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3);
