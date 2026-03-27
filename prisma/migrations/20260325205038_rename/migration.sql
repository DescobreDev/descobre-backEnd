/*
  Warnings:

  - You are about to drop the column `position` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `Job` table. All the data in the column will be lost.
  - Added the required column `positionId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectorId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "position",
DROP COLUMN "sector",
ADD COLUMN     "customBenefits" TEXT[],
ADD COLUMN     "positionId" TEXT NOT NULL,
ADD COLUMN     "sectorId" TEXT NOT NULL;
