/*
  Warnings:

  - You are about to drop the column `churchId` on the `ChurchStatistics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[churchStatiticsId]` on the table `Church` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `churchStatiticsId` to the `Church` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChurchStatistics" DROP CONSTRAINT "ChurchStatistics_churchId_fkey";

-- DropIndex
DROP INDEX "ChurchStatistics_churchId_key";

-- AlterTable
ALTER TABLE "Church" ADD COLUMN     "churchStatiticsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ChurchStatistics" DROP COLUMN "churchId";

-- CreateIndex
CREATE UNIQUE INDEX "Church_churchStatiticsId_key" ON "Church"("churchStatiticsId");

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_churchStatiticsId_fkey" FOREIGN KEY ("churchStatiticsId") REFERENCES "ChurchStatistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
