import { Menu, X } from "lucide-react"; // Adicionamos Menu (hambúrguer) e X (fechar)
import { useState, useEffect } from "react"; // Importamos o hook de estado do React
import Logo from "../assets/logo.png";
export function Header() {
  // Aqui criamos a nossa "memória".
  // isMenuOpen começa como 'false' (menu fechado).
  // setIsMenuOpen é a função que usamos para mudar esse valor.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado que detecta se a página foi rolada
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Uma função simples para fechar o menu quando o usuário clicar em um link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky z-50 transition-all duration-300 ease-in-out ${isScrolled ? "top-0" : "top-0"}`}
    >
      <div
        className={`flex justify-between items-center relative transition-all duration-300 ease-in-out ${
          isScrolled
            ? "mx-auto lg:max-w-[90%] w-[calc(100%-2rem)] bg-gray-200/90 backdrop-blur-md rounded-2xl shadow-xl px-4 py-3 top-4"
            : "bg-gray-200 shadow-md rounded-b-2xl px-4 py-4"
        }`}
      >
        {/* LADO ESQUERDO: A Logo */}
        <a href="#" className="flex items-center gap-2 text-blue-600 z-50">
          <img src={Logo} className="w-24" />
          {/* <span className="text-2xl font-bold text-gray-800">Tiago Gesso</span> */}
        </a>

        {/* LADO DIREITO (PC): O Menu de Navegação normal */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <a href="#servicos" className="hover:text-blue-600 transition-colors">
            Serviços
          </a>
          <a href="#galeria" className="hover:text-blue-600 transition-colors">
            Galeria
          </a>
          <a href="#contato" className="hover:text-blue-600 transition-colors">
            Contato
          </a>
        </nav>

        {/* BOTÃO DO CELULAR: Só aparece em telas pequenas (md:hidden) */}
        <button
          className="md:hidden text-gray-600 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Inverte o valor (se tá aberto, fecha; se tá fechado, abre)
        >
          {/* Se o menu estiver aberto, mostra o X. Se não, mostra os 3 risquinhos */}
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* MENU DO CELULAR (DROPDOWN) */}
      {/* Aqui verificamos: isMenuOpen é verdadeiro? Se sim, mostre essa div abaixo. Se não, esconda. */}
      {isMenuOpen && (
        <div
          className={`md:hidden flex flex-col py-4 px-6 gap-4 z-40 bg-white shadow-lg border-t border-gray-100 transition-all duration-300 ${
            isScrolled
              ? "mx-auto lg:max-w-[90%] w-[calc(100%-2rem)] mt-1 rounded-2xl"
              : "absolute top-full left-0 w-full"
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
      )}
    </header>
  );
}
