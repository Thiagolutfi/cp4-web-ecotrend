// Componente de filtragem dinâmica de produtos (por categoria e por preço máximo)
// Não recarrega a página: apenas atualiza o estado no componente pai (App.jsx)
function Filtros({ categorias, categoriaAtiva, setCategoriaAtiva, precoMax, setPrecoMax }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row md:items-center gap-4">
      {/* Filtro por categoria */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoriaAtiva('Todas')}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
            categoriaAtiva === 'Todas'
              ? 'bg-green-700 text-white'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
              categoriaAtiva === cat
                ? 'bg-green-700 text-white'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filtro por preço máximo */}
      <div className="flex items-center gap-2 md:ml-auto">
        <label htmlFor="precoMax" className="text-sm text-gray-600 whitespace-nowrap">
          Preço até: <strong>R$ {precoMax}</strong>
        </label>
        <input
          id="precoMax"
          type="range"
          min="10"
          max="200"
          step="10"
          value={precoMax}
          onChange={(e) => setPrecoMax(Number(e.target.value))}
          className="accent-green-700"
        />
      </div>
    </div>
  );
}

export default Filtros;
