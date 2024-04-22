-- AlterTable
ALTER TABLE "AgentLeafViss" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Leaf" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeOfLeafId" INTEGER NOT NULL,
    "batchNo" INTEGER NOT NULL,
    "viss" INTEGER NOT NULL,
    "shop" TEXT NOT NULL,
    "garageId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Leaf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterSize" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "bag" INTEGER NOT NULL,
    "shop" TEXT NOT NULL,
    "garageId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FilterSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tabacco" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeOfTabaccoId" INTEGER NOT NULL,
    "tin" INTEGER NOT NULL,
    "pyi" INTEGER NOT NULL,
    "bag" INTEGER NOT NULL,
    "shop" TEXT NOT NULL,
    "garageId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tabacco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeOfLabelId" INTEGER NOT NULL,
    "bandle" INTEGER NOT NULL,
    "shop" TEXT NOT NULL,
    "garageId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfCheroot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isAvariabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfCheroot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfPacking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfPacking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormOfPacking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "typeOfPackingId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FormOfPacking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packing" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeOfCherootId" INTEGER NOT NULL,
    "typeOfPackingId" INTEGER NOT NULL,
    "formOfPackingId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,

    CONSTRAINT "Packing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConveyLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ConveyLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conveying" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conveyLocationId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "typeOfPackingId" INTEGER NOT NULL,
    "formOfPackingId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Conveying_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Town" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Town_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensiveLabel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isAvariabled" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExpensiveLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyExpensive" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expensiveLabelId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DailyExpensive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainMoney" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "townId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MainMoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplenishmentMoney" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReplenishmentMoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClosingMainBalance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClosingMainBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClosingDailyBalance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClosingDailyBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainDirectPayment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tilte" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MainDirectPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddStock" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invNo" INTEGER NOT NULL,
    "carNo" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER,
    "typeOfFilterSizeId" INTEGER,
    "typeOfTabaccoId" INTEGER,
    "typeOfLabelId" INTEGER,
    "garageId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AddStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayLeaf" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER NOT NULL,
    "batchNo" INTEGER NOT NULL,
    "viss" INTEGER NOT NULL,
    "discountViss" INTEGER NOT NULL DEFAULT 0,
    "netViss" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "garageId" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PayLeaf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountViss" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "discountViss" INTEGER NOT NULL DEFAULT 0,
    "discountAmount" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DiscountViss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayOtherItem" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "cherootQty" INTEGER NOT NULL,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "filterSizeQty" INTEGER NOT NULL,
    "filterSizeBag" INTEGER NOT NULL,
    "typeOfTabaccoId" INTEGER NOT NULL,
    "tabaccoQty" INTEGER NOT NULL,
    "tabaccoTin" INTEGER NOT NULL,
    "tabaccoPyi" INTEGER NOT NULL,
    "typeOfLabelId" INTEGER NOT NULL,
    "labelBandle" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "garageId" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PayOtherItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnReadyCheroot" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "goodQty" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "totalCherootQty" INTEGER NOT NULL,
    "goodPrice" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReturnReadyCheroot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeafDeduction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER NOT NULL,
    "deductViss" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "deductionAmount" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LeafDeduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherDeduction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "cashAdvanceBigDeduction" INTEGER NOT NULL,
    "cashAdvanceSmallDeduction" INTEGER NOT NULL,
    "otherDeduction" INTEGER NOT NULL,
    "cashAdvanceBig" INTEGER NOT NULL,
    "cashAdvanceSmall" INTEGER NOT NULL,
    "netAgentPayment" INTEGER NOT NULL,
    "totalNetAgentPayment" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OtherDeduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraPurchase" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "filterSizeQty" INTEGER NOT NULL DEFAULT 0,
    "filterSizeBag" INTEGER NOT NULL DEFAULT 0,
    "filterSizePrice" INTEGER NOT NULL DEFAULT 0,
    "typeOfTabaccoId" INTEGER NOT NULL,
    "tabaccoQty" INTEGER NOT NULL DEFAULT 0,
    "tabaccoTin" INTEGER NOT NULL DEFAULT 0,
    "tabaccoPyi" INTEGER NOT NULL DEFAULT 0,
    "tabaccoPrice" INTEGER NOT NULL DEFAULT 0,
    "typeOfLabelId" INTEGER NOT NULL,
    "labelBandle" INTEGER NOT NULL DEFAULT 0,
    "labelPrice" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "garageId" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExtraPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeafTransferGarage" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enterenceGarageId" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER NOT NULL,
    "batchNo" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LeafTransferGarage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterSizeTransferGarage" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enterenceGarageId" INTEGER NOT NULL,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "batchNo" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FilterSizeTransferGarage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TabaccoTransferGarage" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enterenceGarageId" INTEGER NOT NULL,
    "typeOfTabaccoId" INTEGER NOT NULL,
    "batchNo" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TabaccoTransferGarage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabelTransferGarage" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enterenceGarageId" INTEGER NOT NULL,
    "typeOfLabelId" INTEGER NOT NULL,
    "batchNo" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LabelTransferGarage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formula" (
    "id" SERIAL NOT NULL,
    "typeOfCherootId" INTEGER NOT NULL,
    "cherootQty" INTEGER NOT NULL,
    "typeOfFilterSizeId" INTEGER NOT NULL,
    "filterSizeQty" INTEGER NOT NULL,
    "filterSizeBag" INTEGER NOT NULL,
    "typeOfTabaccoId" INTEGER NOT NULL,
    "tabaccoQty" INTEGER NOT NULL,
    "tabaccoTin" INTEGER NOT NULL,
    "tabaccoPyi" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Formula_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Leaf" ADD CONSTRAINT "Leaf_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaf" ADD CONSTRAINT "Leaf_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterSize" ADD CONSTRAINT "FilterSize_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterSize" ADD CONSTRAINT "FilterSize_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tabacco" ADD CONSTRAINT "Tabacco_typeOfTabaccoId_fkey" FOREIGN KEY ("typeOfTabaccoId") REFERENCES "TypeOfTabacco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tabacco" ADD CONSTRAINT "Tabacco_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfCheroot" ADD CONSTRAINT "TypeOfCheroot_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfPacking" ADD CONSTRAINT "TypeOfPacking_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfPacking" ADD CONSTRAINT "TypeOfPacking_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormOfPacking" ADD CONSTRAINT "FormOfPacking_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormOfPacking" ADD CONSTRAINT "FormOfPacking_typeOfPackingId_fkey" FOREIGN KEY ("typeOfPackingId") REFERENCES "TypeOfPacking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormOfPacking" ADD CONSTRAINT "FormOfPacking_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_typeOfPackingId_fkey" FOREIGN KEY ("typeOfPackingId") REFERENCES "TypeOfPacking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_formOfPackingId_fkey" FOREIGN KEY ("formOfPackingId") REFERENCES "FormOfPacking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packing" ADD CONSTRAINT "Packing_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConveyLocation" ADD CONSTRAINT "ConveyLocation_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conveying" ADD CONSTRAINT "Conveying_conveyLocationId_fkey" FOREIGN KEY ("conveyLocationId") REFERENCES "ConveyLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conveying" ADD CONSTRAINT "Conveying_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conveying" ADD CONSTRAINT "Conveying_typeOfPackingId_fkey" FOREIGN KEY ("typeOfPackingId") REFERENCES "TypeOfPacking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conveying" ADD CONSTRAINT "Conveying_formOfPackingId_fkey" FOREIGN KEY ("formOfPackingId") REFERENCES "FormOfPacking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conveying" ADD CONSTRAINT "Conveying_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpensiveLabel" ADD CONSTRAINT "ExpensiveLabel_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExpensive" ADD CONSTRAINT "DailyExpensive_expensiveLabelId_fkey" FOREIGN KEY ("expensiveLabelId") REFERENCES "ExpensiveLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExpensive" ADD CONSTRAINT "DailyExpensive_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainMoney" ADD CONSTRAINT "MainMoney_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainMoney" ADD CONSTRAINT "MainMoney_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplenishmentMoney" ADD CONSTRAINT "ReplenishmentMoney_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClosingMainBalance" ADD CONSTRAINT "ClosingMainBalance_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClosingDailyBalance" ADD CONSTRAINT "ClosingDailyBalance_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainDirectPayment" ADD CONSTRAINT "MainDirectPayment_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddStock" ADD CONSTRAINT "AddStock_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddStock" ADD CONSTRAINT "AddStock_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddStock" ADD CONSTRAINT "AddStock_typeOfTabaccoId_fkey" FOREIGN KEY ("typeOfTabaccoId") REFERENCES "TypeOfTabacco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddStock" ADD CONSTRAINT "AddStock_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddStock" ADD CONSTRAINT "AddStock_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayLeaf" ADD CONSTRAINT "PayLeaf_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayLeaf" ADD CONSTRAINT "PayLeaf_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayLeaf" ADD CONSTRAINT "PayLeaf_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayLeaf" ADD CONSTRAINT "PayLeaf_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountViss" ADD CONSTRAINT "DiscountViss_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountViss" ADD CONSTRAINT "DiscountViss_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOtherItem" ADD CONSTRAINT "PayOtherItem_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOtherItem" ADD CONSTRAINT "PayOtherItem_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOtherItem" ADD CONSTRAINT "PayOtherItem_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOtherItem" ADD CONSTRAINT "PayOtherItem_typeOfTabaccoId_fkey" FOREIGN KEY ("typeOfTabaccoId") REFERENCES "TypeOfTabacco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOtherItem" ADD CONSTRAINT "PayOtherItem_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOtherItem" ADD CONSTRAINT "PayOtherItem_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOtherItem" ADD CONSTRAINT "PayOtherItem_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnReadyCheroot" ADD CONSTRAINT "ReturnReadyCheroot_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnReadyCheroot" ADD CONSTRAINT "ReturnReadyCheroot_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnReadyCheroot" ADD CONSTRAINT "ReturnReadyCheroot_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeafDeduction" ADD CONSTRAINT "LeafDeduction_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeafDeduction" ADD CONSTRAINT "LeafDeduction_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeafDeduction" ADD CONSTRAINT "LeafDeduction_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherDeduction" ADD CONSTRAINT "OtherDeduction_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherDeduction" ADD CONSTRAINT "OtherDeduction_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchase" ADD CONSTRAINT "ExtraPurchase_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchase" ADD CONSTRAINT "ExtraPurchase_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchase" ADD CONSTRAINT "ExtraPurchase_typeOfTabaccoId_fkey" FOREIGN KEY ("typeOfTabaccoId") REFERENCES "TypeOfTabacco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchase" ADD CONSTRAINT "ExtraPurchase_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchase" ADD CONSTRAINT "ExtraPurchase_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraPurchase" ADD CONSTRAINT "ExtraPurchase_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeafTransferGarage" ADD CONSTRAINT "LeafTransferGarage_enterenceGarageId_fkey" FOREIGN KEY ("enterenceGarageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeafTransferGarage" ADD CONSTRAINT "LeafTransferGarage_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterSizeTransferGarage" ADD CONSTRAINT "FilterSizeTransferGarage_enterenceGarageId_fkey" FOREIGN KEY ("enterenceGarageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterSizeTransferGarage" ADD CONSTRAINT "FilterSizeTransferGarage_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TabaccoTransferGarage" ADD CONSTRAINT "TabaccoTransferGarage_enterenceGarageId_fkey" FOREIGN KEY ("enterenceGarageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TabaccoTransferGarage" ADD CONSTRAINT "TabaccoTransferGarage_typeOfTabaccoId_fkey" FOREIGN KEY ("typeOfTabaccoId") REFERENCES "TypeOfTabacco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelTransferGarage" ADD CONSTRAINT "LabelTransferGarage_enterenceGarageId_fkey" FOREIGN KEY ("enterenceGarageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelTransferGarage" ADD CONSTRAINT "LabelTransferGarage_typeOfLabelId_fkey" FOREIGN KEY ("typeOfLabelId") REFERENCES "TypeOfLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_typeOfCherootId_fkey" FOREIGN KEY ("typeOfCherootId") REFERENCES "TypeOfCheroot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_typeOfFilterSizeId_fkey" FOREIGN KEY ("typeOfFilterSizeId") REFERENCES "TypeOfFilterSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_typeOfTabaccoId_fkey" FOREIGN KEY ("typeOfTabaccoId") REFERENCES "TypeOfTabacco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
