-- DropForeignKey
ALTER TABLE "Secretary" DROP CONSTRAINT "Secretary_churchId_fkey";

-- AddForeignKey
ALTER TABLE "Secretary" ADD CONSTRAINT "Secretary_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;
