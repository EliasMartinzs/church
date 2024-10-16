"use client";

import { prayerRequestForm, PrayerRequestValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";

type Props = {
  members:
    | {
        id: string;
        fullName: string | null;
      }[]
    | undefined;
};

export const NewPrayerForm = ({ members }: Props) => {
  const form = useForm<PrayerRequestValidation>({
    resolver: zodResolver(prayerRequestForm),
    defaultValues: {
      title: "",
      description: "",
      answeredAt: false,
      category: "COMMUNITY",
      memberId: "",
      status: "PENDING",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: PrayerRequestValidation) {}

  return <Form {...form}></Form>;
};
