/*
  Warnings:

  - Added the required column `typeOfCherootId` to the `ExtraPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtraPurchase" ADD COLUMN     "typeOfCherootId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ExtraPurchase" ADD CONSTRAINT "ExtraPurchase_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
