"use client";

import { prayerRequestForm, PrayerRequestValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ReusableSelect } from "./reusable-select";
import { prayerStatusOptions, prayerTypes } from "@/constants";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createNewPrayer } from "@/actions/global";
import { toast } from "sonner";

type Props = {
  churchId: string;
  redirect: string;
  cellId?: string;
  members?:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  memberId?: string;
  cells?: {
    label: string;
    value: string;
  }[];
};

export const NewPrayerForm = ({
  members,
  churchId,
  redirect,
  cellId,
  cells,
  memberId,
}: Props) => {
  const form = useForm<PrayerRequestValidation>({
    resolver: zodResolver(prayerRequestForm),
    defaultValues: {
      title: "",
      description: "",
      answeredAt: false,
      category: "COMMUNITY",
      memberId: memberId || "",
      status: "PENDING",
      churchId: churchId,
      cellId: cellId,
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(data: PrayerRequestValidation) {
    startTransition(async () => {
      createNewPrayer(data);
      router.push(redirect);
      toast("Oração criada com sucesso!");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ajuda com..." {...field} />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Insira um título breve descrevendo seu pedido de oração.
              </p>
              <FormMessage />
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
                <Textarea {...field} placeholder="Sobre..." rows={6} />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Forneça mais detalhes sobre o que você gostaria de oração.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {members && (
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membro</FormLabel>
                  <FormControl>
                    <ReusableSelect
                      data={members!}
                      erroMessage="Nenhum membro encontrado"
                      field={field.value}
                      onChange={field.onChange}
                      placeholder="Membro"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Escolha o membro da igreja pelo qual será feita a oração.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <ReusableSelect
                    data={prayerTypes}
                    erroMessage="Nenhuma categoria encontrada"
                    field={field.value}
                    onChange={field.onChange}
                    placeholder="Categorias"
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Selecione a categoria que melhor descreve seu pedido de
                  oração.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {!memberId && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <ReusableSelect
                      data={prayerStatusOptions}
                      erroMessage="Nenhum status encontrado"
                      field={field.value}
                      onChange={field.onChange}
                      placeholder="Status"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Escolha o status da oração.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {cellId === undefined && (
          <FormField
            control={form.control}
            name="cellId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celula</FormLabel>
                <FormControl>
                  <ReusableSelect
                    data={cells!}
                    erroMessage="Nenhuma celula encontrada"
                    field={field.value}
                    onChange={field.onChange}
                    placeholder="Celula"
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Selecione a categoria que melhor descreve seu pedido de
                  oração.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
