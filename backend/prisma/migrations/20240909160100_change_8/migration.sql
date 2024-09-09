-- AlterTable
ALTER TABLE "HSCStudentDetails" ALTER COLUMN "sscmarksheet" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PGCollegeStudentDetails" ALTER COLUMN "degreecertificate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UGCollegeStudentDetails" ALTER COLUMN "sscmarksheet" DROP NOT NULL,
ALTER COLUMN "hscmarksheet" DROP NOT NULL;
