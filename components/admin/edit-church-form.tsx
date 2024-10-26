"use client";

import { ChurchFormValidation } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Church } from "@prisma/client";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { churchFormSchema } from "../../lib/validations";
import { Textarea } from "../ui/textarea";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { updateChurch, updateChurchPic } from "@/actions/admin";

type Props = {
  church: Church;
};

export const EditChurchForm = ({ church }: Props) => {
  const form = useForm<ChurchFormValidation>({
    mode: "onChange",
    resolver: zodResolver(churchFormSchema),
    defaultValues: {
      name: church?.name || "",
      address: church?.address || "",
      description: church?.description || "",
      photoUrl: church?.photoUrl || "/church.png",
    },
  });
  const [isPending, startTransition] = useTransition();
  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = async (values: ChurchFormValidation) => {
    startTransition(async () => {
      await updateChurch(values);
      toast("Perfil salvo com sucesso!", {
        description: "Suas alterações foram salvas com êxito.",
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:max-w-xl lg::mr-auto space-y-8 hidden-scrollbar"
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
                          updateChurchPic(e.info?.secure_url);
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
                        src={
                          (form.getValues("photoUrl") as string) ||
                          "/church.png"
                        }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da igreja</FormLabel>
              <FormControl>
                <Input {...field} placeholder={field.value || "João miguel"} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={field.value || "Jose macedo filho"}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mx-1 pb-2">
              <FormLabel>Sobre a igreja</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value}
                  onChange={(e) => field.onChange(e?.target?.value)}
                  rows={6}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {isFormDirty && (
          <Button className="w-full p-5" disabled={!isFormDirty || isPending}>
            {isPending ? (
              <div className="flex items-center gap-x-3">
                <Loader2 className="size-5 animate-spin" /> Salvando...
              </div>
            ) : (
              "Salvar"
            )}
          </Button>
        )}
      </form>
    </Form>
  );
};
