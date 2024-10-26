-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_churchId_fkey";

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;
