"use client";

import {
  changeStatusPrayerRequest,
  deletePrayerRequest,
} from "@/actions/global";
import React, { useTransition } from "react";
import { ReusableTooltip } from "./reusable-tooltip";
import { MdDone } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { Loader2, X } from "lucide-react";
import { revalidatePath } from "next/cache";

type Props = {
  id: string;
};

export const ConfirmPrayerStatusRequest = ({ id }: Props) => {
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
          <ReusableTooltip
            icon={<MdDone className="size-10" onClick={answered} />}
            text="Oração concluida"
          />
          <ReusableTooltip
            icon={<IoTimeOutline className="size-10" onClick={inProgress} />}
            text="Oração em progresso"
          />
          <ReusableTooltip
            icon={<X className="size-10" onClick={deletePrayer} />}
            text="Deletar oração"
          />
        </>
      )}
    </div>
  );
};
