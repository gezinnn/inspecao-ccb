"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const schema = z.object({
  nome: z.string().min(3, "Nome Obrigatório"),
  endereco: z.string().min(5, "Endereço Obrigatório"),
  br: z.string().min(10, "Informe o BR corretamente"),
})

type IgrejaFormData = z.infer<typeof schema>

export default function DialogNovaIgreja() {
  const [loading, setLoading] = useState(false)

  const form = useForm<IgrejaFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      endereco: "",
      br: "",
    },
  })

  async function onSubmit(values: IgrejaFormData) {
    setLoading(true)
    try {
      const res = await fetch("/api/igrejas", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("Erro ao cadastrar igreja")

      alert("Igreja cadastrada com sucesso!")
      form.reset() // limpa o formulário
    } catch {
      alert("Erro ao salvar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Nova Igreja</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Igreja</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar uma nova igreja
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
                    <Input placeholder="Ex: Central" {...field} />
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
                    <Input placeholder="Avenida Botafogo, 157" {...field} />
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
  )
}
