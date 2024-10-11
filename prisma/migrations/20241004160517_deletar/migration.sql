-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_cellId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingResponse" DROP CONSTRAINT "MeetingResponse_meetingId_fkey";

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingResponse" ADD CONSTRAINT "MeetingResponse_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
