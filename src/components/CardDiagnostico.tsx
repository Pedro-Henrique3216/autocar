import { CardDiagnostico } from "@/type";

export default function CardDiagnosticos({id, descricao, dt_inicio, oficina, status, onclick} : CardDiagnostico & {onclick:()=>void}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    sessionStorage.setItem("id_diagnostico", id.toString());
    onclick()
  };

  return(
    <div className="border shadow-xl rounded-xl px-7 py-7 hover:border-blue-600 cursor-pointer" onClick={handleClick}>
        <h1 className="text-3xl mb-3">Descrição: <span className="uppercase text-red-600">{descricao}</span></h1>
        <h2 className="text-xl uppercase mb-3">Data de inicio: {dt_inicio}</h2>
        <h2 className="text-xl mb-6">Oficina: {oficina}</h2>
        <p>Status: {status}</p>
    </div>
  )
}