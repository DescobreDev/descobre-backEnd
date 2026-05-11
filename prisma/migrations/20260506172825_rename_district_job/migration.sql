/*
  Warnings:

  - You are about to drop the column `neighborhood` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "neighborhood",
ADD COLUMN     "district" TEXT;
