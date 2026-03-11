/*
  Warnings:

  - Added the required column `cnpj` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "cnpj" TEXT NOT NULL;
