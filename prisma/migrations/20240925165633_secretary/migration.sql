/*
  Warnings:

  - Made the column `churchId` on table `Cell` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_churchId_fkey";

-- AlterTable
ALTER TABLE "Cell" ALTER COLUMN "churchId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
