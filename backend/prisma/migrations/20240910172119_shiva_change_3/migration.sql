-- DropForeignKey
ALTER TABLE "Scholarship" DROP CONSTRAINT "Scholarship_providedby_fkey";

-- AlterTable
ALTER TABLE "Scholarship" ALTER COLUMN "providedby" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_providedby_fkey" FOREIGN KEY ("providedby") REFERENCES "Admin"("email") ON DELETE CASCADE ON UPDATE CASCADE;
