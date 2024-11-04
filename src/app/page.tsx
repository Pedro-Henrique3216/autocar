
import { CardProps } from "../type";
import Introducao from "@/components/Introducao";
import SobreNos from "@/components/SobreNos";
import Card from "@/components/Card";
import diagnostico from "@/imagem/diagnostico.jpg"
import economia from "@/imagem/economia.jpg"
import tecnologia from "@/imagem/tecnologia.jpg"
import Header from "@/components/Header";

export default function Home() {

  const listCard: CardProps[] = [
    {img: diagnostico, titulo: "Diagnósticos Imediatos e Confiáveis", descricao: "Com apenas alguns cliques, descreva os problemas do seu carro. Nosso chatbot inteligente interpreta os sintomas e fornece diagnósticos precisos em tempo real, evitando deslocamentos desnecessários."},
    {img: tecnologia, titulo: "Tecnologia de Ponta ao seu Alcance:", descricao: "Utilizamos a mais avançada inteligência artificial para garantir diagnósticos rápidos e precisos, integrando a facilidade de um assistente virtual com técnicas automotivas de última geração."},
    {img: economia, titulo: "Economia de Tempo e Dinheiro:", descricao: "Evite visitas desnecessárias a oficinas. Receba orçamentos online de diversos mecânicos, escolha a melhor oferta e agende o reparo no seu tempo."}
  ]

    return (
        <main className="grow">
            <Header />
            <Introducao />
            <section className="p-5 md:p-8 border-b-2 border-gray-400" id="diferenciais">
              <h2 className="text-3xl md:text-4xl text-center uppercase font-semibold">Por que utilizar nosso site</h2>
              <div className="flex flex-col md:flex-row md:justify-center items-center gap-2 ">
                {listCard.map((card, index) => (
                  <Card key={index} img={card.img} titulo={card.titulo} descricao={card.descricao} />
                ))}
              </div>
            </section >
            <SobreNos />
        </main>
    )
}
