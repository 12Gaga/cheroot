/*
  Warnings:

  - You are about to alter the column `phoneNo` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalcanceBig` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalcanceSmall` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalance` on the `BagoFilterSizeInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payBalance` on the `BagoFilterSizeInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPrice` on the `BagoFilterSizePurchase` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalance` on the `BagoLabelInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payBalance` on the `BagoLabelInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPrice` on the `BagoLabelPurchase` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalance` on the `BagoLeafInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payBalance` on the `BagoLeafInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPrice` on the `BagoLeafPurchase` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalance` on the `BagoPlasticInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payBalance` on the `BagoPlasticInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPrice` on the `BagoPlasticPurchase` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `ClosingDailyBalance` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `ClosingMainBalance` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalance` on the `ConverycherootInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payBalance` on the `ConverycherootInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalance` on the `Conveying` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPrice` on the `Conveying` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalAmount` on the `ExtraPurchase` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `deductionAmount` on the `LeafDeduction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `MainDirectPayment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `MainMoney` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalNetAgentPayment` on the `OtherDeduction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `PayLeaf` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPrice` on the `PayOtherItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `ReplenishmentMoney` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `ReturnReadyCheroot` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPrice` on the `TaungyiEnterStock` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cashBalance` on the `TaungyiInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payBalance` on the `TaungyiInstallment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "phoneNo" SET DATA TYPE INTEGER,
ALTER COLUMN "cashBalcanceBig" SET DATA TYPE INTEGER,
ALTER COLUMN "cashBalcanceSmall" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoFilterSizeInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "payBalance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoFilterSizePurchase" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoLabelInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "payBalance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoLabelPurchase" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoLeafInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "payBalance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoLeafPurchase" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoPlasticInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "payBalance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "BagoPlasticPurchase" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ClosingDailyBalance" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ClosingMainBalance" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ConverycherootInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "payBalance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Conveying" ALTER COLUMN "cashBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ExtraPurchase" ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "LeafDeduction" ALTER COLUMN "deductionAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MainDirectPayment" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "MainMoney" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "OtherDeduction" ALTER COLUMN "totalNetAgentPayment" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "PayLeaf" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "PayOtherItem" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ReplenishmentMoney" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ReturnReadyCheroot" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TaungyiEnterStock" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TaungyiInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "payBalance" SET DATA TYPE INTEGER;
