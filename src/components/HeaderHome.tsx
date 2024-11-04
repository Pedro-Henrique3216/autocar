"use client"
import Image from "next/image";
import portoLogo from "@/imagem/logo_porto.webp"
import { useRouter } from "next/navigation";

export default function HeaderHome() {

    const router = useRouter()

    const click = () => {
      sessionStorage.removeItem("id")
      router.replace("/")
    }

  return(
    <header className="flex justify-between border-2 border-b-black bg-blue-200">
        <Image className="w-52 md:w-60" src={portoLogo} alt="logo da porto" />
        <button className="mr-4 font-bold text-3xl hover:text-blue-700" onClick={click}>Logout</button>
    </header>
  )
}