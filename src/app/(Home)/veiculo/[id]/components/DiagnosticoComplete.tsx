import { DiagnosticoComplete } from "@/type";

export default function DiagnoticoComplete({ id, descricao, dt_inicio, cd_automovel, status, cd_oficina, dt_fim, nome, preco, quantidade, valorTotal}: DiagnosticoComplete ) {
  return(
    <div >
      <h2 className="text-xl font-bold mb-4">Detalhes do Diagnóstico</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Descrição:</strong> {descricao}</p>
      <p><strong>Data de Início:</strong> {dt_inicio}</p>
      <p><strong>Código do Automóvel:</strong> {cd_automovel}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Código da Oficina:</strong> {cd_oficina}</p>
      <p><strong>Data de Fim:</strong> {dt_fim}</p>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Preço:</strong> R$ {preco}</p>
      <p><strong>Quantidade:</strong> {quantidade}</p>
      <p><strong>Valor Total:</strong> R$ {valorTotal}</p>
    </div>
  )
}