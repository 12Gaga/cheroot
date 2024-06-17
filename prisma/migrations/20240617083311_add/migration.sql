/*
  Warnings:

  - Added the required column `seq` to the `AgentRemineLeaf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seq` to the `LeafDeduction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterDate` to the `LeafTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seq` to the `OtherDeduction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterDate` to the `PayLeaf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seq` to the `ReturnReadyCheroot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "phoneNo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "AgentRemineLeaf" ADD COLUMN     "seq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExtraPurchase" ALTER COLUMN "filterSizePrice" SET DEFAULT 0,
ALTER COLUMN "filterSizePrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tabaccoPrice" SET DEFAULT 0,
ALTER COLUMN "tabaccoPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "labelPrice" SET DEFAULT 0,
ALTER COLUMN "labelPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalAmount" SET DEFAULT 0,
ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "filterSizeAmount" SET DEFAULT 0,
ALTER COLUMN "filterSizeAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "labelAmount" SET DEFAULT 0,
ALTER COLUMN "labelAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tabaccoAmount" SET DEFAULT 0,
ALTER COLUMN "tabaccoAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "LeafDeduction" ADD COLUMN     "seq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LeafTransferGarage" ADD COLUMN     "enterDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OtherDeduction" ADD COLUMN     "seq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PayLeaf" ADD COLUMN     "enterDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReturnReadyCheroot" ADD COLUMN     "seq" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AgentRemainCash" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "remainCashBig" INTEGER NOT NULL,
    "remainCashSmall" INTEGER NOT NULL,
    "seq" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AgentRemainCash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraPurchaseSummery" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "tolPrice" DOUBLE PRECISION NOT NULL,
    "purchaseSeq" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExtraPurchaseSummery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentLeftTabacco" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "typeOfTabaccoId" INTEGER NOT NULL,
    "tin" INTEGER NOT NULL,
    "pyi" DOUBLE PRECISION NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AgentLeftTabacco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentLeftFilterSize" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AgentLeftFilterSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentLeftLabel" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "typeOfLabelId" INTEGER NOT NULL,
    "bandle" DOUBLE PRECISION NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AgentLeftLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompensationFilterSize" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "remainQty" INTEGER NOT NULL,
    "compensationQty" INTEGER NOT NULL,
    "takeMoneyQty" INTEGER NOT NULL,
    "filterPrice" DOUBLE PRECISION NOT NULL,
    "tolAmount" DOUBLE PRECISION NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CompensationFilterSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompensationTabacco" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "remainPyi" DOUBLE PRECISION NOT NULL,
    "compensationPyi" DOUBLE PRECISION NOT NULL,
    "takeMoneyPyi" DOUBLE PRECISION NOT NULL,
    "tabaccoPrice" DOUBLE PRECISION NOT NULL,
    "tolAmount" DOUBLE PRECISION NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CompensationTabacco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompensationLabel" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "remainBandel" DOUBLE PRECISION NOT NULL,
    "compensationBandle" DOUBLE PRECISION NOT NULL,
    "takeMoneyBandle" DOUBLE PRECISION NOT NULL,
    "labelPrice" DOUBLE PRECISION NOT NULL,
    "tolAmount" DOUBLE PRECISION NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CompensationLabel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AgentRemainCash" ADD CONSTRAINT "AgentRemainCash_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRemainCash" ADD CONSTRAINT "AgentRemainCash_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchaseSummery" ADD CONSTRAINT "ExtraPurchaseSummery_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchaseSummery" ADD CONSTRAINT "ExtraPurchaseSummery_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftTabacco" ADD CONSTRAINT "AgentLeftTabacco_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftTabacco" ADD CONSTRAINT "AgentLeftTabacco_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftTabacco" ADD CONSTRAINT "AgentLeftTabacco_typeOfTabaccoId_fkey" FOREIGN KEY ("typeOfTabaccoId") REFERENCES "TypeOfTabacco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftTabacco" ADD CONSTRAINT "AgentLeftTabacco_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftFilterSize" ADD CONSTRAINT "AgentLeftFilterSize_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftFilterSize" ADD CONSTRAINT "AgentLeftFilterSize_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftFilterSize" ADD CONSTRAINT "AgentLeftFilterSize_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftFilterSize" ADD CONSTRAINT "AgentLeftFilterSize_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftLabel" ADD CONSTRAINT "AgentLeftLabel_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftLabel" ADD CONSTRAINT "AgentLeftLabel_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftLabel" ADD CONSTRAINT "AgentLeftLabel_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeftLabel" ADD CONSTRAINT "AgentLeftLabel_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationFilterSize" ADD CONSTRAINT "CompensationFilterSize_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationFilterSize" ADD CONSTRAINT "CompensationFilterSize_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationFilterSize" ADD CONSTRAINT "CompensationFilterSize_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationTabacco" ADD CONSTRAINT "CompensationTabacco_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationTabacco" ADD CONSTRAINT "CompensationTabacco_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationTabacco" ADD CONSTRAINT "CompensationTabacco_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationLabel" ADD CONSTRAINT "CompensationLabel_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationLabel" ADD CONSTRAINT "CompensationLabel_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompensationLabel" ADD CONSTRAINT "CompensationLabel_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
