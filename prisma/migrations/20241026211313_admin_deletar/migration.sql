/*
  Warnings:

  - You are about to drop the column `churchStatiticsId` on the `Church` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[churchId]` on the table `ChurchStatistics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `churchId` to the `ChurchStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Church" DROP CONSTRAINT "Church_churchStatiticsId_fkey";

-- DropIndex
DROP INDEX "Church_churchStatiticsId_key";

-- AlterTable
ALTER TABLE "Church" DROP COLUMN "churchStatiticsId";

-- AlterTable
ALTER TABLE "ChurchStatistics" ADD COLUMN     "churchId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChurchStatistics_churchId_key" ON "ChurchStatistics"("churchId");

-- AddForeignKey
ALTER TABLE "ChurchStatistics" ADD CONSTRAINT "ChurchStatistics_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;
