/*
  Warnings:

  - Added the required column `points` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionProduct" ADD COLUMN     "points" INTEGER NOT NULL;
