/*
  Warnings:

  - You are about to drop the column `for` on the `Scholarship` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Scholarship" DROP COLUMN "for",
ADD COLUMN     "scholarshipfor" TEXT[];
