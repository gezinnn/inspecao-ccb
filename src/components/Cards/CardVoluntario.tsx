import Image from "next/image";

type Props = {
  nome: string;
  funcao: string;
  igrejaId: string;
  foto?: string; // base64 ou URL da foto (opcional)
};

export default function CardVoluntario({
  nome,
  funcao,
  igrejaId: comum,
  foto,
}: Props) {
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-8">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600">
        {foto ? (
          <Image
            src={
              foto.startsWith("data:") ? foto : `data:image/jpeg;base64,${foto}`
            }
            alt={`Foto de ${nome}`}
            width={320} 
            height={160} 
            className="object-cover rounded-xl"
          />
        ) : null}
      </div>

      <div className="p-6">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
          {nome}
        </h5>
        <p className="text-sm text-gray-700 mb-1">🛠️ Função: {funcao}</p>
        <p className="text-sm text-gray-500">🏛️ Comum: {comum}</p>
      </div>

      <div className="p-6 pt-0">
        <button
          type="button"
          className="rounded-lg bg-indigo-600 py-2 px-4 text-xs font-bold uppercase text-white shadow hover:bg-indigo-700 transition"
        >
          Ver mais
        </button>
      </div>
    </div>
  );
}
