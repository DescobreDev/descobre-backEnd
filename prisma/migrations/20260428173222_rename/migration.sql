/*
  Warnings:

  - The values [PENDING,IN_REVIEW,INTERVIEW,APPROVED,REJECTED,WITHDRAWN] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CERTIFICATE,COURSE,AWARD,PUBLICATION,OTHER] on the enum `ExtraType` will be removed. If these variants are still used in the database, this will fail.
  - The values [BASIC,INTERMEDIATE,ADVANCED,FLUENT,NATIVE] on the enum `LanguageLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [BASIC,INTERMEDIATE,ADVANCED,EXPERT] on the enum `SkillLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('RECEBIDA', 'EM_TRIAGEM', 'ENTREVISTA', 'APROVADO', 'REPROVADO', 'DESISTIU');
ALTER TABLE "public"."Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TABLE "ApplicationHistory" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "public"."ApplicationStatus_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'RECEBIDA';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ExtraType_new" AS ENUM ('CERTIFICADO', 'CURSO', 'PORTFOLIO', 'PREMIO', 'PUBLICACAO', 'OUTRO');
ALTER TABLE "ResumeExtra" ALTER COLUMN "type" TYPE "ExtraType_new" USING ("type"::text::"ExtraType_new");
ALTER TYPE "ExtraType" RENAME TO "ExtraType_old";
ALTER TYPE "ExtraType_new" RENAME TO "ExtraType";
DROP TYPE "public"."ExtraType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LanguageLevel_new" AS ENUM ('BASICO', 'INTERMEDIARIO', 'AVANCADO', 'FLUENTE', 'NATIVO');
ALTER TABLE "ResumeLanguage" ALTER COLUMN "level" TYPE "LanguageLevel_new" USING ("level"::text::"LanguageLevel_new");
ALTER TYPE "LanguageLevel" RENAME TO "LanguageLevel_old";
ALTER TYPE "LanguageLevel_new" RENAME TO "LanguageLevel";
DROP TYPE "public"."LanguageLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SkillLevel_new" AS ENUM ('BASICO', 'INTERMEDIARIO', 'AVANCADO', 'ESPECIALISTA');
ALTER TABLE "ResumeSkill" ALTER COLUMN "level" TYPE "SkillLevel_new" USING ("level"::text::"SkillLevel_new");
ALTER TYPE "SkillLevel" RENAME TO "SkillLevel_old";
ALTER TYPE "SkillLevel_new" RENAME TO "SkillLevel";
DROP TYPE "public"."SkillLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'RECEBIDA';
