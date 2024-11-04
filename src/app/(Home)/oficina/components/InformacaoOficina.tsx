"use client"
import Modal from "@/components/Modal"
import { AlterarOficina, OficinaRequest } from "@/type"
import { useEffect, useState } from "react"
import { GrUpdate } from "react-icons/gr"
import { MdBlock } from "react-icons/md"

export default function InformacaoOficina({nome, cnpj, inscricaoEstadual, email, senha, bairro, cep, cidade, estado, numero, rua}: OficinaRequest) {

    const[alteraCampo, setAlteraCampo] = useState(false)

    const [oficina, setOficina] = useState<AlterarOficina>(
        {nome: "", cnpj: "", inscricaoEstadual: "", senha: "", cep: "", numero: 0}
    )

    useEffect(() => {
        setOficina({nome, cnpj, inscricaoEstadual, senha, cep, numero})
    },[nome, cnpj, inscricaoEstadual, senha, cep, numero])

    const [errors, setErrors] = useState({
        nome: "", cnpj: "", inscricaoEstadual: "", senha: "", cep: "", numero: ""
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
        const newError = { nome: "", cnpj: "", inscricaoEstadual:"", senha: "", cep: "", numero: ""};

        if(!oficina.nome){
            newError.nome = "Nome é obrigatorio"
            isValid = false
        }

        if(!oficina.cnpj){
            newError.cnpj = "CNPJ é obrigatorio"
            isValid = false
        }

        if(!oficina.inscricaoEstadual){
            newError.inscricaoEstadual = "Inscrição estadual é obrigatorio"
            isValid = false
        }

        if(!oficina.senha){
            newError.senha = "Senha é obrigatoria"
            isValid = false
        } else if (oficina.senha.length < 8){
            newError.senha = "Senha deve ser maior que 8 caracteres"
            isValid = false
        }
        
        const regex = /[a-zA-Z]/
        if(!oficina.cep){
            newError.cep = "Cep é obrigatorio"
        } else if (regex.test(oficina.cep)){
            newError.cep = "Cep deve conter apenas numeros"
        }

        if(oficina.numero == 0){
            newError.numero = "numero invalido" 
        }
        setErrors(newError)
        return isValid
    }

    const updateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setOficina({...oficina, [name]:value})
        setErrors({...errors, [name]:""})
    }

    const updateSubmit = async () => {
        try {
            if(validaFormulario()){
            
                const cabecalho = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Origin": "http://localhost:3000"
                    },
                    body: JSON.stringify(oficina)
                };
                
                const response = await fetch(`http://localhost:8080/Java_war/api/oficina/${sessionStorage.getItem("id")}`, cabecalho);
        
                if (response.ok) {
                    window.location.reload();
                } else{
                    const data = await response.json()
                    console.log(data);
                    const mensagem = data.message.toLowerCase()
                    const newError = { nome: "", cnpj: "", inscricaoEstadual:"", senha: "", cep: "", numero: ""};
                    if(mensagem.includes("senha")){
                        newError.senha = "senha invalida"
                    } else if(mensagem.includes("cnpj")){
                        newError.cnpj = "cnpj invalido"
                    } else if(mensagem.includes("inscricao")){
                        newError.inscricaoEstadual = "inscrição Estadual invalido"
                    } else if(mensagem.includes("cep")){
                        newError.cep = "cep invalido"
                    } else if(mensagem.includes("numero")){
                        newError.numero = "numero invalido"
                    }
                    setErrors(newError)
                }
                setOpen(false)
            } 
        } catch (error) {
            console.error(error);
        }
            
    };

    const alterarCampo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setAlteraCampo(!alteraCampo)
    }

    const limparCampo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOficina({ ...oficina, senha: "" });
    };

  return(
    <div className="grow flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl lg:text-4xl">Informações da conta</h1>
        <div className="flex gap-4 w-full justify-center mt-5">
            <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed md:w-full">
                <label htmlFor="email" className="text-sm font-semibold cursor-not-allowed">Email</label>
                <div className="flex justify-between">
                    <input id="email" value={email} type="email" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                    <MdBlock className="text-xl"/>
                </div>
                
            </div>
        </div>  
        
          
        <form onSubmit={modal} className="flex flex-col items-center justify-center w-full">
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} md:w-full `}>
                <label htmlFor="nome" className="text-sm font-semibold" >Nome:</label>
                <input id="nome" type="text" value={oficina.nome} name="nome" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
            </div>
            {errors.nome && <p className="text-red-700 m-2">{errors.nome}</p>}
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} md:w-full `}>
                <label htmlFor="cpf" className="text-sm font-semibold">Cnpj:</label>
                <input id="cpf" type="text" name="cnpj" value={oficina.cnpj} disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`} />
            </div>
            {errors.cnpj && <p className="text-red-700 m-2">{errors.cnpj}</p>}
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} md:w-full `}>
                <label htmlFor="inscricaoEstadual" className="text-sm font-semibold">Cnpj:</label>
                <input id="inscricaoEstadual" type="text" name="inscricaoEstadual" value={oficina.inscricaoEstadual} disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`} />
            </div>
            {errors.inscricaoEstadual && <p className="text-red-700 m-2">{errors.inscricaoEstadual}</p>}
            <div className={`flex flex-col mt-5 border-2 px-6  border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} md:w-full `}>
                <label htmlFor="senha" className="text-sm font-semibold">Senha:</label>
                <input id="senha" type="password" value={oficina.senha} name="senha" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
            </div>
            {errors.senha && <p className="text-red-700 m-2">{errors.senha}</p>}
            {alteraCampo && <button onClick={limparCampo} className="text-red-600 font-medium mt-1">Limpar</button>}
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed md:w-full ">
                    <label htmlFor="rua" className="text-sm font-semibold cursor-not-allowed">Rua</label>
                    <div className="flex justify-between">
                        <input id="rua" value={rua} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                    
                </div>
            </div>
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed md:w-full ">
                    <label htmlFor="bairro" className="text-sm font-semibold cursor-not-allowed">Bairro</label>
                    <div className="flex justify-between">
                        <input id="bairro" value={bairro} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                    
                </div>
            </div>  
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed md:w-full ">
                    <label htmlFor="cidade" className="text-sm font-semibold cursor-not-allowed">Cidade</label>
                    <div className="flex justify-between">
                        <input id="cidade" value={cidade} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                    
                </div>
            </div>  
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed md:w-full ">
                    <label htmlFor="estado" className="text-sm font-semibold cursor-not-allowed">Estado</label>
                    <div className="flex justify-between">
                        <input id="estado" value={estado} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                </div>
            </div> 
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} md:w-full `}>
                <label htmlFor="cep" className="text-sm font-semibold">Cep:</label>
                <input id="cep" type="text" value={oficina.cep} name="ceo" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
            </div>
            {errors.cep && <p className="text-red-700 m-2">{errors.cep}</p>}
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} md:w-full `}>
                <label htmlFor="numero" className="text-sm font-semibold">Numero:</label>
                <input id="numero" type="number" value={oficina.numero} name="numero" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
            </div>
            {errors.numero && <p className="text-red-700 m-2">{errors.numero}</p>}
            


            <div className="mt-5">
                <button type="submit" className="border border-black p-3 hover:bg-blue-300">Atualizar</button>
                <button onClick={alterarCampo} className="ml-3 border border-black p-3 hover:bg-blue-300">Alterar</button>
            </div>
        </form> 

        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="text-center w-56">
                <GrUpdate size={56} className="mx-auto text-red-500" />
                <h3 className="text-lg font-black text-gray-800">Atualizar Oficina?</h3>
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