"use client"

import { useEffect, useState } from "react";
import DialogNovoVoluntario from "./novo/page";
import { toast } from "sonner";

type Voluntario = {
  id: number;
  nome: string;
  funcao: string,
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
    <div>
      {voluntarios.map((voluntario) => (
        <div key={voluntario.id}>{voluntario.nome} {voluntario.funcao}</div>
      ))}
      <DialogNovoVoluntario />
    </div>
  );
}
