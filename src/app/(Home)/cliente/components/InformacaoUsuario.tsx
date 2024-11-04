import Modal from "@/components/Modal";
import { Alterar, User } from "@/type";
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdBlock } from "react-icons/md";

export default function InformacaoUsuario({nome, cpf, email, senha, bairro, cep, cidade, estado, numero, rua}: User) {

    const[alteraCampo, setAlteraCampo] = useState(false)

    const [user, setUser] = useState<Alterar>(
        {nome: "", cpf: "", senha: "", cep: "", numero: 0}
    )

    useEffect(() => {
        setUser({nome, cpf, senha, cep, numero})
    },[nome, cpf, senha, cep, numero])

    const [errors, setErrors] = useState({
        nome: "", cpf: "", senha: "", cep: "", numero: ""
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
        const newError = { nome: "", cpf: "", senha: "", cep: "", numero: ""};

        if(!user.nome){
            newError.nome = "Nome é obrigatorio"
            isValid = false
        }

        if(!user.cpf){
            newError.cpf = "CPF é obrigatorio"
            isValid = false
        }
   
        if(!user.senha){
            newError.senha = "Senha é obrigatoria"
            isValid = false
        } else if (user.senha.length < 8){
            newError.senha = "Senha deve ser maior que 8 caracteres"
            isValid = false
        }

        const regex = /[a-zA-Z]/
        if(!user.cep){
            newError.cep = "Cep é obrigatorio"
        } else if (regex.test(user.cep)){
            newError.cep = "Cep deve conter apenas numeros"
        }

        if(user.numero == 0){
            newError.numero = "numero invalido" 
        }

        setErrors(newError)
        return isValid
    }

    const updateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
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
                    body: JSON.stringify(user)
                };
                
                const response = await fetch(`http://localhost:8080/Java_war/api/user/${sessionStorage.getItem("id")}`, cabecalho);
        
                if (response.ok) {
                    window.location.reload();
                } else{
                    const data = await response.json()
                    const mensagem = data.message.toLowerCase()
                    const newError = { nome: "", cpf: "", senha: "", cep: "", numero: ""};
                    if(mensagem.includes("senha")){
                        newError.senha = "senha invalida"
                    } else if(mensagem.includes("cpf")){
                        newError.cpf = "cpf invalido"
                    } else if(mensagem.includes("cep")){
                        newError.cpf = "cep invalido"
                    } else if(mensagem.includes("numero")){
                        newError.cpf = "numero invalido"
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
        setUser({ ...user, senha: "" });
    };

  return(
    <div className="grow flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl lg:text-4xl">Informações da conta</h1>
        <div className="flex gap-4 w-full justify-center mt-5">
            <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed lg:w-2/4">
                <label htmlFor="email" className="text-sm font-semibold cursor-not-allowed">Email</label>
                <div className="flex justify-between">
                    <input id="email" value={email} type="email" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                    <MdBlock className="text-xl"/>
                </div>
                
            </div>
        </div>  
        
          
        <form onSubmit={modal} className="flex flex-col items-center justify-center w-full">
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} lg:w-2/4`}>
                <label htmlFor="nome" className="text-sm font-semibold" >Nome:</label>
                <input id="nome" type="text" value={user.nome} name="nome" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
            </div>
            {errors.nome && <p className="text-red-700 m-2">{errors.nome}</p>}
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} lg:w-2/4`}>
                <label htmlFor="cpf" className="text-sm font-semibold">Cpf:</label>
                <input id="cpf" type="text" name="cpf" value={user.cpf} disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`} />
            </div>
            {errors.cpf && <p className="text-red-700 m-2">{errors.cpf}</p>}
            <div className={`flex flex-col mt-5 border-2 px-6  border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} lg:w-2/4`}>
                <label htmlFor="senha" className="text-sm font-semibold">Senha:</label>
                <input id="senha" type="password" value={user.senha} name="senha" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
            </div>
            {errors.senha && <p className="text-red-700 m-2">{errors.senha}</p>}
            {alteraCampo && <button onClick={limparCampo} className="text-red-600 font-medium mt-1">Limpar</button>}
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed lg:w-2/4">
                    <label htmlFor="rua" className="text-sm font-semibold cursor-not-allowed">Rua</label>
                    <div className="flex justify-between">
                        <input id="rua" value={rua} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                    
                </div>
            </div>
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed lg:w-2/4">
                    <label htmlFor="bairro" className="text-sm font-semibold cursor-not-allowed">Bairro</label>
                    <div className="flex justify-between">
                        <input id="bairro" value={bairro} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                    
                </div>
            </div>  
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed lg:w-2/4">
                    <label htmlFor="cidade" className="text-sm font-semibold cursor-not-allowed">Cidade</label>
                    <div className="flex justify-between">
                        <input id="cidade" value={cidade} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                    
                </div>
            </div>  
            <div className="flex gap-4 w-full justify-center mt-5">
                <div className="flex flex-col bg-gray-300 px-3 border-2 border-black cursor-not-allowed lg:w-2/4">
                    <label htmlFor="estado" className="text-sm font-semibold cursor-not-allowed">Estado</label>
                    <div className="flex justify-between">
                        <input id="estado" value={estado} type="text" className="bg-gray-300 focus:outline-none cursor-not-allowed" disabled/>
                        <MdBlock className="text-xl"/>
                    </div>
                </div>
            </div> 
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} lg:w-2/4`}>
                <label htmlFor="cep" className="text-sm font-semibold">Cep:</label>
                <input id="cep" type="text" value={user.cep} name="ceo" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
            </div>
            {errors.cep && <p className="text-red-700 m-2">{errors.cep}</p>}
            <div className={`flex flex-col mt-5 border-2 px-6 border-black lg:px-3 ${!alteraCampo && "cursor-not-allowed bg-gray-300"} lg:w-2/4`}>
                <label htmlFor="numero" className="text-sm font-semibold">Numero:</label>
                <input id="numero" type="number" value={user.numero} name="numero" disabled={!alteraCampo} onChange={updateChange} className={`focus:outline-none ${alteraCampo ? "bg-white" : "bg-gray-300"}`}/>
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
                <h3 className="text-lg font-black text-gray-800">Atualizar Usuario?</h3>
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