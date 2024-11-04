import Link from "next/link";
import portoLogo from "@/imagem/logo_porto.webp"
import Image from "next/image";
import MenuHamburguer from "./MenuHamburguer";

export default function Header() {
  return(
    <header className="border-b-2 p-2">
         <nav>
            <ul className="flex justify-between items-center p-3">
                <div className="flex gap-16 md:gap-5 md:justify-between items-center w-2/4 md:w-3/4">
                    <li className="md:hidden">
                        <MenuHamburguer />
                    </li>
                    <li className="w-2/4 md:w-1/4">
                        <Image className="pt-5 md:pt-0" src={portoLogo} alt="logo da porto" />
                    </li>
                    
                    <li className="hidden md:inline uppercase hover:text-blue-700 md:text-md lg:text-xl">
                        <Link href="#introducao">Introdução</Link>
                    </li>
                    <li className="hidden md:inline uppercase hover:text-blue-700 md:text-md lg:text-xl"> 
                        <Link href="#diferenciais">
                            Diferenciais
                        </Link>
                    </li>
                    <li className="hidden md:inline uppercase hover:text-blue-700 md:text-md lg:text-xl">
                        <Link href="#sobre_nos">
                            Sobre nos
                        </Link>
                    </li>
                    <li className="hidden md:inline uppercase hover:text-blue-700 md:text-md lg:text-xl">
                        <Link href="#desenvolvedores">
                            Desenvolvedores
                        </Link>
                    </li>
                </div>
                <li><Link className="border p-1 border-blue-600 uppercase font-semibold hover:bg-blue-400 text-sm md:border-2 lg:p-2 lg:text-xl" href="/login">Area do Cliente</Link></li>
            </ul>
        </nav>
    </header>
  )
}