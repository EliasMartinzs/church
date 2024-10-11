-- DropForeignKey
ALTER TABLE "Secretary" DROP CONSTRAINT "Secretary_churchId_fkey";

-- AlterTable
ALTER TABLE "Secretary" ALTER COLUMN "churchId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Secretary" ADD CONSTRAINT "Secretary_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;
