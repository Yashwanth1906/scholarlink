/*
  Warnings:

  - You are about to drop the column `achievements` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `annualIncome` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `bonafide` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `currentQualifications` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `incomecertificate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `salaryslip` on the `Student` table. All the data in the column will be lost.
  - Added the required column `regenddate` to the `Scholarship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regstdate` to the `Scholarship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scholarship" ADD COLUMN     "regenddate" TEXT NOT NULL,
ADD COLUMN     "regstdate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "achievements",
DROP COLUMN "annualIncome",
DROP COLUMN "bonafide",
DROP COLUMN "currentQualifications",
DROP COLUMN "dob",
DROP COLUMN "gender",
DROP COLUMN "incomecertificate",
DROP COLUMN "salaryslip";

-- CreateTable
CREATE TABLE "StudentDetails" (
    "id" SERIAL NOT NULL,
    "studemail" TEXT NOT NULL,
    "currentQualifications" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "annualIncome" INTEGER,
    "dob" TEXT NOT NULL,
    "bonafide" TEXT,
    "incomecertificate" TEXT,
    "salaryslip" TEXT,
    "achievements" TEXT[],

    CONSTRAINT "StudentDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentDetails" ADD CONSTRAINT "StudentDetails_studemail_fkey" FOREIGN KEY ("studemail") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;
