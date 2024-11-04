"use client"
import { useEffect, useState } from "react"
import { Diagnostico } from "@/type"
import CardDiagnosticos from "@/components/CardDiagnostico";

export default function Carrosel({ diagnosticos, onCardClick, open}: { diagnosticos: Diagnostico[], onCardClick:()=>void, open:boolean }) {
    const [atual, setAtual] = useState(0);
    const [carrosPorPagina, setCarrosPorPagina] = useState(1);

    // Verifica o tamanho da tela e ajusta `carrosPorPagina` quando necessário
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setCarrosPorPagina(3);
            } else {
                setCarrosPorPagina(1);
            }
        };

        // Define o valor inicial e adiciona o event listener para redimensionamento
        handleResize();
        window.addEventListener('resize', handleResize);

        // Remove o event listener quando o componente é desmontado
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calcula o número total de páginas
    const totalPaginas = Math.ceil(diagnosticos.length / carrosPorPagina);

    // Funções para navegar entre os itens
    const proximo = () => {
        setAtual((prev) => (prev + 1) % totalPaginas);
    };

    const anterior = () => {
        setAtual((prev) => (prev - 1 + totalPaginas) % totalPaginas);
    };
    return (
        <div className={`${open && "hidden"} w-full mt-10`}>
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${atual * (100 / carrosPorPagina)}%)` }}
                >
                    {diagnosticos.length > 0 && diagnosticos.map((d) => (
                        <div key={d.id} className="flex-none w-full md:w-1/3 px-2">
                        <CardDiagnosticos id={d.id} descricao={d.descricao} dt_inicio={d.dt_inicio} oficina={d.nomeOficina} status={d.status} onclick={onCardClick}/>
                    </div>
                    ))}
                </div>
            </div>

            {/* Controles para navegar */}
            <div className="flex justify-between">
                <button className="text-5xl" onClick={anterior}>{" < "}</button>
                <button className="text-5xl" onClick={proximo}>{" > "}</button>
            </div>
            
        </div>
    );
}