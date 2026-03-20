-- CreateTable
CREATE TABLE "UsageRecord" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "jobsUsed" INTEGER NOT NULL DEFAULT 0,
    "aiResumeUsed" INTEGER NOT NULL DEFAULT 0,
    "aiSalaryUsed" INTEGER NOT NULL DEFAULT 0,
    "interviewsUsed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UsageRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsageRecord_companyId_year_month_key" ON "UsageRecord"("companyId", "year", "month");

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
