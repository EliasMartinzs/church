"use client";

import { createNewUserForm, createNewUserValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { createNewUser } from "@/actions/admin";
import { revalidatePath } from "next/cache";
import { Cell } from "@prisma/client";
import { ReusableSelect } from "../global/reusable-select";
import { sendEmail } from "@/hooks/use-email";

type Props = {
  cellId: string | undefined;
  churchId: string | undefined;
  cells?: Cell[];
};

export const NewMemberForm = ({ cellId, churchId, cells }: Props) => {
  const [showPassword, setShowPassword] = useState("password");
  const form = useForm<createNewUserValidation>({
    resolver: zodResolver(createNewUserForm),
    defaultValues: {
      email: "",
      fullname: "",
      cellId: cellId === "undefined" ? undefined : cellId,
      churchId: churchId,
      confirmPassword: "",
      password: "",
      role: "MEMBER",
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isLoading = isPending || form.formState.isLoading;

  const onSubmit = async (values: createNewUserValidation) => {
    startTransition(async () => {
      await createNewUser(values);
      router.push("/admin/members");
      toast("Novo membro cadastrado com sucesso!");
      revalidatePath("/admin/members");
    });

    sendEmail({
      email: values.email as string,
      password: values.password as string,
      from_name: values.fullname as string,
    });
  };

  const data = cells?.map((cell) => ({
    label: cell.name,
    value: cell.id,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:max-w-4xl mr-auto"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jonh doe" />
              </FormControl>
              <small>{form.formState.errors.fullname?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input {...field} placeholder="aaaa@gmail.com" type="email" />
              </FormControl>
              <small>{form.formState.errors.email?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={field.onChange}
                    placeholder="*********"
                    type={showPassword}
                  />
                </div>
              </FormControl>
              <small>{form.formState.errors.password?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repita a Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={field.onChange}
                    placeholder="*********"
                    type={showPassword}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        showPassword === "password" ? "text" : "password"
                      )
                    }
                    className="absolute top-4 right-4"
                  >
                    {showPassword === "text" ? (
                      <FaRegEye className="size-5" />
                    ) : (
                      <FaRegEyeSlash className="size-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <small>{form.formState.errors.confirmPassword?.message}</small>
            </FormItem>
          )}
        />

        {cellId === "undefined" && (
          <FormField
            control={form.control}
            name="cellId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Célula</FormLabel>
                <FormControl>
                  <ReusableSelect
                    data={data!}
                    erroMessage="Nenhuma célula criada até o momento!"
                    field={field.value as string}
                    onChange={field.onChange}
                    placeholder="Seleciona a célula"
                  />
                </FormControl>
                <small>{form.formState.errors.cellId?.message}</small>
              </FormItem>
            )}
          />
        )}

        <Button className="w-full" size="lg" type="submit">
          {isLoading ? (
            <div className="flex items-center gap-x-2">
              <Loader2 className="size-6 animate-spin" />
              Criando...
            </div>
          ) : (
            "Criar"
          )}
        </Button>
      </form>
    </Form>
  );
};
