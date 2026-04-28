-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('ANALYST', 'COMMUNICATOR', 'EXECUTOR', 'PLANNER');

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "profile" TEXT,
ADD COLUMN     "profileAnalyst" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profileCommunicator" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profileExecutor" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profilePlanner" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "JobProfile" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "priority" "ProfileType" NOT NULL,
    "analyst" INTEGER NOT NULL DEFAULT 0,
    "communicator" INTEGER NOT NULL DEFAULT 0,
    "executor" INTEGER NOT NULL DEFAULT 0,
    "planner" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JobProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobProfile_jobId_key" ON "JobProfile"("jobId");

-- AddForeignKey
ALTER TABLE "JobProfile" ADD CONSTRAINT "JobProfile_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
