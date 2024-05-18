/*
  Warnings:

  - You are about to drop the column `storeId` on the `TaungyiInstallment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaungyiInstallment" DROP CONSTRAINT "TaungyiInstallment_storeId_fkey";

-- AlterTable
ALTER TABLE "TaungyiInstallment" DROP COLUMN "storeId";

-- CreateTable
CREATE TABLE "BagoInstallment" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL,
    "payBalance" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoInstallment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BagoInstallment" ADD CONSTRAINT "BagoInstallment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoInstallment" ADD CONSTRAINT "BagoInstallment_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
