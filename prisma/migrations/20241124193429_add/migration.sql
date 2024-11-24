-- CreateEnum
CREATE TYPE "PinState" AS ENUM ('CREATED', 'IN_USE');

-- AlterTable
ALTER TABLE "Pin" ADD COLUMN     "state" "PinState" NOT NULL DEFAULT 'CREATED';
