-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_cardId_fkey";

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
