import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import BeforeAfterCarousel from "./components/BeforeAfterCarousel";

function App() {
  return (
    // Colocamos um fundo bem clarinho na página toda
    <div className="min-h-screen bg-gray-200">
      {/* Chamando o nosso componente Header aqui! */}
      <Header />
      <Hero />
      <Services />
      <BeforeAfterCarousel />
      <Gallery />
      <Contact />
    </div>
  );
}

export default App;
