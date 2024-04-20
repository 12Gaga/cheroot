/*
  Warnings:

  - You are about to drop the column `workShopId` on the `TypeOfLeaf` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TypeOfLeaf" DROP CONSTRAINT "TypeOfLeaf_workShopId_fkey";

-- AlterTable
ALTER TABLE "TypeOfLeaf" DROP COLUMN "workShopId";
