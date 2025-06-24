"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const schema = z.object({
  nome: z.string().min(3, "Nome Obrigatorio"),
  endereco: z.string().min(5, "Endereço Obrigatorio"),
  br: z.string().min(10, "Informe o BR"),
});

export default function Page() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      endereco: "",
      br: "",
    },
  });

  type IgrejaFormData = {
  nome: string
  endereco: string
  br: string
}

  async function onSubmit(values: IgrejaFormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/igrejas", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Erro ao Cadastrar Igreja");

      alert("Igreja Cadastra com Sucesso!");
    } catch {
      alert("Erro ao Salvar");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Igreja</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Central" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Avenida Botafogo, 157" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="br"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BR</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: BR-22-1251" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
