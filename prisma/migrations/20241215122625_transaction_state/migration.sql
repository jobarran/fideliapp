-- CreateEnum
CREATE TYPE "TransactionState" AS ENUM ('CONFIRMED', 'CANCELLED');

-- AlterTable
ALTER TABLE "PointTransaction" ADD COLUMN     "state" "TransactionState" NOT NULL DEFAULT 'CONFIRMED';
