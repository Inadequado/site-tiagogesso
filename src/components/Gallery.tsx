// Criamos uma lista com links de imagens de exemplo (peguei do Unsplash).
// Quando você for colocar as fotos do seu amigo, você vai trocar esses links.

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { X } from "lucide-react";

const portfolioImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function Gallery() {
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const [selectedImage, setSelectedImage] = useState<
    (typeof portfolioImages)[0] | null
  >(null);

  const currentIndex = selectedImage
    ? portfolioImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const navigate = (nextIndex: number, dir: "left" | "right") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setSelectedImage(portfolioImages[nextIndex]);
      setAnimating(false);
    }, 200);
  };

  const goToPrev = () => {
    if (currentIndex <= 0) return;
    navigate(currentIndex - 1, "left");
  };

  const [visible, setVisible] = useState(false);

  const goToNext = () => {
    if (currentIndex >= portfolioImages.length - 1) return;
    navigate(currentIndex + 1, "right");
  };

  const touchStartX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) goToNext(); // arrastou pra esquerda → próxima
    if (delta < -50) goToPrev(); // arrastou pra direita → anterior
  };

  const closeLightbox = () => {
    setVisible(false);
    setTimeout(() => setSelectedImage(null), 200);
  };

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nosso Portfólio
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira alguns dos nossos projetos recentes. Qualidade e atenção aos
            detalhes em cada metro quadrado.
          </p>
        </div>

        <div
          className="lg:grid lg:grid-cols-3 lg:gap-6
                flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory
                grid grid-rows-2 grid-flow-col auto-cols-[42vw]
                lg:auto-cols-auto lg:grid-rows-none lg:grid-flow-row"
        >
          {portfolioImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => {
                setSelectedImage(image);
                setTimeout(() => setVisible(true), 10);
              }}
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-40 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
          onClick={closeLightbox}
        >
          {/* Botão fechar */}
          <button
            className="absolute top-4 right-4 text-white z-10"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Seta esquerda */}
          {currentIndex > 0 && (
            <button
              className="absolute left-4 text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          {/* Seta direita */}
          {currentIndex < portfolioImages.length - 1 && (
            <button
              className="absolute right-4 text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          {/* Imagem com suporte a swipe */}
          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={selectedImage.url}
              alt=""
              className={`w-full max-h-[80vh] object-contain rounded-xl transition-all duration-200
    ${
      animating
        ? direction === "right"
          ? "-translate-x-8 opacity-0"
          : "translate-x-8 opacity-0"
        : "translate-x-0 opacity-100"
    }
    ${visible && !animating ? "scale-100" : "scale-95"}
  `}
            />
            {/* <p className="text-white text-center mt-4 font-medium">
              {selectedImage.title}
            </p> */}
            {/* Contador de fotos */}
            <p className="text-gray-400 text-center text-sm mt-1">
              {currentIndex + 1} / {portfolioImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
