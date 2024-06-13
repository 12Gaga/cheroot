-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "phoneNo" SET DATA TYPE BIGINT,
ALTER COLUMN "cashBalcanceBig" SET DATA TYPE BIGINT,
ALTER COLUMN "cashBalcanceSmall" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoFilterSizeInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "payBalance" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoFilterSizePurchase" ALTER COLUMN "totalPrice" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoLabelInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "payBalance" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoLabelPurchase" ALTER COLUMN "totalPrice" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoLeafInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "payBalance" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoLeafPurchase" ALTER COLUMN "totalPrice" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoPlasticInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "payBalance" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "BagoPlasticPurchase" ALTER COLUMN "totalPrice" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ClosingDailyBalance" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ClosingMainBalance" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ConverycherootInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "payBalance" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Conveying" ALTER COLUMN "cashBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "totalPrice" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ExtraPurchase" ALTER COLUMN "totalAmount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "LeafDeduction" ALTER COLUMN "deductionAmount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "MainDirectPayment" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "MainMoney" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "OtherDeduction" ALTER COLUMN "totalNetAgentPayment" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "PayLeaf" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "PayOtherItem" ALTER COLUMN "totalPrice" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ReplenishmentMoney" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ReturnReadyCheroot" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "TaungyiEnterStock" ALTER COLUMN "totalPrice" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "TaungyiInstallment" ALTER COLUMN "cashBalance" SET DATA TYPE BIGINT,
ALTER COLUMN "payBalance" SET DATA TYPE BIGINT;
