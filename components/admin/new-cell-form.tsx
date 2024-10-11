"use client";

import {
  createNewCellFormSchema,
  CreateNewCellValidation,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { Textarea } from "../ui/textarea";
import { ReusableSelect } from "../global/reusable-select";
import { useMemo, useTransition } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createNewCell } from "@/actions/admin";

type Props = {
  churchId: string;
  secretaries: { id: string | undefined; name: string | null | undefined }[];
};

export const NewCellForm = ({ churchId, secretaries }: Props) => {
  const form = useForm<CreateNewCellValidation>({
    resolver: zodResolver(createNewCellFormSchema),
    defaultValues: {
      name: "",
      description: "",
      photoUrl: "/church.png",
      churchId: churchId,
      secretaryId: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(data: CreateNewCellValidation) {
    startTransition(async () => {
      await createNewCell(data);

      toast(`${data.name} criada com sucesso`);

      router.push("/admin/cells");
    });
  }

  const data = useMemo(() => {
    return secretaries.map((s) => ({
      label: s.name as string,
      value: s.id as string,
    }));
  }, [secretaries]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:max-w-4xl mr-auto"
      >
        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center lg:justify-start">
              <FormControl>
                <div className="relative w-24 h-24 border rounded-full">
                  <CldUploadWidget
                    uploadPreset="crambpreset"
                    onSuccess={(e) => {
                      if (typeof e.info === "object" && e.info !== undefined) {
                        if (e.info.secure_url) {
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
                        className="object-cover rounded-full relative h-24 w-24"
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
              <FormLabel>Nome da célula</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Antonella" />
              </FormControl>
              <small>{form.formState.errors.name?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value as string}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="..."
                  rows={6}
                />
              </FormControl>
              <small>{form.formState.errors.description?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secretaryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secretario</FormLabel>
              <FormControl>
                <ReusableSelect
                  data={data}
                  erroMessage={
                    <Link
                      className={buttonVariants({ variant: "ghost" })}
                      href="/admin/cell/secretary"
                    >
                      Criar novo secretario
                    </Link>
                  }
                  field={field.value}
                  onChange={field.onChange}
                  placeholder="Secretarios"
                />
              </FormControl>
              <small>{form.formState.errors.secretaryId?.message}</small>
            </FormItem>
          )}
        />

        <Button
          className="w-full p-5"
          disabled={form.formState.isLoading || isPending}
        >
          {form.formState.isLoading || isPending ? (
            <div className="flex items-center gap-x-3">
              <Loader2 className="size-5 animate-spin" /> Criando...
            </div>
          ) : (
            "Criar"
          )}
        </Button>
      </form>
    </Form>
  );
};
