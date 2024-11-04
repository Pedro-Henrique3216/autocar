"use client"
import { Carro, Diagnostico, DiagnosticoComplete } from "@/type"
import { use, useEffect, useState } from "react"
import InformacoesVeiculo from "./components/InformacoesVeiculo"
import Link from "next/link"
import Carrosel from "./components/Carrosel"
import DiagnoticoComplete from "./components/DiagnosticoComplete"

export default function Veiculo({ params }: { params: Promise<{ id: number }> }) {

  const { id } = use(params)

  const [carro, setCarro] = useState<Carro>({
    id: 0, data: "", marca: "", modelo: "", placa: ""
  })

  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([])
  const [diagnostico, setDiagnostico] = useState<DiagnosticoComplete>(
    {cd_automovel: 0, cd_oficina: 0, descricao: "", dt_fim: "", dt_inicio: "", id: 0, nome: "", preco: 0, quantidade: 0, status: "", valorTotal: 0}
  )

  const [open, setOpen] = useState(false)
  useEffect(
    () => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:8080/Java_war/api/automovel/${id}`)
            const data = await response.json()
            const car = {
              id: data.id,
              data: data.dt_veiculo,
              marca: data.marca,
              modelo: data.modelo,
              placa: data.placa
            }   
            setCarro(car)
        }
        chamadaApi()
    }, [id])

    const reload = ()=> {
      window.location.reload()
  }

  useEffect(() => {
    const puxarDiagnostico = async () => {
        try{
            const response = await fetch(`http://localhost:8080/Java_war/api/diagnostico/buscar_todos/${sessionStorage.getItem("id")}`)
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
    puxarDiagnostico()
  }, [])

  useEffect(() => {
    const idDiagnostico = sessionStorage.getItem("id_diagnostico");
    console.log(idDiagnostico);
    
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
            setDiagnostico(diagnosticoData);
            console.log(diagnosticoData);
            
          } else {
            console.error("Erro ao buscar diagnóstico:", response.status);
          }
        } catch (error) {
          console.error("Erro ao buscar diagnóstico:", error);
        }
      };

      puxarDiagnostico();
    }
  }, [open]); 

  const atualizar = async () => {
    const idDiagnostico = sessionStorage.getItem("id_diagnostico");
    try {
        
            const cabecalho = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "http://localhost:3000"
                }
            };
            
            const response = await fetch(`http://localhost:8080/Java_war/api/diagnostico/${idDiagnostico}`, cabecalho);
    
            if (response.ok) {
                reload()
                alert("Atulizado com sucesso")
            } else{
                const data = await response.json()
                console.log(data);
            } 
            
    } catch (error) {
        console.error(error);
    }
        
};
 
  
  return(
    <main onClick={() => setOpen(false)} className={`${open && "flex flex-col md:flex-row"} grow`}>
      <div className={`${open && "w-full md:w-2/3"}`}>
        <InformacoesVeiculo  id={carro.id} data={carro.data} marca={carro.marca} modelo={carro.modelo} placa={carro.placa} reload={() => reload}/>
        <Carrosel diagnosticos={diagnosticos} onCardClick={() => setOpen(true)} open={open}/>
        <div className="w-full text-center my-10">
          <Link href={"/chat"} onClick={() => sessionStorage.setItem("cd_automovel", carro.id.toString())} className="text-xl md:text-3xl font-bold uppercase border-2 border-blue-500 rounded-xl p-3 hover:bg-blue-300">Iniciar diagnostico</Link>
        </div>
      </div>
      
      {
        open ? <div className="bg-slate-300 p-4 rounded-lg shadow-md w-full md:w-1/3" >
          <DiagnoticoComplete cd_automovel={diagnostico?.cd_automovel} cd_oficina={diagnostico?.cd_oficina} descricao={diagnostico?.descricao} dt_fim={diagnostico?.dt_fim} dt_inicio={diagnostico?.dt_inicio} id={diagnostico?.id} nome={diagnostico?.nome} preco={diagnostico?.preco} quantidade={diagnostico?.quantidade} status={diagnostico?.status} valorTotal={diagnostico?.valorTotal}/> 
          <button className="mt-5 text-red-500 text-2xl" onClick={atualizar}>Atualizar</button>
          </div>
        : ""
      }
    </main>
      
  )
}