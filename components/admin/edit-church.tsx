import React from "react";
import { Title } from "../global/title";
import { EditChurchForm } from "./edit-church-form";
import { Church } from "@prisma/client";

type Props = {
  church: Church;
};

export const EditChurch = ({ church }: Props) => {
  return (
    <div className="mt-5 space-y-6">
      <Title text="Minha Igreja" />
      <EditChurchForm church={church} />
    </div>
  );
};
