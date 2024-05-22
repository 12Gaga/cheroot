/*
  Warnings:

  - You are about to drop the column `typeOfFilterSizeId` on the `BagoFilterSizeInstallment` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfLabelId` on the `BagoLabelInstallment` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfLeafId` on the `BagoLeafInstallment` table. All the data in the column will be lost.
  - You are about to drop the column `plasticId` on the `BagoPlasticInstallment` table. All the data in the column will be lost.
  - You are about to drop the `BagoInstallment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BagoFilterSizeInstallment" DROP CONSTRAINT "BagoFilterSizeInstallment_typeOfFilterSizeId_fkey";

-- DropForeignKey
ALTER TABLE "BagoInstallment" DROP CONSTRAINT "BagoInstallment_shopId_fkey";

-- DropForeignKey
ALTER TABLE "BagoInstallment" DROP CONSTRAINT "BagoInstallment_workShopId_fkey";

-- DropForeignKey
ALTER TABLE "BagoLabelInstallment" DROP CONSTRAINT "BagoLabelInstallment_typeOfLabelId_fkey";

-- DropForeignKey
ALTER TABLE "BagoLeafInstallment" DROP CONSTRAINT "BagoLeafInstallment_typeOfLeafId_fkey";

-- DropForeignKey
ALTER TABLE "BagoPlasticInstallment" DROP CONSTRAINT "BagoPlasticInstallment_plasticId_fkey";

-- AlterTable
ALTER TABLE "BagoFilterSizeInstallment" DROP COLUMN "typeOfFilterSizeId";

-- AlterTable
ALTER TABLE "BagoLabelInstallment" DROP COLUMN "typeOfLabelId";

-- AlterTable
ALTER TABLE "BagoLeafInstallment" DROP COLUMN "typeOfLeafId";

-- AlterTable
ALTER TABLE "BagoPlasticInstallment" DROP COLUMN "plasticId";

-- AlterTable
ALTER TABLE "Conveying" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "FormOfPacking" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "BagoInstallment";
