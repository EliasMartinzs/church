import { getAdmin } from "@/actions/admin";
import { DivWrapper } from "@/components/global/div-wrapper";
import { NotificationUser } from "@/components/global/notification-user";

export default async function Admin() {
  const admin = await getAdmin();

  return (
    <DivWrapper>
      <NotificationUser isCompleted={!admin?.isCompleted} />
      {/* <StatsCard /> */}
    </DivWrapper>
  );
}
