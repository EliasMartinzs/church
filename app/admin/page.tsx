import {
  getAdmin,
  getChurchStatistic,
  getMeetigsPerday,
  getNewMembersPerMonth,
  getParticipationData,
} from "@/actions/admin";
import { NotificationUser } from "@/components/global/notification-user";
import { GridLayoutChart } from "@/components/admin/grid-layout";
import { CustomCalendar } from "@/components/global/custom-calendar";

export default async function Admin() {
  const [admin, members, membersPerMonth, meetingsPerDay, attendanceStatus] =
    await Promise.all([
      getAdmin(),
      getChurchStatistic(),
      getNewMembersPerMonth(),
      getMeetigsPerday(),
      getParticipationData(),
    ]);

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <NotificationUser
        href="/admin/profile"
        isCompleted={!admin?.isCompleted}
        profile="admin"
      />

      <h4 className="text-xl mb-4">
        <span className="font-medium">Bem vindo(a),</span> {admin?.fullName}
      </h4>

      <CustomCalendar />

      <GridLayoutChart
        attendanceStatus={attendanceStatus}
        members={members}
        meetingsPerDay={meetingsPerDay}
        membersPerMonth={membersPerMonth}
      />
    </div>
  );
}
