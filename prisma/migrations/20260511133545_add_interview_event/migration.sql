/*
  Warnings:

  - You are about to drop the column `note` on the `InterviewEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InterviewEvent" DROP COLUMN "note",
ADD COLUMN     "message" TEXT;
