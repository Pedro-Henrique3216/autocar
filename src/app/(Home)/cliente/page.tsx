"use client"
import { Carro, CarroResponse, User } from "@/type"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import InformacaoUsuario from "./components/InformacaoUsuario"
import Modal from "@/components/Modal"
import Carrosel from "./components/Carrosel"

export default function Cliente() {
    const [usuario, setUsuario] = useState<User>({
        nome: "", email: "", cpf: "", senha: "", cep:"", numero: 0, 
        bairro: "", cidade: "", estado: "", rua: ""
    })

    const [open, setOpen] = useState(false)

    const [carros, setCarros] = useState<Carro[]>([])

    const [carro, setCarro] = useState<CarroResponse>({
        cd_pessoa: 0, marca: "", modelo: "", dt_veiculo: "", placa: ""
    })

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id) {
            setCarro((prevCarro) => ({
                ...prevCarro,
                cd_pessoa: Number(id),
            }));
        }
    }, []);

    const [errors, setErrors] = useState({
        modelo: "", placa: "", dt_veiculo: "", marca: ""
    })

    const navigate = useRouter()

    useEffect(() => {
        const verificaLogado = async () =>{
            const usuarioLogado = sessionStorage.getItem("id")
            
            if(usuarioLogado){
                try{
                    const response = await fetch(`http://localhost:8080/Java_war/api/user/${usuarioLogado}`)
                    const data = await response.json()
                    const user:User = {
                        nome: data["nome"],
                        email: data["email"],
                        cpf: data["cpf"],
                        senha: data["senha"],
                        cep: data["cep"],
                        bairro: data["bairro"],
                        cidade: data["cidade"],
                        estado: data["estado"],
                        numero: data["numeroCasa"],
                        rua: data["rua"] 
                    }
                    setUsuario(user)        
                } catch(error){
                    console.error(error)
                }
            } else {
            navigate.push("/login")
            }
        }
        
        verificaLogado()
    }, [])

    
    useEffect(() => {
        const puxarCarros = async () => {
            try{
                const response = await fetch(`http://localhost:8080/Java_war/api/automovel?userId=${sessionStorage.getItem("id")}`)
                if (response.ok) {
                    const data = await response.json();
                    
                    const carrosList = []
                    for (let i = 0; i < data.length; i++) {
                        const carro:Carro = {
                            id: data[i].id, placa: data[i].placa, marca: data[i].marca, modelo: data[i].modelo, data: data[i].dt_veiculo, 
                        }
                        carrosList.push(carro)               
                    }
                    setCarros(carrosList)
                } else {
                    const errorMessage = await response.text();
                    console.error("Erro na resposta:", response.status, errorMessage);
                }
               
            } catch(error){
                console.error(error)
            }
        }
        
        setTimeout(() => {
            puxarCarros();
        }, 500);
       
    }, [])

    const validaFormulario = () => {
        let isValid = true;
        const newError = { marca: "", modelo: "", placa: "", dt_veiculo: "" };

        if(!carro.modelo){
            newError.modelo = "Modelo é obrigatorio"
            isValid = false
        }

        if(!carro.marca){
            newError.marca = "Marca é obrigatorio"
            isValid = false
        }
   
        if(!carro.dt_veiculo){
            newError.dt_veiculo = "Data é obrigatoria"
            isValid = false
        }

        if(!carro.placa){
            newError.placa = "placa é obrigatoria"
            isValid = false
        }

        setErrors(newError)
        return isValid
    }

    const carroChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if(name == "dt_veiculo"){
            const data = new Date(value)
            data.setDate(data.getDate() + 1)
            const dataFormatada = data.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })
            setCarro({...carro, [name]: dataFormatada})
        } else {
            setCarro({...carro, [name]: value.toUpperCase()})
        }
        
        setErrors({...errors, [name]:""})
    } 


    const cadastroForm = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(validaFormulario()){
                const cabecalho = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Origin": "http://localhost:3000"
                    },
                    body: JSON.stringify(carro)
                };
                
                const response = await fetch(`http://localhost:8080/Java_war/api/automovel`, cabecalho);
        
                if (response.ok) {
                    alert("Carro cadastrado")
                    window.location.reload()
                } else{
                    alert(await response.text())
                    
                }
                setOpen(false)
            } 
        } catch (error) {
            console.error(error);
        }
    }


  return(
    <main className="p-5 grow">
        <h1 className="text-2xl md:text-4xl font-bold">Bem vindo {usuario.nome}</h1>
        <section className="border rounded-3xl shadow-xl md:w-2/4 m-auto mt-5 p-10">
            <InformacaoUsuario nome={usuario.nome} email={usuario.email} cpf={usuario.cpf} senha={usuario.senha} bairro={usuario.bairro} cep={usuario.cep}
            cidade={usuario.cidade} estado={usuario.estado} numero={usuario.numero} rua={usuario.rua} />
        </section>
        <section className="mt-11 flex flex-col items-center">
            <article className="w-full">
                <h2 className="text-center text-3xl font-bold pb-7">Carros cadastrado</h2>
                <Carrosel carros={carros}/>
            </article>
            <Modal open={open} onClose={() => setOpen(false)}>
                <form onSubmit={cadastroForm}>
                    <div className="flex flex-col mt-5 border-2 border-black pl-3 pr-3">
                        <label htmlFor="marca">marca</label>
                        <input id="marca" name="marca" type="text" className="focus:outline-none" onChange={carroChange}/>
                    </div>
                    {errors.marca && <p className="text-red-700 m-2">{errors.marca}</p>}
                    <div className="flex flex-col mt-5 border-2 border-black pl-3 pr-3">
                        <label htmlFor="modelo">modelo</label>
                        <input type="text" name="modelo" id="modelo" className="focus:outline-none" onChange={carroChange}/>
                    </div>
                    {errors.modelo && <p className="text-red-700 m-2">{errors.modelo}</p>}
                    <div className="flex flex-col mt-5 border-2 border-black pl-3 pr-3">
                        <label htmlFor="placa">placa</label>
                        <input type="text" name="placa" id="placa" className="focus:outline-none" onChange={carroChange}/>
                    </div>
                    {errors.placa && <p className="text-red-700 m-2">{errors.placa}</p>}
                    <div className="flex flex-col mt-5 border-2 border-black pl-3 pr-3">
                        <label htmlFor="data">data</label>
                        <input type="date" name="dt_veiculo" id="data" className="focus:outline-none" onChange={carroChange}/>
                    </div>
                    {errors.dt_veiculo && <p className="text-red-700 m-2">{errors.dt_veiculo}</p>}
                    <div className="flex gap-16 mt-5">
                        <button className="w-full text-blue-400 hover:text-blue-600" type="submit">Cadastrar</button>
                        <button className="w-full text-red-600 hover:text-red-800" onClick={() => setOpen(false)} >Cancelar</button>
                    </div>
                </form>
            </Modal> 
            <button className="mt-5 border bg-blue-600 p-5 hover:border-black hover:bg-blue-300" onClick={() => setOpen(true)}>Cadastrar novo Veiculo</button>
        </section>
    </main>
  )
}