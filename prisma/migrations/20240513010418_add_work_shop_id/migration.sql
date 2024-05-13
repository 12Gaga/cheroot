/*
  Warnings:

  - Added the required column `workShopId` to the `FilterSizeTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workShopId` to the `LabelTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workShopId` to the `LeafTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workShopId` to the `TabaccoTransferGarage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilterSizeTransferGarage" ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LabelTransferGarage" ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LeafTransferGarage" ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TabaccoTransferGarage" ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LeafTransferGarage" ADD CONSTRAINT "LeafTransferGarage_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterSizeTransferGarage" ADD CONSTRAINT "FilterSizeTransferGarage_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TabaccoTransferGarage" ADD CONSTRAINT "TabaccoTransferGarage_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelTransferGarage" ADD CONSTRAINT "LabelTransferGarage_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
