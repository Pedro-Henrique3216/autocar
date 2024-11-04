import Image from "next/image";
import logoPorto from "../imagem/logo_porto.webp"
import carro from "../imagem/carro_tela_inicial.jpeg"

export default function Introducao() {

    return (
        <section className="flex flex-col md:flex-row border-b-2 border-gray-400 px-14 py-5 gap-10" id="introducao">
            <article className="md:w-1/2 md:my-16">
                <Image className="w-3/5 md:w-2/5" src={logoPorto} alt="Logo da porto" />
                <h1 className="ml-5 uppercase text-2xl md:text-3xl font-bold">Seu carro com o diagnostico e orçamento mais rapido e sem sair de casa</h1>
            </article>
            <Image className="w-full md:w-1/2 rounded-4xl" src={carro} alt="imagem de carro" />
         </section>

    )
}