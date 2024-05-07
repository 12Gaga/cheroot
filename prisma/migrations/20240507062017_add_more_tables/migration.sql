/*
  Warnings:

  - You are about to drop the column `shop` on the `FilterSize` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `FormOfPacking` table. All the data in the column will be lost.
  - You are about to drop the column `shop` on the `Label` table. All the data in the column will be lost.
  - You are about to drop the column `shop` on the `Leaf` table. All the data in the column will be lost.
  - You are about to drop the column `shop` on the `Tabacco` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Conveying` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `FilterSize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitGarageId` to the `FilterSizeTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPlasticId` to the `FormOfPacking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packingPlasticId` to the `FormOfPacking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warpingPlasticId` to the `FormOfPacking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitGarageId` to the `LabelTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Leaf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitGarageId` to the `LeafTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPlasticId` to the `Packing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packingPlasticId` to the `Packing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warpingPlasticId` to the `Packing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Tabacco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitGarageId` to the `TabaccoTransferGarage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FilterSizeTransferGarage" DROP CONSTRAINT "FilterSizeTransferGarage_enterenceGarageId_fkey";

-- DropForeignKey
ALTER TABLE "LabelTransferGarage" DROP CONSTRAINT "LabelTransferGarage_enterenceGarageId_fkey";

-- DropForeignKey
ALTER TABLE "LeafTransferGarage" DROP CONSTRAINT "LeafTransferGarage_enterenceGarageId_fkey";

-- DropForeignKey
ALTER TABLE "TabaccoTransferGarage" DROP CONSTRAINT "TabaccoTransferGarage_enterenceGarageId_fkey";

-- AlterTable
ALTER TABLE "AddStock" ADD COLUMN     "typeOfPlasticId" INTEGER;

-- AlterTable
ALTER TABLE "Conveying" ADD COLUMN     "cashBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FilterSize" DROP COLUMN "shop",
ADD COLUMN     "shopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FilterSizeTransferGarage" ADD COLUMN     "exitGarageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FormOfPacking" DROP COLUMN "quantity",
ADD COLUMN     "cherootQty" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "coverPlasticId" INTEGER NOT NULL,
ADD COLUMN     "coverPlasticQty" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "packingPlasticId" INTEGER NOT NULL,
ADD COLUMN     "packingPlasticQty" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "warpingPlasticId" INTEGER NOT NULL,
ADD COLUMN     "warpingPlasticQty" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "shop",
ADD COLUMN     "shopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LabelTransferGarage" ADD COLUMN     "exitGarageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Leaf" DROP COLUMN "shop",
ADD COLUMN     "shopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LeafTransferGarage" ADD COLUMN     "exitGarageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OtherDeduction" ALTER COLUMN "bonusPayment" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Packing" ADD COLUMN     "coverPlasticId" INTEGER NOT NULL,
ADD COLUMN     "coverPlasticQty" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "packingPlasticId" INTEGER NOT NULL,
ADD COLUMN     "packingPlasticQty" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "warpingPlasticId" INTEGER NOT NULL,
ADD COLUMN     "warpingPlasticQty" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tabacco" DROP COLUMN "shop",
ADD COLUMN     "shopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TabaccoTransferGarage" ADD COLUMN     "exitGarageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TypeOfShop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfPlastic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfPlastic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plastic" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "plasticId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "bag" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    "garageId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Plastic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConverycherootInstallment" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "conveyLocationId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL,
    "payBalance" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ConverycherootInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banquet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Banquet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaungyiEnterStock" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "banquetId" INTEGER NOT NULL,
    "tolBatchNo" INTEGER NOT NULL,
    "netWeight" INTEGER NOT NULL,
    "netPrice" INTEGER NOT NULL,
    "tolNetPrice" INTEGER NOT NULL,
    "packingFees" INTEGER NOT NULL,
    "tolPackingFees" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL DEFAULT 0,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TaungyiEnterStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaungyiQuitStock" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "tolBatchNo" INTEGER NOT NULL,
    "netWeight" INTEGER NOT NULL,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TaungyiQuitStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaungyiInstallment" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "banquetId" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL,
    "payBalance" INTEGER NOT NULL,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TaungyiInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoLeafPurchase" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER NOT NULL,
    "netWeight" INTEGER NOT NULL,
    "netPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoLeafPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoFilterSizePurchase" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "bag" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoFilterSizePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoPlasticPurchase" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "plasticId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "bag" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoPlasticPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoLabelPurchase" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "typeOfLabelId" INTEGER NOT NULL,
    "bandle" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoLabelPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoLeafInstallment" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL,
    "payBalance" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoLeafInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoFilterSizeInstallment" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL,
    "payBalance" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoFilterSizeInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoPlasticInstallment" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "plasticId" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL,
    "payBalance" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoPlasticInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagoLabelInstallment" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "shopId" INTEGER NOT NULL,
    "typeOfLabelId" INTEGER NOT NULL,
    "cashBalance" INTEGER NOT NULL,
    "payBalance" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BagoLabelInstallment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TypeOfShop" ADD CONSTRAINT "TypeOfShop_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfPlastic" ADD CONSTRAINT "TypeOfPlastic_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaf" ADD CONSTRAINT "Leaf_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterSize" ADD CONSTRAINT "FilterSize_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tabacco" ADD CONSTRAINT "Tabacco_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plastic" ADD CONSTRAINT "Plastic_plasticId_fkey" FOREIGN KEY ("plasticId") REFERENCES "TypeOfPlastic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plastic" ADD CONSTRAINT "Plastic_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plastic" ADD CONSTRAINT "Plastic_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConverycherootInstallment" ADD CONSTRAINT "ConverycherootInstallment_conveyLocationId_fkey" FOREIGN KEY ("conveyLocationId") REFERENCES "ConveyLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConverycherootInstallment" ADD CONSTRAINT "ConverycherootInstallment_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConverycherootInstallment" ADD CONSTRAINT "ConverycherootInstallment_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddStock" ADD CONSTRAINT "AddStock_typeOfPlasticId_fkey" FOREIGN KEY ("typeOfPlasticId") REFERENCES "TypeOfPlastic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banquet" ADD CONSTRAINT "Banquet_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiEnterStock" ADD CONSTRAINT "TaungyiEnterStock_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiEnterStock" ADD CONSTRAINT "TaungyiEnterStock_banquetId_fkey" FOREIGN KEY ("banquetId") REFERENCES "Banquet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiEnterStock" ADD CONSTRAINT "TaungyiEnterStock_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiQuitStock" ADD CONSTRAINT "TaungyiQuitStock_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiQuitStock" ADD CONSTRAINT "TaungyiQuitStock_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiInstallment" ADD CONSTRAINT "TaungyiInstallment_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiInstallment" ADD CONSTRAINT "TaungyiInstallment_banquetId_fkey" FOREIGN KEY ("banquetId") REFERENCES "Banquet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaungyiInstallment" ADD CONSTRAINT "TaungyiInstallment_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLeafPurchase" ADD CONSTRAINT "BagoLeafPurchase_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLeafPurchase" ADD CONSTRAINT "BagoLeafPurchase_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLeafPurchase" ADD CONSTRAINT "BagoLeafPurchase_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoFilterSizePurchase" ADD CONSTRAINT "BagoFilterSizePurchase_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoFilterSizePurchase" ADD CONSTRAINT "BagoFilterSizePurchase_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoFilterSizePurchase" ADD CONSTRAINT "BagoFilterSizePurchase_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoPlasticPurchase" ADD CONSTRAINT "BagoPlasticPurchase_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoPlasticPurchase" ADD CONSTRAINT "BagoPlasticPurchase_plasticId_fkey" FOREIGN KEY ("plasticId") REFERENCES "TypeOfPlastic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoPlasticPurchase" ADD CONSTRAINT "BagoPlasticPurchase_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLabelPurchase" ADD CONSTRAINT "BagoLabelPurchase_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLabelPurchase" ADD CONSTRAINT "BagoLabelPurchase_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLabelPurchase" ADD CONSTRAINT "BagoLabelPurchase_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLeafInstallment" ADD CONSTRAINT "BagoLeafInstallment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLeafInstallment" ADD CONSTRAINT "BagoLeafInstallment_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLeafInstallment" ADD CONSTRAINT "BagoLeafInstallment_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoFilterSizeInstallment" ADD CONSTRAINT "BagoFilterSizeInstallment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoFilterSizeInstallment" ADD CONSTRAINT "BagoFilterSizeInstallment_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoFilterSizeInstallment" ADD CONSTRAINT "BagoFilterSizeInstallment_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoPlasticInstallment" ADD CONSTRAINT "BagoPlasticInstallment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoPlasticInstallment" ADD CONSTRAINT "BagoPlasticInstallment_plasticId_fkey" FOREIGN KEY ("plasticId") REFERENCES "TypeOfPlastic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoPlasticInstallment" ADD CONSTRAINT "BagoPlasticInstallment_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLabelInstallment" ADD CONSTRAINT "BagoLabelInstallment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "TypeOfShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLabelInstallment" ADD CONSTRAINT "BagoLabelInstallment_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagoLabelInstallment" ADD CONSTRAINT "BagoLabelInstallment_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
