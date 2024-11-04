"use client"
import { useEffect, useState } from "react"
import { Carro } from "@/type"
import CardCarros from "./CardCarros"

export default function Carrosel({ carros }: { carros: Carro[] }) {
    const [atual, setAtual] = useState(0);
    const [carrosPorPagina, setCarrosPorPagina] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setCarrosPorPagina(3);
            } else {
                setCarrosPorPagina(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const totalPaginas = Math.ceil(carros.length / carrosPorPagina);


    const proximo = () => {
        setAtual((prev) => (prev + 1) % totalPaginas);
    };

    const anterior = () => {
        setAtual((prev) => (prev - 1 + totalPaginas) % totalPaginas);
    };

    return (
        <div className="w-full">
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${atual * (100 / carrosPorPagina)}%)` }}
                >
                    {carros.length > 0 && carros.map((c) => (
                        <div key={c.id} className="flex-none w-full md:w-1/3 px-2">
                            <CardCarros id={c.id} placa={c.placa} marca={c.marca} modelo={c.modelo} data={c.data} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between">
                <button className="text-5xl" onClick={anterior}>{" < "}</button>
                <button className="text-5xl" onClick={proximo}>{" > "}</button>
            </div>
            
        </div>
    );
}