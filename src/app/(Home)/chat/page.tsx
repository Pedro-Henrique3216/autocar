'use client'
import { useEffect, useRef, useState } from 'react'
import Voltar from "@/imagem/icone_voltar.svg"
import type {
  ApiResponse,
  CadastroDiagnostico,
  ProcessedApiResponse,
  ProcessedOptionResponse,
  ProcessedTextResponse,
} from "@/type"

function processApiResponse(response: ApiResponse[]): ProcessedApiResponse[] {
  const responses = response
    .map(res => {
      if (res.response_type === 'text') {
        return {
          content: res.text.replaceAll('\n', '<br>'),
        } as ProcessedTextResponse
      }

      if (res.response_type === 'option') {
        return {
          options: res.options.map(opt => ({
            label: opt.label,
            value: opt.value.input.text,
          })),
        } as ProcessedOptionResponse
      }

      return undefined
    })
    .filter(
      (response): response is ProcessedApiResponse => response !== undefined
    )

  return responses
}
import { createSession, sendMessage } from '@/lib/watsonApi'
import { getFormattedTime } from '@/helper/format-message-timestamp'
import { Message } from './_components/message'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Chat(){

  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const [input, setInput] = useState<string>('')
  const [messages, setMessages] = useState<
    {
      text: string | ProcessedApiResponse[]
      fromUser: boolean
      timestamp: string
    }[]
  >([])
  const [diagnostico, setDiagnostico] = useState<CadastroDiagnostico>(
    {cd_automovel: 0, descricao: "", dt_inicio: "", cd_oficina: 0, peca: "", preco: 0, quantidade: 0}
  )
  const [oficinas, setOficinas] = useState<{id:0, nome:""}[]>([])
  const [oficina, setOficina] = useState(
    {id: 0}
  )
  const [selecionaOficina, setSelecionarOficina] = useState(false)
  const [cadastro, setCadastro] = useState(false)

  useEffect(() => {
    const initSession = async () => {
      const id = await createSession()
      setSessionId(id)
    }
    initSession()
  }, [])



  useEffect(() => {
    const sendWelcomeMessage = async () => {
      const welcomeMessage = await sendMessage(sessionId, 'diagnostico')
      const processWelcomeMessage = processApiResponse(welcomeMessage)

      setMessages([
        {
          text: processWelcomeMessage,
          fromUser: false,
          timestamp: getFormattedTime(),
        },
      ])
    }

    const timeoutId = setTimeout(() => {
      sendWelcomeMessage()
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [sessionId])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  function handleOptionComponent(value: string, id: number | null) {
    setInput(value)
    if (selecionaOficina && id) {
      setOficina({ id: id })
      setSelecionarOficina(false)
    }
    setTimeout(() => {
      submitButtonRef.current?.click()
    }, 100)
  }

  useEffect(
    () => {
        const chamadaApi = async () => {
            const response = await fetch(`https://meuprojeto.link/autodiag/api/oficina`)
            const data = await response.json()        
            const oficinas = []
            for(let i = 0; i < data.length; i++){
              const oficina = {
                id: data[i].id,
                nome: data[i].nome
              }  
              oficinas.push(oficina)
            }
            setOficinas(oficinas)
            
        }
        chamadaApi()
    }, [])

    const navigation = useRouter()

    const [pecaDesc, setPecaDesc] = useState({peca: "", descricao: ""})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return
    setInput('')

    const userInputTimeStamp = getFormattedTime()
    setMessages([
      ...messages,
      {
        text: input,
        fromUser: true,
        timestamp: userInputTimeStamp,
      },
    ])

    // msg to watson
    const responseAPI = await sendMessage(sessionId, input)
    const respTimeStamp = getFormattedTime()

    const precos = [
      {peca: "bateria", preco: 50, quantidade: 1},
      {peca: "ingnição", preco: 250, quantidade: 1},
      {peca: "radiador", preco: 250, quantidade: 1},
      {peca: "carburador", preco: 450, quantidade: 1},
      {peca: "cilindro mestre", preco: 300, quantidade: 1},
      {peca: "pneu", preco: 250, quantidade: 2},
      {peca: "escapamento", preco: 150, quantidade: 1},
      
    ]
    
    const resp: ProcessedApiResponse[] = processApiResponse(responseAPI)
    if (
      'content' in resp[0] &&
      resp[0].content ===
        'Seu carro tem um problema na bateria'
    ) {
    
     setPecaDesc({peca:"bateria", descricao:resp[0].content}) 
    } else if(
      'content' in resp[0] &&
      resp[0].content ===
        'O veiculo deve estar com problema na ingnição'
    ) {
      setPecaDesc({peca:"ingnição", descricao:resp[0].content}) 
     } else if(
      'content' in resp[0] &&
      resp[0].content ===
        'O seu veiculo pode estar superaquecendo, verifique o nível de agua do radiador'
    ) {
      setPecaDesc({peca:"radiador", descricao:resp[0].content}) 
     } else if(
      'content' in resp[0] &&
      resp[0].content ===
        'Pode ser um problema no carburador'
    ) {
      setPecaDesc({peca:"carburador", descricao:resp[0].content}) 
     } else if(
      'content' in resp[0] &&
      resp[0].content ===
        'O cilindro mestre esta com defeito'
    ) {
      setPecaDesc({peca:"cilindro mestre", descricao:resp[0].content}) 
     } else if(
      'content' in resp[0] &&
      resp[0].content ===
        'Se seu carro esta tremendo muito deve ser um problema no pneu'
    ) {
      setPecaDesc({peca:"pneu", descricao:resp[0].content}) 
     } else if(
      'content' in resp[0] &&
      resp[0].content ===
        'Se seu carro esta fazendo um barulho estranho deve ser o escapamento'
    ) {
      setPecaDesc({peca:"escapamento", descricao:resp[0].content}) 
     }
     
     if (resp.length > 1 && resp.length <= 3) {
      if (
        'content' in resp[2] &&
        resp[2].content.includes(
          "Finalizando diagnostico, escolha uma das oficinas listadas por sua preferencia"
        )
      ) { 
        resp.push({
          options: oficinas.map(w => {
            return { label: w.nome, value: w.nome, id: w.id }
          }),
        })
        setSelecionarOficina(true)
      } 
      } 
      if ('content' in resp[0] &&
        resp[0].content?.includes("Verificando se possive cadastrar diagnostico")) {
        const cd_automovel = Number(sessionStorage.getItem("cd_automovel"));
        const data = new Date().toLocaleDateString('pt-BR');
        const dados = precos.find(x => x.peca === pecaDesc.peca);
        setDiagnostico({
          cd_automovel,
          descricao: pecaDesc.descricao,
          dt_inicio: data,
          cd_oficina: oficina.id,
          peca: pecaDesc.peca,
          preco: dados ? dados.preco : 0,
          quantidade: dados ? dados.quantidade : 1
        })
        setCadastro(true)
    }
   
    setMessages([
      ...messages,
      {
        text: input,
        fromUser: true,
        timestamp: userInputTimeStamp,
      },
      {
        text: resp,
        fromUser: false,
        timestamp: respTimeStamp,
      },
    ])
  }

  useEffect(()=> {
    const cadastrar = async () => {
      try {
            const cabecalho = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "http://localhost:3000"
                },
                body: JSON.stringify(diagnostico)
            };
            
            const response = await fetch(`https://meuprojeto.link/autodiag/api/diagnostico`, cabecalho);
    
            if (response.ok) {
                const cd_automovel = sessionStorage.getItem("cd_automovel")
                sessionStorage.removeItem("cd_automovel")
                navigation.push(`/veiculo/${cd_automovel}`)
            } else{
                const data = await response.json()
                alert(data.error)
                window.location.reload()
            }
        } catch(error) {
        console.error(error)
        }
    }
    if(cadastro){
      cadastrar()
    }
  
}, [diagnostico])

  return (
    <div className='bg-slate-100 min-h-screen w-screen'>
      <Link href={"/cliente"} onClick={()=>sessionStorage.removeItem("cd_automovel")}><Image src={Voltar} alt="Seta de Voltar" className="w-14 my-5 md:w-20"/></Link>
      <h1 className='font-bold text-center text-5xl my-4'>
        Chat com Watson Assistant
      </h1>
      <div className='flex flex-col w-3/4 m-auto bg-slate-400 p-4 rounded-md'>
        <div className='flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 w-full max-h-[50vh]'>
          {messages.map((msg, index) => (
            <Message
              key={`${msg.timestamp}-${index}`}
              text={msg.text}
              fromUser={msg.fromUser}
              timestamp={msg.timestamp}
              setValue={handleOptionComponent}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* input */}
        <form
          onSubmit={handleSubmit}
          className='bg-white border-t-2 border-gray-200 p-4 mb-2 sm:mb-0'
        >
          <div className='relative flex'>
            <input
              type='text'
              placeholder='Write your message!'
              value={input}
              onChange={e => setInput(e.target.value)}
              className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3'
            />
            <div className='absolute right-0 items-center inset-y-0 hidden sm:flex'>
              <button
                type='submit'
                ref={submitButtonRef}
                className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
              >
                <span className='font-bold'>Send</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='h-6 w-6 ml-2 transform rotate-90'
                >
                  <title>Send SVG</title>
                  <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

}