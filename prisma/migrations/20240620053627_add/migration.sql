/*
  Warnings:

  - Added the required column `addCashBig` to the `CompensationFilterSize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addCashsmall` to the `CompensationFilterSize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inCash` to the `CompensationFilterSize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addCashBig` to the `CompensationLabel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addCashsmall` to the `CompensationLabel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inCash` to the `CompensationLabel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addCashBig` to the `CompensationTabacco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addCashsmall` to the `CompensationTabacco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inCash` to the `CompensationTabacco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseSeq` to the `ExtraPurchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seq` to the `PayLeaf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reduceBandle` to the `ReturnReadyCheroot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompensationFilterSize" ADD COLUMN     "addCashBig" INTEGER NOT NULL,
ADD COLUMN     "addCashsmall" INTEGER NOT NULL,
ADD COLUMN     "inCash" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CompensationLabel" ADD COLUMN     "addCashBig" INTEGER NOT NULL,
ADD COLUMN     "addCashsmall" INTEGER NOT NULL,
ADD COLUMN     "inCash" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CompensationTabacco" ADD COLUMN     "addCashBig" INTEGER NOT NULL,
ADD COLUMN     "addCashsmall" INTEGER NOT NULL,
ADD COLUMN     "inCash" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ExtraPurchase" ADD COLUMN     "purchaseSeq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LeafDeduction" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "deductionAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OtherDeduction" ALTER COLUMN "otherDeduction" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "netAgentPayment" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalNetAgentPayment" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "PayLeaf" ADD COLUMN     "seq" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ReturnReadyCheroot" ADD COLUMN     "reduceBandle" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "goodPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "CompensationLeaf" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER NOT NULL,
    "remainViss" INTEGER NOT NULL,
    "compensationViss" INTEGER NOT NULL,
    "takeMoneyViss" INTEGER NOT NULL,
    "leafPrice" DOUBLE PRECISION NOT NULL,
    "tolAmount" DOUBLE PRECISION NOT NULL,
    "addCashBig" INTEGER NOT NULL,
    "addCashsmall" INTEGER NOT NULL,
    "inCash" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CompensationLeaf_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompensationLeaf" ADD CONSTRAINT "CompensationLeaf_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationLeaf" ADD CONSTRAINT "CompensationLeaf_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationLeaf" ADD CONSTRAINT "CompensationLeaf_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
