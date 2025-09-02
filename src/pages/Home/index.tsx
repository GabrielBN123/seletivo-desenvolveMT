"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useFiltro } from "../../components/FiltroContext"
import CardDesaparecido from "../../components/CardDesaparecido"
import { buscarPessoasDesaparecidas } from "../../services/api"
import { ChevronDownIcon } from "@heroicons/react/16/solid"
import { TrashIcon } from "@heroicons/react/24/outline"

interface PessoaDesaparecida {
  id: number
  nome: string
  idade: number
  sexo: string
  vivo: boolean
  urlFoto: string
  ultimaOcorrencia: {
    dtDesaparecimento: string
    localDesaparecimentoConcat: string
    dataLocalizacao: string
    encontradoVivo: boolean
  }
}

export default function Home() {
  const [searchParams] = useSearchParams()
  const paginaInicial = Number(searchParams.get("pagina")) || 1
  const [numeroPagina, setNumeroPagina] = useState(paginaInicial - 1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [totalElementos, setTotalElementos] = useState(0)
  const itensPorPagina = 10
  const [lista, setLista] = useState<PessoaDesaparecida[]>([])
  const { mostrarFiltros, alternarFiltros } = useFiltro()
  const [filtros, setFiltros] = useState({
    nome: "",
    sexo: "",
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    status: "DESAPARECIDO",
  })

  useEffect(() => {
    const carregarDesaparecidos = async () => {
      try {
        const res = await buscarPessoasDesaparecidas(numeroPagina, filtros)
        setLista(res.data.content || [])
        setTotalPaginas(res.data.totalPages || 0)
        setTotalElementos(res.data.totalElements || 0)
      } catch (err) {
        console.error("Erro ao carregar desaparecidos:", err)
      }
    }

    carregarDesaparecidos()
  }, [numeroPagina, JSON.stringify(filtros)])

  useEffect(() => {
    const carregarDesaparecidos = async () => {
      try {
        const res = await buscarPessoasDesaparecidas(0, filtros)
        setLista(res.data.content || [])
        setTotalPaginas(res.data.totalPages || 0)
        setTotalElementos(res.data.totalElements || 0)
      } catch (err) {
        console.error("Erro ao carregar desaparecidos:", err)
      }
    }
    setNumeroPagina(0)
    carregarDesaparecidos()
  }, [JSON.stringify(filtros)])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Modal */}
        {mostrarFiltros && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
            <div className="bg-gray-50 border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground">Filtros de Busca</h2>
                  <button onClick={alternarFiltros} className="p-2 hover:bg-muted rounded-full transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Nome */}
                  <div className="md:col-span-2 lg:col-span-4">
                    <label htmlFor="nome" className="block text-sm font-medium text-card-foreground mb-2">
                      Nome da Pessoa
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      value={filtros.nome}
                      placeholder="Digite o nome..."
                      onChange={(e) => setFiltros((prev) => ({ ...prev, nome: e.target.value }))}
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Sexo */}
                  <div className="md:col-span-1 lg:col-span-2">
                    <label htmlFor="sexo" className="block text-sm font-medium text-card-foreground mb-2">
                      Sexo
                    </label>
                    <div className="relative">
                      <select
                        id="sexo"
                        name="sexo"
                        value={filtros.sexo}
                        onChange={(e) => setFiltros((prev) => ({ ...prev, sexo: e.target.value }))}
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors appearance-none"
                      >
                        <option value="">Todos</option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Idade Mínima */}
                  <div>
                    <label htmlFor="faixaIdadeInicial" className="block text-sm font-medium text-card-foreground mb-2">
                      Idade Mínima
                    </label>
                    <input
                      id="faixaIdadeInicial"
                      name="faixaIdadeInicial"
                      type="number"
                      value={filtros.faixaIdadeInicial}
                      placeholder="0"
                      onChange={(e) => setFiltros((prev) => ({ ...prev, faixaIdadeInicial: Number(e.target.value) }))}
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Idade Máxima */}
                  <div>
                    <label htmlFor="faixaIdadeFinal" className="block text-sm font-medium text-card-foreground mb-2">
                      Idade Máxima
                    </label>
                    <input
                      id="faixaIdadeFinal"
                      name="faixaIdadeFinal"
                      type="number"
                      value={filtros.faixaIdadeFinal}
                      placeholder="100"
                      onChange={(e) => setFiltros((prev) => ({ ...prev, faixaIdadeFinal: Number(e.target.value) }))}
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Status */}
                  <div className="md:col-span-1 lg:col-span-2">
                    <label htmlFor="status" className="block text-sm font-medium text-card-foreground mb-2">
                      Situação
                    </label>
                    <div className="relative">
                      <select
                        id="status"
                        name="status"
                        value={filtros.status}
                        onChange={(e) => setFiltros((prev) => ({ ...prev, status: e.target.value }))}
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors appearance-none"
                      >
                        <option value="">Todas as situações</option>
                        <option value="LOCALIZADO">Localizado</option>
                        <option value="DESAPARECIDO">Desaparecido</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => {
                      setFiltros({
                        nome: "",
                        sexo: "",
                        faixaIdadeInicial: 0,
                        faixaIdadeFinal: 0,
                        status: "DESAPARECIDO",
                      })
                      setNumeroPagina(0)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 rounded-lg font-medium transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Limpar Filtros
                  </button>
                  <button
                    onClick={alternarFiltros}
                    className="ml-auto px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {filtros.status ? `Pessoas ${filtros.status.toLowerCase()}s` : "Todas as Pessoas"}
          </h1>
          <p className="text-muted-foreground">
            {totalElementos} {totalElementos === 1 ? "registro encontrado" : "registros encontrados"}
          </p>
        </div>

        {/* Results grid */}
        {lista.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground text-lg">Carregando dados...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {lista.map((d) => (
              <CardDesaparecido
                key={d.id}
                id={d.id}
                nome={d.nome}
                foto={d.urlFoto}
                situacao={filtros.status}
                situacaoAtualVivoMorto={d.vivo}
                dataDesaparecimento={d.ultimaOcorrencia?.dtDesaparecimento ?? ""}
                dataLocalizacao={d.ultimaOcorrencia?.dataLocalizacao ?? null}
                encontradoVivo={d.ultimaOcorrencia?.encontradoVivo ?? false}
                paginaAtual={numeroPagina + 1}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="flex items-center gap-4">
            <button
              className="px-6 py-3 bg-card hover:bg-muted border border-border rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={numeroPagina === 0}
              onClick={() => setNumeroPagina((p) => p - 1)}
            >
              ← Anterior
            </button>
            <div className="px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold">
              Página {numeroPagina + 1} de {totalPaginas}
            </div>
            <button
              className="px-6 py-3 bg-card hover:bg-muted border border-border rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={numeroPagina + 1 >= totalPaginas}
              onClick={() => setNumeroPagina((p) => p + 1)}
            >
              Próxima →
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Exibindo {numeroPagina * itensPorPagina + 1} a{" "}
            {Math.min((numeroPagina + 1) * itensPorPagina, totalElementos)} de {totalElementos} registros
          </p>
        </div>
      </div>
    </div>
  )
}
