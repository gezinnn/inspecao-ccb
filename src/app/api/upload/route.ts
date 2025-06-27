import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 })
  }

  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from("fotos-voluntarios")
    .upload(fileName, file)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: "Falha no upload" }, { status: 500 })
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/fotos-voluntarios/${fileName}`

  return NextResponse.json({ url }, { status: 200 })
}
