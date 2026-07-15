-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "affirmativeTypes" "AffirmativeType"[];

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_desiredSectorId_fkey" FOREIGN KEY ("desiredSectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_desiredPositionId_fkey" FOREIGN KEY ("desiredPositionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;
