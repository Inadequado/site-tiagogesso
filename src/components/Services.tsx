import { Layers, Lightbulb, Grid2x2, Home } from "lucide-react";

const servicesList = [
  {
    title: "Rebaixamento de Teto",
    description:
      "Tetos lisos e nivelados, perfeitos para embutir iluminação e esconder fiações.",
    icon: <Layers className="w-8 h-8 text-white" />,
    image:
      "https://www.decorfacil.com/wp-content/uploads/2018/02/20180220teto-de-gesso-foto2.jpg",
  },
  {
    title: "Sancas Iluminadas",
    description:
      "Sancas abertas, fechadas ou invertidas para dar um toque de luxo e modernidade ao ambiente.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    image:
      "http://ideabrasil.com.br/wp-content/uploads/2018/07/Rebaixamento-de-gesso-em-sala-12.jpg",
  },
  {
    title: "Divisórias em Drywall",
    description:
      "Crie novos ambientes de forma rápida, limpa e com excelente isolamento acústico.",
    icon: <Grid2x2 className="w-8 h-8 text-white" />,
    image:
      "https://i.pinimg.com/originals/b5/4c/07/b54c077f555b10acc37b0825c219ce58.jpg",
  },
  {
    title: "Nichos e Estantes",
    description:
      "Móveis planejados em gesso para TVs, livros e decorações, aproveitando cada espaço.",
    icon: <Home className="w-8 h-8 text-white" />,
    image:
      "https://www.decorfacil.com/wp-content/uploads/2017/03/20170310nicho-para-quarto-de-casal-23.jpg",
  },
];

export function Services() {
  return (
    <section id="servicos" className="bg-gray-200 pt-20 pb-5 md:py-15">
      <div className="max-w-7xl mx-auto px-4">
        {/* No mobile: flex com scroll horizontal. No desktop: grid */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Nossos Serviços</h2>
          <div className="w-16 h-1 bg-blue-800 mx-auto mt-3 rounded-full" />
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-end min-h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-[85%] snap-start md:w-auto"
            >
              {/* Imagem de fundo */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradiente pra legibilidade do texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Conteúdo */}
              <div className="relative z-10 p-6">
                <div className="mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
