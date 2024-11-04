"use client"
import { ChangeEvent, useState } from "react";
import CadastroUsuarioForm from "./components/CadastroUsuarioForm";
import CadastroOficinaForm from "./components/CadastroOficinaForm";
import Link from "next/link";
import Image from "next/image";
import Voltar from "@/imagem/icone_voltar.svg"

export default function CadastroUsuario() {

  const [pessoaIsChecked, setPessoaIsChecked] = useState<boolean>(true);
  const [oficinaIsChecked, setOficinaIsChecked] = useState<boolean>(false);

  const handlePessoaChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked && !oficinaIsChecked) {
      setPessoaIsChecked(true);
    } else {
      setPessoaIsChecked(event.target.checked);
      setOficinaIsChecked(!event.target.checked);
    }
  };

  const handleOficinaChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked && !pessoaIsChecked) {
      setOficinaIsChecked(true);
    } else {
      setOficinaIsChecked(event.target.checked);
      setPessoaIsChecked(!event.target.checked);
    }
  };

  return(
    <main className="grow flex flex-col items-center p-8">
       <div className="self-start">
            <Link href={"/"}>
                <Image src={Voltar} alt="Seta de Voltar" className="w-14 my-5 md:w-20" />
            </Link>
        </div>
      <section className="text-center border-b-2">
        <h1 className="sm:text-5xl text-black text-4xl font-bold ">Crie seu Cadastro</h1>
        <h2 className="text-md mt-5 md:m-5">
          Para ser cliente é necessário preencher corretamente o formulário abaixo com os respectivos dados cadastrais. Os campos com * são de preenchimento obrigatório e essenciais para realizarmos o envio do seu futuro pedido.
        </h2>
      </section>
      
      <div className="flex gap-8 justify-center m-5">
        <div className="flex gap-2 items-center">
          <input 
            checked={pessoaIsChecked} 
            onChange={handlePessoaChange} 
            type="checkbox" 
            className="w-4 h-4 appearance-none rounded-xl border-2 border-black checked:bg-blue-500 checked:border-blue-500 focus:outline-none"
          />
          <p>Usuário</p>
        </div>

        <div className="flex gap-2 items-center">
          <input 
            checked={oficinaIsChecked} 
            onChange={handleOficinaChange} 
            type="checkbox" 
            className="w-4 h-4 appearance-none rounded-xl border-2 border-black checked:bg-blue-500 checked:border-blue-500 focus:outline-none"
          />
          <p>Oficina</p>
        </div>
      </div>
      
      {
        pessoaIsChecked ? <CadastroUsuarioForm /> : <CadastroOficinaForm />
      }

    </main>
  )
}