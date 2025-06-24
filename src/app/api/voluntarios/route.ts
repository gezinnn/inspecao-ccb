import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const voluntario = await prisma.voluntario.create({
      data: {
        nome: data.nome,
        dataNasc: new Date(data.dataNasc),
        comum: data.comum,
        funcao: data.funcao,
        igrejaId: data.igrejaId,
      },
    });

    return NextResponse.json(voluntario, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao cadastrar voluntário" },
      { status: 500 }
    );
  }
}
