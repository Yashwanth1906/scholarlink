-- DropForeignKey
ALTER TABLE "ScholarshipApplied" DROP CONSTRAINT "ScholarshipApplied_studentid_fkey";

-- AlterTable
ALTER TABLE "ScholarshipApplied" ALTER COLUMN "studentid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ScholarshipApplied" ADD CONSTRAINT "ScholarshipApplied_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;
