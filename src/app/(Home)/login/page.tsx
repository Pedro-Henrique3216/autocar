"use client"
import Link from "next/link";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import CamposLogin from "./components/CamposLogin";
import Image from "next/image";
import Voltar from "@/imagem/icone_voltar.svg"

export default function Login() {

  const [erroLogar, setErrorLogar] = useState(false)

  return (
    <main className="grow flex flex-col-reverse lg:flex-row">
      <Link href={"/"}><Image src={Voltar} alt="Seta de Voltar" className="w-14 my-5 md:w-20"/></Link>
      <section className="w-full lg:w-2/3 m-auto">
        
          {erroLogar && (<div className="flex justify-center items-center border-2 border-red-600 pt-2 pb-2 w-2/4 m-auto rounded-xl shadow-xl mb-4">
                          <FaTimesCircle className="text-red-500 mr-2 text-2xl" />
                          <p className="text-red-700 text-2xl">Email ou senha incorretos</p> 
                        </div>              
          )}
        
        <h1 className="w-full text-center text-4xl xl:text-6xl text-blue-600">Login</h1>
        <CamposLogin erro={() => setErrorLogar(true)} clearErro={() => setErrorLogar(false)} />
      </section>
      <article className="w-full lg:w-1/3 bg-blue-400 flex flex-col items-center justify-center text-center p-3">
          <h1 className="text-5xl xl:text-6xl text-white m-5">Novo Aqui?</h1>
          <h3 className="text-xl xl:text-3xl text-white m-5">Crie uma conta e aproveite todas as funcionalidade da nossa IA para dignosticar seu carro</h3>
          <Link href={"/cadastro/usuario"} className="mt-5 rounded-3xl bg-white p-3 px-8 text-center text-xl">Cadastrar</Link>    
      </article>
    </main>
  );
}