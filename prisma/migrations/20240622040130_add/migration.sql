/*
  Warnings:

  - Added the required column `deductSeq` to the `OtherDeduction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OtherDeduction" ADD COLUMN     "deductSeq" TEXT NOT NULL;
