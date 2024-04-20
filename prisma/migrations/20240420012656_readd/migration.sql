/*
  Warnings:

  - Added the required column `workShopId` to the `TypeOfLeaf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypeOfLeaf" ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TypeOfLeaf" ADD CONSTRAINT "TypeOfLeaf_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
