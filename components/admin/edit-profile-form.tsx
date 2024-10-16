"use client";

import {
  userProfileFormSchema,
  UserProfileFormValidation,
} from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CiCamera } from "react-icons/ci";
import { InputMask } from "@react-input/mask";
import { Prisma } from "@prisma/client";
import {
  getAdmin,
  updateProfileAdmin,
  updateProfilePhotoAdmin,
} from "@/actions/admin";
import { SubmitButton } from "../global/submit-button";

type UserData = Prisma.PromiseReturnType<typeof getAdmin>;

type Props = {
  user: UserData;
};

export const EditProfileForm = ({ user }: Props) => {
  const form = useForm<UserProfileFormValidation>({
    mode: "onChange",
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      fullname: user?.fullName || "",
      phone: "",
      photoUrl: user?.photoUrl || "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: UserProfileFormValidation) => {
    startTransition(async () => {
      await updateProfileAdmin(values);
      toast("Perfil salvo com sucesso!", {
        description: "Suas alterações foram salvas com êxito.",
      });
    });
  };

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:max-w-xl lg::mr-auto space-y-6"
      >
        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center lg:justify-start">
              <FormControl>
                <div className="relative w-20 h-20 border rounded-full">
                  <CldUploadWidget
                    uploadPreset="crambpreset"
                    onSuccess={(e) => {
                      if (typeof e.info === "object" && e.info !== undefined) {
                        if (e.info.secure_url) {
                          updateProfilePhotoAdmin(e.info?.secure_url);
                          field.onChange(e.info.secure_url);
                        }
                      }
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button
                          onClick={() => open?.()}
                          type="button"
                          className="absolute inset-0 w-full h-full opacity-0 z-10"
                        ></button>
                      );
                    }}
                  </CldUploadWidget>

                  {form.getValues("photoUrl") && (
                    <>
                      <Image
                        src={form.getValues("photoUrl") as string}
                        alt="Profile Image"
                        fill
                        className="object-cover rounded-full relative h-20 w-20"
                      />
                      <div className="size-6 bg-background rounded-3xl text-foreground grid place-items-center absolute bottom-0 right-0">
                        <CiCamera className="size-5" />
                      </div>
                    </>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder={field.value || "Nome"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <InputMask
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field?.value?.toString() || "(00) 00000-0000"}
                  mask="(__) _____-____"
                  replacement="_"
                  className="flex h-9 w-full bg-transparent border border-input rounded-2xl p-6 text-sm transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitButton
          isFormDirty={isFormDirty}
          isPending={isPending}
          labelLoading="Salvando ..."
          labelButton="Salvar"
        />
      </form>
    </Form>
  );
};
