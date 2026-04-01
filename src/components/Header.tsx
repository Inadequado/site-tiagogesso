import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 lg:px-[5%]">
      {/* Container externo que faz a transição de "full width" para "flutuante" */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isScrolled ? "pt-4" : "pt-0"
        }`}
      >
        {/* Barra principal */}
        <div
          className={`flex justify-between items-center transition-all duration-300 ease-in-out ${
            isScrolled
              ? "bg-gray-100/80 backdrop-blur-md rounded-2xl shadow-xl px-4 py-3"
              : "bg-gray-100 shadow-md rounded-b-2xl px-4 py-4"
          }`}
        >
          <a href="#" className="flex items-center gap-2 text-blue-600 z-50">
            <img src={Logo} className="w-24" />
          </a>

          <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
            <a
              href="#servicos"
              className="hover:text-blue-600 transition-colors"
            >
              Serviços
            </a>
            <a
              href="#galeria"
              className="hover:text-blue-600 transition-colors"
            >
              Galeria
            </a>
            <a
              href="#contato"
              className="hover:text-blue-600 transition-colors"
            >
              Contato
            </a>
          </nav>

          <button
            className="md:hidden text-gray-600 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Transição suave entre os ícones */}
            <div className="relative w-8 h-8">
              <X
                className={`w-8 h-8 absolute transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
              />
              <Menu
                className={`w-8 h-8 absolute transition-all duration-300 ${isMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
              />
            </div>
          </button>
        </div>

        {/* Menu mobile com transição suave via max-height */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`flex flex-col py-4 px-6 gap-4 bg-white border-t border-gray-100 transition-all duration-500 ${
              isScrolled ? "mt-1 rounded-2xl" : "rounded-2xl"
            }`}
          >
            <a
              href="#servicos"
              onClick={closeMenu}
              className="text-gray-600 text-lg font-medium hover:text-blue-600"
            >
              Serviços
            </a>
            <a
              href="#galeria"
              onClick={closeMenu}
              className="text-gray-600 text-lg font-medium hover:text-blue-600"
            >
              Galeria
            </a>
            <a
              href="#contato"
              onClick={closeMenu}
              className="text-gray-600 text-lg font-medium hover:text-blue-600"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
