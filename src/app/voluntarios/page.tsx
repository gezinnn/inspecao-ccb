"use client";

import { useEffect, useState } from "react";
import DialogNovoVoluntario from "./novo/page";
import { toast } from "sonner";
import CardIgreja from "@/components/Cards/CardVoluntario";

type Voluntario = {
  id: number;
  nome: string;
  funcao: string;
  igrejaId: string;
};

export default function Page() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);

  useEffect(() => {
    fetch("/api/voluntarios")
      .then((res) => res.json())
      .then((data) => setVoluntarios(data))
      .catch((err) => {
        toast.error("Erro ao buscar Voluntários", err);
      });
  }, []);
  return (
    <div className="p-3">
      <div className="flex justify-end mb-3">
        <DialogNovoVoluntario />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(voluntarios) &&
          voluntarios.map((voluntario) => (
            <CardIgreja
              key={voluntario.id}
              nome={voluntario.nome}
              funcao={voluntario.funcao}
              igrejaId={voluntario.igrejaId}
            />
          ))}
      </div>
    </div>
  );
}
