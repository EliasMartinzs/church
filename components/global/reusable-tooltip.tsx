"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";
import { toast } from "sonner";

type Props = {
  icon: React.ReactNode;
  text: string;
  toastMessage?: string;
};

export const ReusableTooltip = ({ icon, text, toastMessage }: Props) => {
  const onClick = () => {
    toastMessage !== undefined && toast(toastMessage);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={onClick} type="submit">
          {icon}
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
