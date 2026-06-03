/*
  Warnings:

  - You are about to drop the column `profile` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `profileAnalyst` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `profileCommunicator` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `profileExecutor` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `profilePlanner` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "profile",
DROP COLUMN "profileAnalyst",
DROP COLUMN "profileCommunicator",
DROP COLUMN "profileExecutor",
DROP COLUMN "profilePlanner",
ADD COLUMN     "profileType" TEXT,
ADD COLUMN     "profileTypeSecondary" TEXT;
