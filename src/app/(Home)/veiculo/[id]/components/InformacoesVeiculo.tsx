import Modal from "@/components/Modal";
import { Carro } from "@/type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import Voltar from "@/imagem/icone_voltar.svg"
import Link from "next/link";

export default function InformacoesVeiculo({id, marca, modelo, placa, data, reload}: Carro & {reload: () => void}) {

    const [carro, setCarro] = useState<Carro>(
        {id: 0, marca: "", modelo: "", placa: "", data: ""}
    )

    function formatarData(data: string): string {
        const [dia, mes, ano] = data.split("/");
        return `${ano}-${mes}-${dia}`;
    }

    useEffect(() => {
        if (data) {
            const dataFormatada = formatarData(data);
            setCarro({ id, marca, modelo, placa, data: dataFormatada });
        }
    }, [id, marca, modelo, placa, data])
    

    const [errors, setErrors] = useState({
        marca: "", modelo: "", placa: "", data: ""
    })

    const [open, setOpen] = useState(false)

    const modal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validaFormulario()){
            setOpen(true)
        }
    }

    const validaFormulario = () => {
        let isValid = true;
        const newError = { marca: "", modelo: "", placa: "", data: "" };

        if(!carro.modelo){
            newError.modelo = "Modelo é obrigatorio"
            isValid = false
        }

        if(!carro.marca){
            newError.marca = "Marca é obrigatorio"
            isValid = false
        }
   
        if(!carro.placa){
            newError.placa = "Placa é obrigatoria"
            isValid = false
        } 

        if(!carro.data){
            newError.data = "Data é obrigatoria"
            isValid = false
        }

        setErrors(newError)
        return isValid
    }

    const updateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setCarro({...carro, [name]:value})
        setErrors({...errors, [name]:""})
    }

    const updateSubmit = async () => {
        try {
            if(validaFormulario()){

                const data = new Date(carro.data)
                data.setDate(data.getDate() + 1)
                const dataFormatada = data.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })

                const car = {
                    marca: carro.marca, modelo: carro.modelo, placa: carro.placa, dt_veiculo: dataFormatada, cd_pessoa: sessionStorage.getItem("id")
                }
            
                const cabecalho = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Origin": "http://localhost:3000"
                    },
                    body: JSON.stringify(car)
                };
                
                const response = await fetch(`https://meuprojeto.link/autodiag/api/automovel/${id}`, cabecalho);
        
                if (response.ok) {
                    reload()
                    setOpen(false)
                    alert("Atulizado com sucesso")
                } else{
                    const data = await response.json()
                    console.log(data);
                    
                    const mensagem = data.message.toLowerCase()
                    const newError = { marca: "", modelo: "", placa: "", data: ""};
                    if(mensagem.includes("placa")){
                        newError.placa = "placa invalida"
                        setErrors(newError)
                    }
                
                } 
                
            }
        } catch (error) {
            console.error(error);
        }
            
    };
    return(
        <div className="grow flex flex-col justify-center items-center p-4">
            <div className="w-full flex justify-start">
                <Link href={"/cliente"}><Image src={Voltar} alt="Seta de Voltar" className="w-14 md:w-20"/></Link>
            </div>
            <h1 className="font-bold text-3xl md:text-4xl">Informações do Carro</h1> 
            <form onSubmit={modal} className="flex flex-col items-center justify-center w-full">
                <div className={`flex flex-col mt-5 border-2 border-black pl-3 pr-3 w-3/4 md:w-2/4`}>
                    <label htmlFor="marca" className="text-sm font-semibold" >Marca:</label>
                    <input id="marca" type="text" value={carro.marca} name="marca" onChange={updateChange} className={`focus:outline-none`}/>
                </div>
                {errors.marca && <p className="text-red-700 m-2">{errors.marca}</p>}
                <div className={`flex flex-col mt-5 border-2 border-black pl-3 pr-3 w-3/4 md:w-2/4`}>
                    <label htmlFor="modelo" className="text-sm font-semibold">modelo:</label>
                    <input id="modelo" type="text" name="modelo" value={carro.modelo} onChange={updateChange} className={`focus:outline-none`} />
                </div>
                {errors.modelo && <p className="text-red-700 m-2">{errors.modelo}</p>}
                <div className={`flex flex-col mt-5 border-2 border-black pl-3 pr-3 w-3/4 md:w-2/4`}>
                    <label htmlFor="placa" className="text-sm font-semibold">placa:</label>
                    <input id="placa" type="text" value={carro.placa} name="placa" onChange={updateChange} className={`focus:outline-none`}/>
                </div>
                {errors.placa && <p className="text-red-700 m-2">{errors.placa}</p>}
                <div className={`flex flex-col mt-5 border-2 border-black pl-3 pr-3 w-3/4 md:w-2/4`}>
                    <label htmlFor="data" className="text-sm font-semibold">data:</label>
                    <input id="data" type="date" value={carro.data} name="data" onChange={updateChange} className={`focus:outline-none`}/>
                </div>
                {errors.data && <p className="text-red-700 m-2">{errors.data}</p>}
                <div className="mt-5">
                    <button type="submit" className="border border-black p-3 hover:bg-blue-300">Atualizar</button>
                </div>
            </form> 
    
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="text-center w-56">
                    <GrUpdate size={56} className="mx-auto text-red-500" />
                    <h3 className="text-lg font-black text-gray-800">Atualizar Veiculo?</h3>
                    <p className="text-gray-500 text-sm">Voce tem certeza que deseja atualizar os campos</p>
                </div>
    
                <div className="flex gap-16">
                    <button className="btn .btn-danger w-full" onClick={updateSubmit}>Sim</button>
                    <button className="btn btn-light w-full" onClick={() => setOpen(false)} >Não</button>
                </div>
            </Modal> 

            
        </div>
    )
}