"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const schema = z.object({
  nome: z.string().min(3, "Nome obrigatório"),
  dataNasc: z.string().min(10, "Data inválida"),
  comum: z.string().min(3, "Comum obrigatória"),
  funcao: z.string().min(2, "Função obrigatória"),
  igrejaId: z.string().min(1, "Igreja obrigatória"),
});

type VoluntarioFormData = z.infer<typeof schema>;

type Igreja = {
  id: number;
  nome: string;
};

export default function DialogNovoVoluntario() {
  const [igrejas, setIgrejas] = useState<Igreja[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<VoluntarioFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      dataNasc: "",
      comum: "",
      funcao: "",
      igrejaId: "",
    },
  });

  useEffect(() => {
    fetch("/api/igrejas")
      .then((res) => res.json())
      .then((data) => {
        setIgrejas(data);
        if (data.length > 0) {
          form.setValue("igrejaId", String(data[0].id));
        }
      })
      .catch(() => toast.error("Erro ao carregar igrejas"));
  }, [form]);

  async function onSubmit(values: VoluntarioFormData) {
    setLoading(true);
    try {
      console.log("Submit chamado com valores:", values);

      const payload = {
        ...values,
        dataNasc: new Date(values.dataNasc),
        igrejaId: parseInt(values.igrejaId),
      };

      const res = await fetch("/api/voluntarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar voluntário");

      toast.success("Voluntário cadastrado com sucesso!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Novo Voluntário</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Voluntário</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar um novo voluntário
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Geovanni Almeida" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataNasc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comum</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Comunidade XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="funcao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <FormControl>
                    <Input placeholder="Pintor, Eletricista..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="igrejaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Igreja</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a Igreja" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {igrejas.map((igreja) => (
                        <SelectItem key={igreja.id} value={String(igreja.id)}>
                          {igreja.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
