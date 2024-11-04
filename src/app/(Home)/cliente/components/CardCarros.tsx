import { CardCarrosProps } from "@/type";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

export default function CardCarros({id, placa, marca, modelo, data} : {id:number} & CardCarrosProps) {

  return(
    <div className="border shadow-xl rounded-xl px-7 py-7 hover:border-blue-600 cursor-pointer">
        <Link href={`/veiculo/${id}`} className="flex justify-end"><FaPen className="text-yellow-400"  /></Link>
        <h1 className="text-3xl mb-3">Marca: <span className="uppercase text-red-600">{marca}</span></h1>
        <h2 className="text-xl uppercase mb-3">Modelo: {modelo}</h2>
        <h2 className="text-xl mb-6">Placa: {placa}</h2>
        <p>Data do veiculo: {data}</p>
    </div>
  )
}