function ProdutoCard({ produto, onAdicionarAoCarrinho }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition-shadow">
      <div className="text-6xl text-center mb-3">{produto.emoji}</div>
      <span className="text-xs font-semibold text-green-700 bg-green-50 self-start px-2 py-1 rounded-full mb-2">
        {produto.categoria}
      </span>
      <h3 className="font-bold text-gray-800 mb-1">{produto.nome}</h3>
      <p className="text-sm text-gray-500 flex-1 mb-3">{produto.descricao}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold text-green-700">
          R$ {produto.preco.toFixed(2)}
        </span>
        {/* Ao clicar, o produto é adicionado ao carrinho (função vinda de App.jsx) */}
        <button
          onClick={() => onAdicionarAoCarrinho(produto)}
          className="bg-green-700 text-white text-sm font-semibold px-3 py-2 rounded-md hover:bg-green-800 transition-colors"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default ProdutoCard;
