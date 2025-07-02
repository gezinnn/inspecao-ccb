"use client";

import { useEffect, useState } from "react";
import DialogNovoVoluntario from "./novo/page";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import CardVoluntario from "@/components/Cards/CardVoluntario";

type Voluntario = {
  id: number;
  nome: string;
  comum: string;
  funcao: string;
  igrejaId: string;
  foto?: string;
};

export default function Page() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [busca, setBusca] = useState("");
  const [filtrados, setFiltrados] = useState<Voluntario[]>([]);

  useEffect(() => {
    fetch("/api/voluntarios")
      .then((res) => res.json())
      .then((data) => {
        setVoluntarios(data);
        setFiltrados(data);
      })
      .catch((err) => {
        toast.error("Erro ao buscar Voluntários", err);
      });
  }, []);

  useEffect(() => {
    const buscaNormalizada = busca.toLowerCase();
    const resultado = voluntarios.filter(
      (v) =>
        v.nome.toLowerCase().includes(buscaNormalizada) ||
        v.comum.toLowerCase().includes(buscaNormalizada)
    );
    setFiltrados(resultado);
  }, [busca, voluntarios]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center gap-2 mb-3">
        <Input
          type="text"
          placeholder="Buscar por nome ou comum..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md"
        />
        <DialogNovoVoluntario />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtrados.map((voluntario) => (
          <CardVoluntario
            key={voluntario.id}
            nome={voluntario.nome}
            funcao={voluntario.funcao}
            igrejaId={voluntario.igrejaId}
            foto={voluntario.foto}
          />
        ))}
      </div>
    </div>
  );
}
