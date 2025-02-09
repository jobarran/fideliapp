/*
  Warnings:

  - Made the column `productId` on table `TransactionProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" ALTER COLUMN "productId" SET NOT NULL;
