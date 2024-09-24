import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";

import React from "react";
import { Button } from "../ui/button";

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  className?: string;
  onChange: (...event: any[]) => void;
  field: string;
  erroMessage: React.ReactNode;
};

export const ReusableSelect = ({
  data,
  placeholder,
  className,
  onChange,
  erroMessage,
  field,
}: Props) => {
  return (
    <Select
      onValueChange={(e) => {
        onChange(e);
      }}
    >
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data?.length === undefined || data.length === 0 ? (
          <>{erroMessage}</>
        ) : (
          data?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};
