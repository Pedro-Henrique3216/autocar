
import { CardProps } from "../type";
import Introducao from "@/components/Introducao";
import SobreNos from "@/components/SobreNos";
import Card from "@/components/Card";
import diagnostico from "@/imagem/diagnostico.jpg"
import economia from "@/imagem/economia.jpg"
import tecnologia from "@/imagem/tecnologia.jpg"
import Header from "@/components/Header";
import Colaborador from "@/components/Colaborador";
import fotoPedro from "@/imagem/fotos_contribuidores/foto_pedro.jpg"
import fotoThiago from "@/imagem/fotos_contribuidores/foto_thiago.jpg"
import IconeGitHub from "@/imagem/github.png"
import IconeFigma from "@/imagem/iconeFigma.webp"
import Link from "next/link";
import Image from "next/image";



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
            <h2 className="text-center font-bold md:text-3xl">Desenvolvedores</h2>
            <div className="flex flex-col md:flex-row gap-5 p-4">
              <Colaborador imagem={fotoPedro} link_github="https://github.com/Pedro-Henrique3216" nome="Pedro Henrique dos Santos" rm={559064} />
              <Colaborador imagem={fotoThiago} link_github="https://github.com/ThiagoThmaz" nome="Thiago Thomaz" rm={557992} />
            </div>
            <section className="flex flex-col gap-5" id="desenvolvedores">
                <Link className="flex items-center justify-center gap-4 m-auto md:text-3xl hover:text-blue-500" href="https://github.com/Challenge-Porto-Seguro/Challenge_Porto_Seguro" target="_blank"><Image className="w-1/12" src={IconeGitHub} alt="icone do github" />Link do Projeto no GitHub</Link>
                <Link className="flex items-center justify-center gap-4 m-auto md:text-3xl hover:text-blue-500" href="https://www.figma.com/team_invite/redeem/853grbCAf7qkMOEln39byr" target="_blank"><Image className="w-1/12" src={IconeFigma} alt="icone do figma" />Link do Projeto no Figma</Link>
            </section>
        </main>
    )
}
