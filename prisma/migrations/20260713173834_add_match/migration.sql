/*
  Warnings:

  - The `profileType` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `profileTypeSecondary` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interviewType` column on the `InterviewEvent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `analyst` on the `JobProfile` table. All the data in the column will be lost.
  - You are about to drop the column `communicator` on the `JobProfile` table. All the data in the column will be lost.
  - You are about to drop the column `executor` on the `JobProfile` table. All the data in the column will be lost.
  - You are about to drop the column `planner` on the `JobProfile` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `JobProfile` table. All the data in the column will be lost.
  - Added the required column `actor` to the `ApplicationHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceLevel` to the `JobProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryProfile` to the `JobProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('ESTAGIO', 'JUNIOR', 'PLENO', 'SENIOR', 'ESPECIALISTA');

-- CreateEnum
CREATE TYPE "HistoryActor" AS ENUM ('COMPANY', 'CANDIDATE', 'SYSTEM');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('ONLINE', 'PRESENCIAL');

-- AlterTable
ALTER TABLE "ApplicationHistory" ADD COLUMN     "actor" "HistoryActor" NOT NULL;

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "desiredPositionId" INTEGER,
ADD COLUMN     "desiredSalary" DECIMAL(10,2),
ADD COLUMN     "desiredSectorId" INTEGER,
DROP COLUMN "profileType",
ADD COLUMN     "profileType" "ProfileType",
DROP COLUMN "profileTypeSecondary",
ADD COLUMN     "profileTypeSecondary" "ProfileType";

-- AlterTable
ALTER TABLE "InterviewEvent" DROP COLUMN "interviewType",
ADD COLUMN     "interviewType" "InterviewType";

-- AlterTable
ALTER TABLE "JobProfile" DROP COLUMN "analyst",
DROP COLUMN "communicator",
DROP COLUMN "executor",
DROP COLUMN "planner",
DROP COLUMN "priority",
ADD COLUMN     "experienceLevel" "ExperienceLevel" NOT NULL,
ADD COLUMN     "primaryProfile" "ProfileType" NOT NULL,
ADD COLUMN     "secondaryProfile" "ProfileType";

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "criteria" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Match_candidateId_idx" ON "Match"("candidateId");

-- CreateIndex
CREATE INDEX "Match_jobId_idx" ON "Match"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_candidateId_jobId_key" ON "Match"("candidateId", "jobId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
