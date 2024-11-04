"use client"
import { Diagnostico, DiagnosticoComplete, OficinaRequest } from "@/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InformacaoOficina from "./components/InformacaoOficina";
import Carrosel from "./components/Carrosel";
import DiagnoticoComplete from "../veiculo/[id]/components/DiagnosticoComplete";

export default function Oficina() {

    const [oficina, setOficina] = useState<OficinaRequest>({
        nome: "", email: "", cnpj: "", inscricaoEstadual: "", senha: "", cep:"", numero: 0, 
        bairro: "", cidade: "", estado: "", rua: ""
    })

    const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([])
    const [diagnostico, setDiagnostico] = useState<DiagnosticoComplete>(
        {cd_automovel: 0, cd_oficina: 0, descricao: "", dt_fim: "", dt_inicio: "", id: 0, nome: "", preco: 0, quantidade: 0, status: "", valorTotal: 0}
      )
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id) {
            setDiagnosticos((prevCarro) => ({
                ...prevCarro,
                cd_pessoa: Number(id),
            }));
        }
    }, [])

    const navigate = useRouter()

    useEffect(() => {
        const verificaLogado = async () =>{
            const usuarioLogado = sessionStorage.getItem("id")
            if(usuarioLogado){
                try{
                    const response = await fetch(`http://localhost:8080/Java_war/api/oficina/${usuarioLogado}`)
                    if(response.ok){
                        const data = await response.json()
                        const oficina:OficinaRequest = {
                            nome: data["nome"],
                            email: data["email"],
                            cnpj: data["cnpj"],
                            inscricaoEstadual: data["inscricaoEstadual"],
                            senha: data["senha"],
                            cep: data["cep"],
                            bairro: data["bairro"],
                            cidade: data["cidade"],
                            estado: data["estado"],
                            numero: data["numeroCasa"],
                            rua: data["rua"]
                        }
                        setOficina(oficina)     
                    }
                   
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
        const puxarDiagnostico = async () => {
            try{
                const response = await fetch(`http://localhost:8080/Java_war/api/diagnostico/buscar_todos/oficina/${sessionStorage.getItem("id")}`)
                if (response.ok) {
                    const data = await response.json();
                    const diagnosticoList = []
                    for (let i = 0; i < data.length; i++) {
                        const diagnostico:Diagnostico = {
                            id: data[i].id, cd_automovel: data[i].cd_automovel, marca: data[i].marca, cd_oficina: data[i].cd_oficina, descricao: data[i].descricao
                            ,dt_fim: data[i].dt_fim, dt_inicio: data[i].dt_inicio, nomeOficina: data[i].nomeOficina, status: data[i].status 
                        }
                        diagnosticoList.push(diagnostico)               
                    }
                    setDiagnosticos(diagnosticoList)
                } else {
                    const errorMessage = await response.json();
                    console.error("Erro na resposta:", response.status, errorMessage);
                }
               
            } catch(error){
                console.error(error)
            }
        }

        
        
        setTimeout(() => {
            puxarDiagnostico();
        }, 500);
       
    }, [])

    useEffect(() => {
        const idDiagnostico = sessionStorage.getItem("id_diagnostico");
        if (open && idDiagnostico) {
          const puxarDiagnostico = async () => {
            try {
              const response = await fetch(`http://localhost:8080/Java_war/api/diagnostico/${idDiagnostico}`);
              if (response.ok) {
                const data = await response.json();
                const diagnosticoData = {
                  id: data.id,
                  cd_automovel: data.cd_automovel,
                  cd_oficina: data.cd_oficina,
                  descricao: data.descricao,
                  dt_fim: data.dt_fim,
                  dt_inicio: data.dt_inicio,
                  status: data.status,
                  nome: data.produtos[0].nome,
                  preco: data.produtos[0].preco,
                  quantidade: data.produtos[0].quantidade,
                  valorTotal: data.valorTotal,
                };
                setDiagnostico(diagnosticoData)
                
              } else {
                console.error("Erro ao buscar diagnóstico:", response.status);
              }
            } catch (error) {
              console.error("Erro ao buscar diagnóstico:", error);
            }
          };
          const intervalId = setInterval(puxarDiagnostico, 5000);

          return () => clearInterval(intervalId);
          
        }
      }, [open]); 


  return(
    <main onClick={() => setOpen(false)} className={`${open && "flex flex-col md:flex-row"} grow`}>
        <div className={`${open && "w-full md:w-2/3"}`}>
            <h1 className="text-2xl md:text-4xl font-bold">Bem vindo {oficina.nome}</h1>
            <section className="border rounded-3xl shadow-xl w-3/4 lg:w-2/4 m-auto mt-5 p-10">
                <InformacaoOficina nome={oficina.nome} email={oficina.email} cnpj={oficina.cnpj} inscricaoEstadual={oficina.inscricaoEstadual} senha={oficina.senha} bairro={oficina.bairro} cep={oficina.cep}
                cidade={oficina.cidade} estado={oficina.estado} numero={oficina.numero} rua={oficina.rua} />
            </section>
            <Carrosel diagnosticos={diagnosticos} onCardClick={() => setOpen(true)} open={open}/>
        </div>

        {
        open ? <div className="bg-slate-300 p-4 rounded-lg shadow-md w-full md:w-1/3" >
          <DiagnoticoComplete cd_automovel={diagnostico?.cd_automovel} cd_oficina={diagnostico?.cd_oficina} descricao={diagnostico?.descricao} dt_fim={diagnostico?.dt_fim} dt_inicio={diagnostico?.dt_inicio} id={diagnostico?.id} nome={diagnostico?.nome} preco={diagnostico?.preco} quantidade={diagnostico?.quantidade} status={diagnostico?.status} valorTotal={diagnostico?.valorTotal}/> 
          </div>
        : ""
      }
        
    </main>
  )
}