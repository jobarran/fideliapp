/*
  Warnings:

  - You are about to drop the column `userId` on the `Pin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cardId]` on the table `Pin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardId` to the `Pin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_userId_fkey";

-- DropIndex
DROP INDEX "Pin_userId_idx";

-- AlterTable
ALTER TABLE "Pin" DROP COLUMN "userId",
ADD COLUMN     "cardId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pin_cardId_key" ON "Pin"("cardId");

-- CreateIndex
CREATE INDEX "Pin_cardId_idx" ON "Pin"("cardId");

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
