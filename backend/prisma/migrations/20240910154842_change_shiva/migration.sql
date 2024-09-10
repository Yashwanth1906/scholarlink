/*
  Warnings:

  - Added the required column `community` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentDetails" ADD COLUMN     "community" TEXT NOT NULL;
