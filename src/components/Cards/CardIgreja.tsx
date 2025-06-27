type Props = {
  nome: string;
  endereco: string;
  br: string;
};

export default function CardIgreja({ nome, endereco, br }: Props) {
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-8">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg"></div>
      
      <div className="p-6">
        <h5 className="mb-2 text-xl font-semibold leading-snug tracking-tight text-gray-900">
          {nome}
        </h5>
        <p className="text-sm text-gray-700 mb-1">
          📍 {endereco}
        </p>
        <p className="text-sm text-gray-500">
          🛣️ BR: {br}
        </p>
      </div>

      <div className="p-6 pt-0">
        <button
          type="button"
          className="rounded-lg bg-green-600 py-2 px-4 text-xs font-bold uppercase text-white shadow hover:bg-green-700 transition"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
