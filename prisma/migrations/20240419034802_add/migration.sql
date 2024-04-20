/*
  Warnings:

  - You are about to drop the `AgentName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AgentName";

-- CreateTable
CREATE TABLE "CigratteIndustry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CigratteIndustry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "adderess" TEXT NOT NULL,
    "cashBalcanceBig" INTEGER NOT NULL,
    "cashBalcanceSmall" INTEGER NOT NULL,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkShop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cigratteIndustryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WorkShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfLeaf" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isAvariabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfLeaf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfFilterSize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isAvariabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfFilterSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfTabacco" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isAvariabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfTabacco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfLabel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "workShopId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isAvariabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeOfLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentLeafViss" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "typeOfLeafId" INTEGER NOT NULL,

    CONSTRAINT "AgentLeafViss_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkShop" ADD CONSTRAINT "WorkShop_cigratteIndustryId_fkey" FOREIGN KEY ("cigratteIndustryId") REFERENCES "CigratteIndustry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garage" ADD CONSTRAINT "Garage_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfLeaf" ADD CONSTRAINT "TypeOfLeaf_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfFilterSize" ADD CONSTRAINT "TypeOfFilterSize_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfTabacco" ADD CONSTRAINT "TypeOfTabacco_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOfLabel" ADD CONSTRAINT "TypeOfLabel_workShopId_fkey" FOREIGN KEY ("workShopId") REFERENCES "WorkShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeafViss" ADD CONSTRAINT "AgentLeafViss_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentLeafViss" ADD CONSTRAINT "AgentLeafViss_typeOfLeafId_fkey" FOREIGN KEY ("typeOfLeafId") REFERENCES "TypeOfLeaf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
