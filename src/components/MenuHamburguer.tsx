"use client"
import Link from "next/link";
import { useState } from "react";

export default function MenuHamburguer() {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <article className="menu">
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="menu-faketrigger absolute block z-[1000] w-5 h-8 opacity-0 cursor-pointer"/>
            <div className="h-8 w-5 block absolute z-[999] md:hidden">
                <span className={`w-8 mb-2 block h-1 bg-slate-500 rounded-sm transition ease-in-out duration-200 ${isChecked ? 'bg-[#222] rotate-45 scale-x-125 origin-top-left' : ''}`}></span>
                <span className={`w-8 mb-2 block h-1 bg-slate-500 rounded-sm transition ease-in-out duration-200 ${isChecked ? 'opacity-0' : ''}`}></span>
                <span className={`w-8 mb-2 block h-1 bg-slate-500 rounded-sm transition ease-in-out duration-200 ${isChecked ? 'bg-[#222] -rotate-45 scale-x-125 origin-bottom-left' : ''}`}></span>
            </div>
            <ul className={`block absolute z-[998] left-0 top-0 w-60 pt-20 bg-slate-500 -ml-72 transition ease-in-out duration-200 ${isChecked && "ml-0"}`}>
                <li className="p-1"><Link className="uppercase hover:text-blue-700 text-2xl m-0 block px-5 py-2 transition ease-in-out duration-300"  href="#introducao" onClick={() => setIsChecked(!isChecked)}>Introdução</Link></li>
                <li className="p-1"><Link className="uppercase hover:text-blue-700 text-2xl m-0 block px-5 py-2 transition ease-in-out duration-300" href="#diferenciais" onClick={() => setIsChecked(!isChecked)}>Diferenciais</Link></li>
                <li><Link className="uppercase hover:text-blue-700 text-2xl m-0 block px-5 py-2 transition ease-in-out duration-300"  href="#sobre_nos" onClick={() => setIsChecked(!isChecked)}>Sobre nos</Link></li>
            </ul>
        </article>
    )
}