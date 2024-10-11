"use client";

import { handleIsCompleted } from "@/actions/admin";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  isCompleted: boolean;
};

export const NotificationUser = ({ isCompleted }: Props) => {
  const [open, setOpen] = useState(isCompleted);
  const router = useRouter();

  const handleLater = async () => {
    setOpen(false);
    handleIsCompleted();
  };

  const goToProfile = async () => {
    router.push("/admin/profile");
    handleIsCompleted();
  };

  return (
    <>
      {open && (
        <>
          <div className="fixed left-[50%] top-[50%] z-40 w-full h-svh bg-black/80 translate-x-[-50%] translate-y-[-50%] overflow-hidden" />
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm mx-auto translate-x-[-50%] translate-y-[-50%] bg-card p-8 rounded-2xl gap-y-3 shadow-3xl">
            <h4 className="text-center text-xl">
              Complete seu perfil para aproveitar todos os recursos!
            </h4>

            <p className="text-muted-foreground text-sm text-center leading-6">
              Preencha suas informações para acessar recursos personalizados e
              otimizar sua experiência na plataforma. É rápido e fácil!
            </p>

            <div className="w-full flex gap-x-3">
              <Button onClick={handleLater} size="full">
                Lembre-me depois
              </Button>
              <Button onClick={goToProfile} variant="outline" size="full">
                Meu perfil
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};