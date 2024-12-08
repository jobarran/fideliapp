/*
  Warnings:

  - You are about to drop the column `reason` on the `PointTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PointTransaction" DROP COLUMN "reason";

-- CreateTable
CREATE TABLE "TransactionProduct" (
    "id" TEXT NOT NULL,
    "pointTransactionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "TransactionProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TransactionProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionProduct_pointTransactionId_productId_key" ON "TransactionProduct"("pointTransactionId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionProducts_AB_unique" ON "_TransactionProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionProducts_B_index" ON "_TransactionProducts"("B");

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_pointTransactionId_fkey" FOREIGN KEY ("pointTransactionId") REFERENCES "PointTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionProduct" ADD CONSTRAINT "TransactionProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionProducts" ADD CONSTRAINT "_TransactionProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "PointTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionProducts" ADD CONSTRAINT "_TransactionProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
