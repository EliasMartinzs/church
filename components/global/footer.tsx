import { footerInfo } from "@/constants";
import React from "react";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col gap-y-10 items-center justify-center text-muted-foreground py-10">
      <div className="flex items-center gap-x-10">
        <CiInstagram className="size-10" />
        <CiLinkedin className="size-10" />
      </div>

      <small className="flex items-center text-center gap-2">
        © ${new Date().getFullYear()} Cramb. Todos os direitos reservados.
      </small>
    </footer>
  );
};
