import { ListaColaboradores } from "@/type";
import Image from "next/image";
import Link from "next/link";

export default function Colaborador({imagem, nome, rm, link_github} : ListaColaboradores){
    return (
        <div className="flex flex-col items-center text-center border-2 w-full md:w-1/2 border-black gap-2 p-3 rounded-2xl">
            <Image className="w-1/2 rounded-full md:1/3" src={imagem} alt="teste" />
            <h2 className="md:text-3xl">{nome} RM:{rm}</h2>
            <Link className="hover:text-blue-400 md:text-xl" href={link_github} target="_blank">Link Github</Link>
        </div>
    )
}