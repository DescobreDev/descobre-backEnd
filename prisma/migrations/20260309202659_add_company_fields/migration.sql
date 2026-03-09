/*
  Warnings:

  - Added the required column `about` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employees` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "email"      TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "phone"      TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "cep"        TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "address"    TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "city"       TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "state"      TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "site"       TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "complement" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "about"      TEXT NOT NULL DEFAULT '';
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "number"     INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "employees"  INTEGER NOT NULL DEFAULT 0;
