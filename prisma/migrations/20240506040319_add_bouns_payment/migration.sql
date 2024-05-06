/*
  Warnings:

  - Added the required column `bonusPayment` to the `OtherDeduction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OtherDeduction" ADD COLUMN     "bonusPayment" INTEGER NOT NULL;
