"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DialogNovaIgreja from "./nova/page";
import CardIgreja from "@/components/Cards/CardIgreja";
import { Input } from "@/components/ui/input";

type Igreja = {
  id: number;
  nome: string;
  endereco: string;
  br: string;
};

export default function Page() {
  const [igrejas, setIgrejas] = useState<Igreja[]>([]);
  const [busca, setBusca] = useState("");
  const [filtrados, setFiltrados] = useState<Igreja[]>([]);

  useEffect(() => {
    fetch("/api/igrejas")
      .then((res) => res.json())
      .then((data) => {
        setIgrejas(data);
        setFiltrados(data);
      })
      .catch((err) => {
        toast.error("Erro ao Buscar Igrejas", err);
      });
  }, []);

  useEffect(() => {
    const buscaNormalizada = busca.toLowerCase();
    const resultado = igrejas.filter((i) =>
      i.nome.toLowerCase().includes(buscaNormalizada)
    );
    setFiltrados(resultado);
  }, [busca, igrejas]);
  return (
    <div className="p-3">
      <div className="flex justify-between items-center gap-2 mb-3">
        <Input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md"
        />
        <DialogNovaIgreja />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtrados.map((igreja) => (
          <CardIgreja
            key={igreja.id}
            nome={igreja.nome}
            endereco={igreja.endereco}
            br={igreja.br}
          />
        ))}
      </div>
    </div>
  );
}
