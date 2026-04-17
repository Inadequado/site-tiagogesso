import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useGaleria } from "../hooks/useGaleria";
import type { GaleriaItem } from "../hooks/useGaleria";

export function Gallery() {
  const { items, carregando } = useGaleria();
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [selectedItem, setSelectedItem] = useState<GaleriaItem | null>(null);
  const [visible, setVisible] = useState(false);
  const touchStartX = useRef<number>(0);

  const currentIndex = selectedItem
    ? items.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const navigate = (nextIndex: number, dir: "left" | "right") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setSelectedItem(items[nextIndex]);
      setAnimating(false);
    }, 200);
  };

  const goToPrev = () => {
    if (currentIndex <= 0) return;
    navigate(currentIndex - 1, "left");
  };

  const goToNext = () => {
    if (currentIndex >= items.length - 1) return;
    navigate(currentIndex + 1, "right");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) goToNext();
    if (delta < -50) goToPrev();
  };

  const closeLightbox = () => {
    setVisible(false);
    setTimeout(() => setSelectedItem(null), 200);
  };

  if (carregando)
    return (
      <section id="galeria" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">Carregando galeria...</p>
        </div>
      </section>
    );

  if (items.length === 0) return null;

  const extrairId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : null;
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
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => {
                setSelectedItem(item);
                setTimeout(() => setVisible(true), 10);
              }}
            >
              {item.tipo === "youtube" ? (
                <div className="relative w-full h-40 md:h-64 bg-black flex items-center justify-center">
                  <img
                    src={`https://img.youtube.com/vi/${extrairId(item.url)}/hqdefault.jpg`}
                    alt="thumbnail youtube"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
              ) : item.tipo === "video" ? (
                <video
                  src={item.url}
                  className="w-full h-40 md:h-64 object-cover"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-40 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {item.tipo === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white z-10"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X className="w-8 h-8" />
          </button>

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

          {currentIndex < items.length - 1 && (
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

          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {selectedItem.tipo === "youtube" ? (
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${extrairId(selectedItem.url)}?autoplay=1`}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
            ) : selectedItem.tipo === "video" ? (
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <video
                  src={selectedItem.url}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  controls
                  autoPlay
                />
              </div>
            ) : (
              <img
                src={selectedItem.url}
                alt=""
                className={`w-full max-h-[80vh] object-contain rounded-xl transition-all duration-200
      ${animating ? (direction === "right" ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0") : "translate-x-0 opacity-100"}
      ${visible && !animating ? "scale-100" : "scale-95"}
    `}
              />
            )}
            <p className="text-gray-400 text-center text-sm mt-3">
              {currentIndex + 1} / {items.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
