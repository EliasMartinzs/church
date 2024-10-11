/*
  Warnings:

  - Made the column `churchId` on table `Secretary` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Secretary" DROP CONSTRAINT "Secretary_churchId_fkey";

-- AlterTable
ALTER TABLE "Secretary" ALTER COLUMN "churchId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Secretary" ADD CONSTRAINT "Secretary_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
