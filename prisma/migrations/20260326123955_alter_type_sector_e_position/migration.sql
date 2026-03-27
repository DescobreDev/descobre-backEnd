/*
  Warnings:

  - Changed the type of `positionId` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sectorId` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "positionId",
ADD COLUMN     "positionId" INTEGER NOT NULL,
DROP COLUMN "sectorId",
ADD COLUMN     "sectorId" INTEGER NOT NULL;
