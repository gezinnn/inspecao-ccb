import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const igreja = await prisma.igreja.create({
    data: {
      nome: data.nome,
      endereco: data.endereco,
      br: data.br,
    },
  });

  return NextResponse.json(igreja, { status: 201 });
}
export async function GET() {
  try {
    const igrejas = await prisma.igreja.findMany();
    return NextResponse.json(igrejas);
  } catch (error) {
    console.error("Erro ao buscar igrejas:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
