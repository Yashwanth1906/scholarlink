/*
  Warnings:

  - You are about to drop the column `certificate` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `contactno` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `orglocation` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `yearsofservice` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "certificate",
DROP COLUMN "contactno",
DROP COLUMN "description",
DROP COLUMN "orglocation",
DROP COLUMN "yearsofservice";

-- CreateTable
CREATE TABLE "AdminDetails" (
    "id" SERIAL NOT NULL,
    "adminemail" TEXT NOT NULL,
    "orglocation" TEXT NOT NULL,
    "contactno" TEXT NOT NULL,
    "yearsofservice" INTEGER,
    "certificate" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AdminDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminDetails" ADD CONSTRAINT "AdminDetails_adminemail_fkey" FOREIGN KEY ("adminemail") REFERENCES "Admin"("email") ON DELETE CASCADE ON UPDATE CASCADE;
