// Spinner simples usado enquanto aguardamos uma Promise (fetch ou checkout) ser resolvida
function Spinner({ texto = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">{texto}</p>
    </div>
  );
}

export default Spinner;
