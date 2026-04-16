import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeftRight } from "lucide-react";
import { useBeforeAfter } from "../hooks/useBeforeAfter";
import type { BeforeAfterItem } from "../hooks/useBeforeAfter";

function BeforeAfterSlider({ item }: { item: BeforeAfterItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPct, setSliderPct] = useState(50);
  const dragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPct(Math.max(2, Math.min(98, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateSlider(x);
    };
    const onUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateSlider]);

  useEffect(() => {
    const timer = setTimeout(() => setSliderPct(50), 0);
    return () => clearTimeout(timer);
  }, [item]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none border border-neutral-200"
      onMouseDown={(e) => {
        dragging.current = true;
        e.preventDefault();
      }}
      onTouchStart={() => {
        dragging.current = true;
      }}
    >
      <img
        src={item.afterUrl}
        alt="depois"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
      >
        <img
          src={item.beforeUrl}
          alt="antes"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <span className="absolute top-3 left-3 z-10 text-xs font-medium bg-black/50 text-white px-2.5 py-1 rounded-md pointer-events-none">
        Antes
      </span>
      <span className="absolute top-3 right-3 z-10 text-xs font-medium bg-white/85 text-neutral-800 px-2.5 py-1 rounded-md pointer-events-none">
        Depois
      </span>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
        style={{ left: `${sliderPct}%`, transform: "translateX(-50%)" }}
      />

      <div
        className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPct}%` }}
      >
        <ChevronsLeftRight size={16} className="text-neutral-500" />
      </div>
    </div>
  );
}

export default function BeforeAfterCarousel() {
  const { items, carregando } = useBeforeAfter();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  if (carregando)
    return (
      <section className="py-5 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-neutral-400">Carregando...</p>
        </div>
      </section>
    );

  if (items.length === 0) return null;

  return (
    <section className="py-5 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-neutral-500 text-lg">
            Arraste para comparar o antes e depois de cada serviço.
          </p>
        </div>

        <BeforeAfterSlider item={items[current]} />

        <div className="text-center mt-5">
          <p className="text-lg font-medium text-neutral-900">
            {items[current].titulo}
          </p>
          <p className="text-base text-neutral-500 mt-1">
            {items[current].descricao}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={25} />
          </button>

          <div className="flex gap-2 items-center">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-neutral-900" : "bg-neutral-300"}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight size={25} />
          </button>
        </div>
      </div>
    </section>
  );
}
