/*
  Warnings:

  - You are about to drop the column `degreecertificate` on the `PGCollegeStudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `annualScore` on the `SecondaryStudentDetails` table. All the data in the column will be lost.
  - Added the required column `sscschoollocation` to the `HSCStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sscschoolname` to the `HSCStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hscgrade` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hscschoollocation` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hscschoolname` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sscgrade` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sscschoollocation` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sscschoolname` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ugcollegelocation` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ugcollegename` to the `PGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Scholarship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ScholarshipApplied` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNo` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentContactNo` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hscschoollocation` to the `UGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hscschoolname` to the `UGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sscschoollocation` to the `UGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sscschoolname` to the `UGCollegeStudentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HSCStudentDetails" ADD COLUMN     "sscschoollocation" TEXT NOT NULL,
ADD COLUMN     "sscschoolname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PGCollegeStudentDetails" DROP COLUMN "degreecertificate",
ADD COLUMN     "hscgrade" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hscmarksheet" TEXT,
ADD COLUMN     "hscschoollocation" TEXT NOT NULL,
ADD COLUMN     "hscschoolname" TEXT NOT NULL,
ADD COLUMN     "sscgrade" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sscmarksheet" TEXT,
ADD COLUMN     "sscschoollocation" TEXT NOT NULL,
ADD COLUMN     "sscschoolname" TEXT NOT NULL,
ADD COLUMN     "ugcollegelocation" TEXT NOT NULL,
ADD COLUMN     "ugcollegename" TEXT NOT NULL,
ADD COLUMN     "ugdegreecertificate" TEXT;

-- AlterTable
ALTER TABLE "Scholarship" ADD COLUMN     "period" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ScholarshipApplied" ADD COLUMN     "scholarshipEssay" TEXT,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SecondaryStudentDetails" DROP COLUMN "annualScore";

-- AlterTable
ALTER TABLE "StudentDetails" ADD COLUMN     "aadharCard" TEXT,
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "fatherOccupation" TEXT,
ADD COLUMN     "firstGraduate" TEXT,
ADD COLUMN     "gaurdianName" TEXT,
ADD COLUMN     "gaurdianOccupation" TEXT,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "motherOccupation" TEXT,
ADD COLUMN     "parentContactNo" TEXT NOT NULL,
ADD COLUMN     "rationCard" TEXT;

-- AlterTable
ALTER TABLE "UGCollegeStudentDetails" ADD COLUMN     "hscschoollocation" TEXT NOT NULL,
ADD COLUMN     "hscschoolname" TEXT NOT NULL,
ADD COLUMN     "sscschoollocation" TEXT NOT NULL,
ADD COLUMN     "sscschoolname" TEXT NOT NULL;
