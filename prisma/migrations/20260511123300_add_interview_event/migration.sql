-- CreateEnum
CREATE TYPE "InterviewEventType" AS ENUM ('INVITE_SENT', 'CONFIRMED', 'DECLINED', 'RESCHEDULED');

-- CreateTable
CREATE TABLE "InterviewEvent" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "type" "InterviewEventType" NOT NULL,
    "note" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "proposedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewEvent" ADD CONSTRAINT "InterviewEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
