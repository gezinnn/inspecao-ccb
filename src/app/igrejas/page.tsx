"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DialogNovaIgreja from "./nova/page";

type Igreja = {
  id: number;
  nome: string;
  br: string,
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
    <div>
      {igrejas.map((igreja) => (
        <div key={igreja.id}>{igreja.nome}</div>
      ))}
      <DialogNovaIgreja />
    </div>
  );
}
