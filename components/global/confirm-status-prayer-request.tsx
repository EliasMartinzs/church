"use client";

import {
  changeStatusPrayerRequest,
  deletePrayerRequest,
} from "@/actions/global";
import { useTransition } from "react";
import { ReusableTooltip } from "./reusable-tooltip";
import { MdDone } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { Loader2, Trash } from "lucide-react";

type Props = {
  id: string;
  profile: "admin" | "secretary" | "member";
};

export const ConfirmPrayerStatusRequest = ({ id, profile }: Props) => {
  const [isPending, startTransition] = useTransition();

  const answered = async () => {
    startTransition(async () => {
      await changeStatusPrayerRequest(id, "ANSWERED", "/admin/prayers");
    });
  };

  const inProgress = async () => {
    startTransition(async () => {
      await changeStatusPrayerRequest(id, "IN_PROGRESS", "/admin/prayers");
    });
  };

  const deletePrayer = async () => {
    startTransition(async () => {
      await deletePrayerRequest(id, "/admin/prayers");
    });
  };

  return (
    <div className="flex items-center gap-x-5">
      {isPending ? (
        <Loader2 className="size-10 animate-spin" />
      ) : (
        <>
          {profile !== "member" && (
            <>
              <ReusableTooltip
                icon={<MdDone className="size-10" onClick={answered} />}
                text="Oração concluida"
              />
              <ReusableTooltip
                icon={
                  <IoTimeOutline className="size-10" onClick={inProgress} />
                }
                text="Oração em progresso"
              />
            </>
          )}
          <ReusableTooltip
            icon={<Trash className="size-10" onClick={deletePrayer} />}
            text="Deletar oração"
          />
        </>
      )}
    </div>
  );
};
