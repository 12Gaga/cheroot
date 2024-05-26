/*
  Warnings:

  - Changed the type of `date` on the `AddStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `Leaf` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AddStock" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Leaf" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
