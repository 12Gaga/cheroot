/*
  Warnings:

  - You are about to drop the column `cigratteIndustryId` on the `Agent` table. All the data in the column will be lost.
  - You are about to drop the column `townId` on the `MainMoney` table. All the data in the column will be lost.
  - You are about to drop the `Town` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workShopId` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viss` to the `AgentLeafViss` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workShopId` to the `AgentLeafViss` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `MainMoney` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_cigratteIndustryId_fkey";

-- DropForeignKey
ALTER TABLE "MainMoney" DROP CONSTRAINT "MainMoney_townId_fkey";

-- DropForeignKey
ALTER TABLE "Town" DROP CONSTRAINT "Town_workShopId_fkey";

-- AlterTable
ALTER TABLE "Agent" DROP COLUMN "cigratteIndustryId",
ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AgentLeafViss" ADD COLUMN     "viss" INTEGER NOT NULL,
ADD COLUMN     "workShopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FormOfPacking" ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "MainMoney" DROP COLUMN "townId",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Town";

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeafViss" ADD CONSTRAINT "AgentLeafViss_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainMoney" ADD CONSTRAINT "MainMoney_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ConveyLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
