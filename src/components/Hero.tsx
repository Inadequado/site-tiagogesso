import { useState, useEffect } from "react"; // Importamos os hooks necessários

// 1. Lista de imagens reais do portfólio dele (coloque os links/caminhos aqui)
const images = [
  "/images/banner1.jpeg",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
];

export function Hero() {
  // 2. Estado para controlar o índice da imagem atual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 3. Efeito para trocar a imagem automaticamente a cada 5 segundos
  useEffect(() => {
    // Cria um temporizador (intervalo)
    const timer = setInterval(() => {
      // Avança para a próxima imagem. Se for a última, volta para a primeira (usando o operador %)
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 segundos

    // Função de limpeza: cancela o temporizador se o componente for destruído (boa prática!)
    return () => clearInterval(timer);
  }, []); // [] significa que este efeito roda apenas uma vez, quando o componente é montado

  return (
    // Seção principal com fundo cinza claro e preenchimento (padding)
    <section className="bg-gray-200 py-4 md:py-10 font-sans">
      <div className="mx-auto px-4">
        {/* 4. A "Janela" Flutuante (Card Principal) */}
        {/* relative, overflow-hidden (para as imagens não saírem), rounded-3xl (bordas bem arredondadas) */}
        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl 
                     bg-slate-900 text-white py-5 md:py-10 mx-auto w-full max-w-[100%] lg:max-w-[90%] min-h-[78vh] lg:min-h-[83vh]"
        >
          {/* 5. O Backend Animado (Imagens) */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Trabalho de Gesso ${index + 1}`}
              // absolute inset-0 (preenche tudo), object-cover (não distorce)
              // transition-opacity, duration-1000 (efeito de fade de 1 segundo)
              // Controlamos a opacidade: 100 se for a imagem atual, 0 se não for
              className={`absolute inset-0 w-full h-full object-cover 
                          transition-opacity duration-1000 ease-in-out 
                          ${index === currentImageIndex ? "opacity-30" : "opacity-0"}`}
            />
          ))}

          {/* 6. Conteúdo de Texto e Botão (por cima das imagens) */}
          {/* relative z-10 para garantir que fique em cima das imagens */}
          <div className="relative z-10 text-center flex flex-col items-center w-full px-6">
            {/* TEXTOS PRINCIPAIS */}
            <div className="py-40 md:py-60">
              <h1 className="text-2xl md:text-5xl font-extrabold mb-4 m-auto leading-tight drop-shadow-lg">
                TRANSFORME SEU AMBIENTE
              </h1>
              <p className="text-sm m-auto md:text-lg text-slate-100 mb-8 max-w-xl drop-shadow-md">
                Especialistas em sancas, rebaixamentos e divisórias em drywall.
              </p>
            </div>

            {/* CARROSSEL DE MINIATURAS (No lugar do botão antigo) */}
            <div className="flex flex-row gap-3 p-2 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-10 md:w-24 md:h-14 rounded-lg overflow-hidden 
                   transition-all duration-300 border-2 
                   ${
                     index === currentImageIndex
                       ? "border-white scale-110 shadow-lg"
                       : "border-transparent opacity-50 hover:opacity-100"
                   }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Miniatura ${index}`}
                  />
                </button>
              ))}
            </div>

            {/* BOTÃO DE ORÇAMENTO (Reposicionado para não sumir) */}
            {/* <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 
               text-white font-bold py-3 px-8 rounded-full transition-all 
               hover:scale-105 active:scale-95 shadow-lg text-sm md:text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Orçamento
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
