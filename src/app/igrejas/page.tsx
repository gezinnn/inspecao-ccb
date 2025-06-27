"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DialogNovaIgreja from "./nova/page";
import CardIgreja from "@/components/Cards/CardIgreja";

type Igreja = {
  id: number;
  nome: string;
  endereco: string;
  br: string;
};

export default function Page() {
  const [igrejas, setIgrejas] = useState<Igreja[]>([]);

  useEffect(() => {
    fetch("/api/igrejas")
      .then((res) => res.json())
      .then((data) => setIgrejas(data))
      .catch((err) => {
        toast.error("Erro ao buscar igrejas", err);
      });
  }, []);
  return (
    <div className="p-3">
      <div className="flex justify-end mb-3">
        <DialogNovaIgreja />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(igrejas) &&
        igrejas.map((igreja) => (
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
