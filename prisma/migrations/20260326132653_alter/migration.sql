/*
  Warnings:

  - You are about to drop the column `areaId` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sectorId` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_areaId_fkey";

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "areaId",
ADD COLUMN     "sectorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Area";

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sector_name_key" ON "Sector"("name");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
