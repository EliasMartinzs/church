-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_cellId_fkey";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell"("id") ON DELETE CASCADE ON UPDATE CASCADE;
