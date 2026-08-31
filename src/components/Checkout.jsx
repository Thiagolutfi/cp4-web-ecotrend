import { useState } from 'react';
import Spinner from './Carregamento';

// Simula uma "finalização de compra": valida os dados e, depois de um pequeno delay resolve ou rejeita.
const finalizarCompra = (totalCarrinho) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (totalCarrinho <= 0) {
        reject('Não é possível finalizar: o carrinho está vazio.');
        return;
      }

      const pagamentoAprovado = true; 

      if (pagamentoAprovado) {
        resolve('Pedido confirmado! Obrigado por comprar produtos sustentáveis.');
      } else {
        reject('Pagamento recusado. Tente novamente.');
      }
    }, 2000); // 2 segundos simulando o processamento do pedido
  });
};

function Checkout({ totalCarrinho, onCompraConcluida }) {
  const [processando, setProcessando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(false);

  // Função async que aguarda a Promise de finalizarCompra (try/catch/finally, como em DataFetcher.jsx)
  const handleFinalizarCompra = async () => {
    setProcessando(true);
    setMensagem(null);
    setErro(false);

    try {
      const resultado = await finalizarCompra(totalCarrinho);
      setMensagem(resultado);
      setErro(false);
      onCompraConcluida(); // limpa o carrinho após sucesso

    } catch (motivoErro) {
      setMensagem(motivoErro);
      setErro(true);

    } finally {
      setProcessando(false);
    }
  };

  return (
    <div className="border-t pt-4 mt-4">
      {processando && <Spinner texto="Processando seu pedido..." />}

      {!processando && mensagem && (
        <p
          className={`text-center mb-3 font-semibold ${
            erro ? 'text-red-600' : 'text-green-700'
          }`}
        >
          {mensagem}
        </p>
      )}

      <button
        onClick={handleFinalizarCompra}
        disabled={processando || totalCarrinho <= 0}
        className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {processando ? 'Processando...' : 'Finalizar Compra'}
      </button>
    </div>
  );
}

export default Checkout;
