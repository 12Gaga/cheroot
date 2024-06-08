/*
  Warnings:

  - Added the required column `tabaccoBag` to the `PayOtherItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopTitleId` to the `TypeOfShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayOtherItem" ADD COLUMN     "tabaccoBag" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TypeOfShop" ADD COLUMN     "shopTitleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ShopTitle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ShopTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentRemineLeaf" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" INTEGER NOT NULL,
    "leafId" INTEGER NOT NULL,
    "Viss" INTEGER NOT NULL DEFAULT 0,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AgentRemineLeaf_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShopTitle" ADD CONSTRAINT "ShopTitle_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfShop" ADD CONSTRAINT "TypeOfShop_shopTitleId_fkey" FOREIGN KEY ("shopTitleId") REFERENCES "ShopTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRemineLeaf" ADD CONSTRAINT "AgentRemineLeaf_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRemineLeaf" ADD CONSTRAINT "AgentRemineLeaf_leafId_fkey" FOREIGN KEY ("leafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRemineLeaf" ADD CONSTRAINT "AgentRemineLeaf_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
