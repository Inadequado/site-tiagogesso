import { useState, useEffect } from "react";
import { useMedias } from "../hooks/useMedias";

export function Hero() {
  const { medias, carregando } = useMedias("hero");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (medias.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % medias.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [medias]);

  if (carregando)
    return (
      <section className="bg-gray-200 py-4 md:py-10 font-sans">
        <div className="mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 text-white py-5 md:py-10 mx-auto w-full max-w-[100%] lg:max-w-[90%] min-h-[78vh] lg:min-h-[83vh] flex items-center justify-center">
            <p className="text-white opacity-50">Carregando...</p>
          </div>
        </div>
      </section>
    );

  return (
    <section className="bg-gray-200 py-4 md:py-10 font-sans">
      <div className="mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 text-white py-5 md:py-10 mx-auto w-full max-w-[100%] lg:max-w-[90%] min-h-[78vh] lg:min-h-[83vh]">
          {medias.map((media, index) => (
            <img
              key={media.id}
              src={media.url}
              alt={`Trabalho de Gesso ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover 
                          transition-opacity duration-1000 ease-in-out 
                          ${index === currentImageIndex ? "opacity-30" : "opacity-0"}`}
            />
          ))}

          <div className="relative z-10 text-center flex flex-col items-center w-full px-6">
            <div className="py-40 md:py-60">
              <h1 className="text-2xl md:text-5xl font-extrabold mb-4 m-auto leading-tight drop-shadow-lg">
                TRANSFORME SEU AMBIENTE
              </h1>
              <p className="text-sm m-auto md:text-lg text-slate-100 mb-8 max-w-xl drop-shadow-md">
                Especialistas em sancas, rebaixamentos e divisórias em drywall.
              </p>
            </div>

            {medias.length > 0 && (
              <div className="flex flex-row gap-3 p-2 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
                {medias.map((media, index) => (
                  <button
                    key={media.id}
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
                      src={media.url}
                      className="w-full h-full object-cover"
                      alt={`Miniatura ${index}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
