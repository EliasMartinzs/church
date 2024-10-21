-- DropForeignKey
ALTER TABLE "PrayerRequest" DROP CONSTRAINT "PrayerRequest_memberId_fkey";

-- AddForeignKey
ALTER TABLE "PrayerRequest" ADD CONSTRAINT "PrayerRequest_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
