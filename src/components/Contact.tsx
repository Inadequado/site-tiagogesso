import { MessageCircle, Phone, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export function Contact() {
  // Aqui você vai colocar o número real do seu amigo.
  // Regra: 55 (Brasil) + DDD + Número. Sem espaços ou traços!
  const numeroWhatsApp = "5533988199369";

  // Uma mensagem padrão que já vai aparecer digitada para o cliente
  const mensagem = "Olá! Vi o seu site e gostaria de solicitar um orçamento.";

  // Isso cria o link oficial do WhatsApp
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  const linkInstagram = "https://www.instagram.com/tiagogessoo";

  return (
    // Usamos o bg-slate-900 para dar um visual bem escuro de rodapé
    <section id="contato" className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Dividimos o rodapé em duas colunas no PC (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* LADO ESQUERDO: Chamada principal e Botão do WhatsApp */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronto para transformar seu ambiente?
            </h2>
            <p className="mb-8 text-lg">
              Entre em contato agora mesmo. Fazemos um orçamento sem compromisso
              e tiramos todas as suas dúvidas sobre o projeto.
            </p>

            {/* O Botão Mágico do Zap */}
            <a
              href={linkWhatsApp}
              target="_blank" // Isso faz abrir em uma nova aba, para o cliente não sair do seu site!
              rel="noopener noreferrer" // Medida de segurança do navegador
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Chamar no WhatsApp
            </a>
          </div>

          {/* LADO DIREITO: Informações de contato e redes sociais */}
          <div className="flex flex-col gap-6 items-end md:items-end">
            <div className="flex items-center gap-3">
              <span className="text-right">
                <p className="font-semibold text-white">Telefone / WhatsApp</p>
                <p>(33) 98819-9369</p>
              </span>
              <div className="bg-slate-800 p-3 rounded-full">
                <Phone className="text-blue-400" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-right">
                <p className="font-semibold text-white">Área de Atendimento</p>
                <p>Simonésia e Região</p>
              </span>
              <div className="bg-slate-800 p-3 rounded-full">
                <MapPin className="text-blue-400" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-right">
                <p className="font-semibold text-white">Siga nosso trabalho</p>
                <a
                  href={linkInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  @tiagogessoo
                </a>
              </span>
              <div className="bg-slate-800 p-3 rounded-full">
                <FaInstagram className="text-blue-400 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* LINHA FINAL: Direitos Autorais */}
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Tiago Gesso. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">Desenvolvido com dedicação por você!</p>
        </div>
      </div>
    </section>
  );
}
