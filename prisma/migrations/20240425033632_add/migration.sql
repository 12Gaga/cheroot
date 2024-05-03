/*
  Warnings:

  - Added the required column `workShopId` to the `Formula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Formula" ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
