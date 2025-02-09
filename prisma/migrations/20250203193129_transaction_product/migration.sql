/*
  Warnings:

  - You are about to drop the `_TransactionProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `TransactionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TransactionProducts" DROP CONSTRAINT "_TransactionProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionProducts" DROP CONSTRAINT "_TransactionProducts_B_fkey";

-- DropIndex
DROP INDEX "TransactionProduct_pointTransactionId_productId_key";

-- AlterTable
ALTER TABLE "TransactionProduct" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TransactionProducts";
