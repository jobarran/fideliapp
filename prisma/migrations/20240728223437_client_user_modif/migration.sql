/*
  Warnings:

  - You are about to drop the column `clientId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `PointTransactionTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,companyId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `PointTransactionTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'CLIENT', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_clientId_fkey";

-- DropForeignKey
ALTER TABLE "PointTransactionTemplate" DROP CONSTRAINT "PointTransactionTemplate_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_clientId_fkey";

-- DropIndex
DROP INDEX "Card_userId_clientId_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "clientId",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PointTransactionTemplate" DROP COLUMN "clientId",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "clientId",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Client";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "backgroundColor" TEXT,
    "logo" TEXT,
    "acceptReferral" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "openDays" TEXT,
    "openHours" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_companyId_key" ON "Card"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransactionTemplate" ADD CONSTRAINT "PointTransactionTemplate_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
