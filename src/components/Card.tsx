import { CardProps } from "@/type";
import Image from "next/image";

export default function Card({img, titulo, descricao}: CardProps) {
  return(
    <div className="flex flex-col p-10 gap-5">
      <div className="w-full h-48 overflow-hidden rounded-3xl border-2">
          <Image className="w-full h-full object-cover" src={img} alt={`imagem do ${titulo}`} />
      </div>
      <h2 className="font-bold text-xl lg:text-2xl">{titulo}</h2>
      <p className="lg:text-lg">{descricao}</p>
  </div>
  )
}