-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'INTERVIEW', 'APPROVED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('FUNDAMENTAL', 'MEDIO', 'TECNICO', 'SUPERIOR', 'POS_GRADUACAO', 'MESTRADO', 'DOUTORADO');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE');

-- CreateEnum
CREATE TYPE "ExtraType" AS ENUM ('CERTIFICATE', 'COURSE', 'PORTFOLIO', 'AWARD', 'PUBLICATION', 'OTHER');

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "birthDate" TIMESTAMP(3),
    "cpf" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationCode" TEXT,
    "verificationCodeExpires" TIMESTAMP(3),
    "verificationAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastCodeSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateResume" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "cvFileUrl" TEXT,
    "isGuided" BOOLEAN NOT NULL DEFAULT false,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeExperience" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeEducation" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "institution" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "level" "EducationLevel" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSkill" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "level" "SkillLevel",

    CONSTRAINT "ResumeSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeLanguage" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "level" "LanguageLevel" NOT NULL,

    CONSTRAINT "ResumeLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeExtra" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "type" "ExtraType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "ResumeExtra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "cvSnapshot" TEXT,
    "notes" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationHistory" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "note" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_cpf_key" ON "Candidate"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateResume_candidateId_key" ON "CandidateResume"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_candidateId_jobId_key" ON "Application"("candidateId", "jobId");

-- AddForeignKey
ALTER TABLE "CandidateResume" ADD CONSTRAINT "CandidateResume_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExperience" ADD CONSTRAINT "ResumeExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "CandidateResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEducation" ADD CONSTRAINT "ResumeEducation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "CandidateResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkill" ADD CONSTRAINT "ResumeSkill_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "CandidateResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "CandidateResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExtra" ADD CONSTRAINT "ResumeExtra_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "CandidateResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationHistory" ADD CONSTRAINT "ApplicationHistory_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
