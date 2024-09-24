"use client";

import {
  createNewMemberForm,
  CreateNewMemberValidation,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cells } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { ReusableSelect } from "../global/reusable-select";
import { Button, buttonVariants } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { createUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  cells: Cells[];
  churchId: string;
  cellId: string;
};

export const MemberForm = ({ cells, churchId, cellId }: Props) => {
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );

  const form = useForm<CreateNewMemberValidation>({
    resolver: zodResolver(createNewMemberForm),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "MEMBER",
      cellId: cellId || "",
      fullname: "",
      churchId: churchId,
    },
  });

  const [isPeding, startTransition] = useTransition();
  const router = useRouter();

  const isLoading = form.formState.isLoading || isPeding;

  const onSubmit = async (values: CreateNewMemberValidation) => {
    startTransition(async () => {
      await createUser(values);
      toast(`${values.fullname} criado(a) com sucesso!`);
      router.push("/admin/members");
    });
  };

  const dataCells: { value: string; label: string }[] = cells?.map((cell) => ({
    value: cell.id,
    label: cell.name,
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
                    onChange={field.onChange}
                    field={field.value}
                    placeholder="Celula do usuario"
                    data={dataCells}
                    className="w-full"
                    erroMessage={
                      <div className="w-full flex flex-col gap-2">
                        <p className="text-center py-2">
                          Nenhuma célula encontrada
                        </p>
                        <Link
                          className={buttonVariants({ className: "" })}
                          href="/admin/cells/create"
                        >
                          Criar uma nova célula
                        </Link>
                      </div>
                    }
                  />
                </FormControl>
                <small>{form.formState.errors.cellId?.message}</small>
              </FormItem>
            )}
          />
        )}

        <Button className="w-full" size="lg">
          {isLoading ? (
            <div className="flex items-center gap-x-2">
              <Loader2 className="size-6 animate-spin" />
              Criando...
            </div>
          ) : (
            "Salvar"
          )}
        </Button>
      </form>
    </Form>
  );
};
