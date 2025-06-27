import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const nome = form.get("nome") as string;
    const dataNasc = form.get("dataNasc") as string;
    const comum = form.get("comum") as string;
    const funcao = form.get("funcao") as string;
    const igrejaId = parseInt(form.get("igrejaId") as string);
    const fotoFile = form.get("foto") as File;

    const arrayBuffer = await fotoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fotoBase64 = buffer.toString("base64");

    const voluntario = await prisma.voluntario.create({
      data: {
        nome,
        dataNasc: new Date(dataNasc),
        comum,
        funcao,
        igrejaId,
        foto: fotoBase64, 
      },
    });

    return NextResponse.json(voluntario, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar voluntário:", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar voluntário" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const voluntarios = await prisma.voluntario.findMany();
    return NextResponse.json(voluntarios);
  } catch (error) {
    console.error("Erro ao buscar voluntario:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

