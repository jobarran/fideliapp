/*
  Warnings:

  - You are about to drop the column `points` on the `TransactionProduct` table. All the data in the column will be lost.
  - Added the required column `productName` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPoints` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionProduct" DROP CONSTRAINT "TransactionProduct_productId_fkey";

-- AlterTable
ALTER TABLE "TransactionProduct" DROP COLUMN "points",
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "productPoints" INTEGER NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;
