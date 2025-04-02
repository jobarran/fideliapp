-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PRODUCT', 'PROMOTION');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productType" "ProductType" NOT NULL DEFAULT 'PRODUCT';
