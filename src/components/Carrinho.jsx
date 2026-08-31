import Checkout from './Checkout';

function Carrinho({ itens, onRemover, onAlterarQuantidade, onFechar, onCompraConcluida }) {
  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  return (
    // Fundo escurecido (overlay) que fecha o carrinho ao clicar fora
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50" onClick={onFechar}>
      <div
        className="bg-white w-full max-w-sm h-full p-5 overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()} // impede que clique dentro feche 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Seu Carrinho</h2>
          <button onClick={onFechar} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">
            &times;
          </button>
        </div>

        {itens.length === 0 ? (
          <p className="text-gray-500 text-center py-10">O carrinho está vazio!</p>
        ) : (
          <>
            <ul className="flex flex-col gap-3">
              {itens.map((item) => (
                <li key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">{item.nome}</p>
                    <p className="text-green-700 font-bold text-sm">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => onAlterarQuantidade(item.id, item.quantidade - 1)}
                        className="w-6 h-6 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantidade}</span>
                      <button
                        onClick={() => onAlterarQuantidade(item.id, item.quantidade + 1)}
                        className="w-6 h-6 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemover(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-4 text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </>
        )}

        {/* Checkout simulado com Promises, mesmo que o carrinho esteja vazio (botão fica desabilitado) */}
        <Checkout totalCarrinho={total} onCompraConcluida={onCompraConcluida} />
      </div>
    </div>
  );
}

export default Carrinho;
