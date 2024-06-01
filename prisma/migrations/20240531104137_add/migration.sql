/*
  Warnings:

  - Added the required column `garageId` to the `Packing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Packing" ADD COLUMN     "garageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
