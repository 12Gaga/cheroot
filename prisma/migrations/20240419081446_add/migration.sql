/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TypeOfFilterSize" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "TypeOfLabel" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "TypeOfLeaf" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "TypeOfTabacco" ALTER COLUMN "price" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
