-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_secretaryId_fkey";

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_secretaryId_fkey" FOREIGN KEY ("secretaryId") REFERENCES "Secretary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
