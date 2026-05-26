-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "avatarIndex" INTEGER,
ADD COLUMN     "avatarUrl" TEXT;

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateInterest" (
    "candidateId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "CandidateInterest_pkey" PRIMARY KEY ("candidateId","interestId")
);

-- CreateTable
CREATE TABLE "ProfessionalPriority" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "ProfessionalPriority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatePriority" (
    "candidateId" INTEGER NOT NULL,
    "priorityId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CandidatePriority_pkey" PRIMARY KEY ("candidateId","priorityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interest_name_key" ON "Interest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalPriority_name_key" ON "ProfessionalPriority"("name");

-- AddForeignKey
ALTER TABLE "CandidateInterest" ADD CONSTRAINT "CandidateInterest_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateInterest" ADD CONSTRAINT "CandidateInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatePriority" ADD CONSTRAINT "CandidatePriority_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatePriority" ADD CONSTRAINT "CandidatePriority_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "ProfessionalPriority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
