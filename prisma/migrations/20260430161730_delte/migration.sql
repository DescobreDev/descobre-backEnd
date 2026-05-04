/*
  Warnings:

  - You are about to drop the column `analyst` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `communicator` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `executor` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `planner` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "analyst",
DROP COLUMN "communicator",
DROP COLUMN "executor",
DROP COLUMN "planner";
