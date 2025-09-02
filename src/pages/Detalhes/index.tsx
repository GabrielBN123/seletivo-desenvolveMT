"use client"

import { useParams, Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { buscarDetalhesPessoa, buscarInformacoesDesaparecido } from "../../services/api"
import ImagemComFallback from "../../components/ImagemComFallBack"

interface DetalhesPessoa {
  id: number
  nome: string
  idade: number
  sexo: string
  vivo: boolean
  urlFoto: string
  ultimaOcorrencia: {
    dtDesaparecimento: string
    localDesaparecimentoConcat: string
    ocoId: number
    dataLocalizacao: string
    encontradoVivo: boolean
    ocorrenciaEntrevDesapDTO: {
      informacao: string
      vestimentasDesaparecido: string
    }
    listaCartaz: {
      urlCartaz: string
      tipoCartaz: string
    }[]
  }
}

interface InfoEnviada {
  ocoId: number
  informacao: string
  data: string
  id: number
  anexos: string[]
}

export default function Detalhes() {
  const { id } = useParams()
  const location = useLocation()
  const paginaAnterior = location.state?.paginaAtual || 1
  const [dados, setDados] = useState<DetalhesPessoa | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [mostrarInfos, setMostrarInfos] = useState(false)
  const [informacoes, setInformacoes] = useState<InfoEnviada[]>([])

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        const res = await buscarDetalhesPessoa(id!)
        if (!res.data || !res.data.id) {
          setErro("Pessoa não encontrada.")
        } else {
          setDados(res.data)
          setErro(null)
        }
      } catch (err) {
        console.error("Erro ao buscar pessoa:", err)
        setErro("Ocorreu um erro ao carregar os dados.")
      }
    }

    if (id) carregarDetalhes()
  }, [id])

  useEffect(() => {
    if (erro) {
      const timeout = setTimeout(() => {
        window.location.href = "/"
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [erro])

  const carregarInformacoesEnviadas = async () => {
    try {
      const res = await buscarInformacoesDesaparecido(dados?.ultimaOcorrencia.ocoId!)
      setInformacoes(res.data)
      setMostrarInfos(true)
    } catch (err) {
      console.error("Erro ao carregar informações enviadas:", err)
    }
  }

  const { nome, idade, sexo, vivo, urlFoto, ultimaOcorrencia } = dados || {}

  return (
    <div className="w-full dark:text-gray-50">
      <div className="max-w-full">
        {!dados ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground text-lg">Carregando informações...</p>
          </div>
        ) : erro ? (
          <div className="p-6 text-center">
            <p className="text-red-600 font-semibold text-lg mb-4">❌ {erro}</p>
            <p className="text-gray-500 mb-6">Você será redirecionado automaticamente em 5 segundos...</p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Voltar para a página inicial
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-1">
                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                  <ImagemComFallback
                    src={urlFoto || "/placeholder.svg"}
                    alt={nome || ""}
                    destaqueStatus={vivo ? "Vivo" : "Morto"}
                    className="w-full h-[300px] xl:h-[400px] object-cover rounded-xl"
                  />
                  <div className="mt-4 text-center">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        vivo
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${vivo ? "bg-green-500" : "bg-red-500"}`}></div>
                      {vivo ? "Localizado(a)" : "Desaparecido(a)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-2 space-y-4">
                <div className="mb-4">
                  <h1 className="text-2xl xl:text-3xl font-bold text-foreground">{nome || "Carregando..."}</h1>
                </div>

                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-card-foreground mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Informações Pessoais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                      <p className="text-card-foreground font-medium">{nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Idade</label>
                      <p className="text-card-foreground font-medium">{idade} anos</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Sexo</label>
                      <p className="text-card-foreground font-medium">{sexo}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-card-foreground mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Informações do Desaparecimento
                  </h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Data do Desaparecimento</label>
                        <p className="text-card-foreground font-medium">
                          {ultimaOcorrencia?.dtDesaparecimento
                            ? new Date(ultimaOcorrencia.dtDesaparecimento).toLocaleDateString("pt-BR")
                            : "Carregando..."}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Local</label>
                        <p className="text-card-foreground font-medium">
                          {ultimaOcorrencia?.localDesaparecimentoConcat}
                        </p>
                      </div>
                    </div>

                    {ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Vestimentas</label>
                        <p className="text-card-foreground text-sm">
                          {ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                        </p>
                      </div>
                    )}

                    {ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Informações Adicionais</label>
                        <p className="text-card-foreground text-sm">
                          {ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {ultimaOcorrencia?.listaCartaz?.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                <h2 className="text-lg font-semibold text-card-foreground mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Cartazes Disponíveis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ultimaOcorrencia?.listaCartaz.map((cartaz, i) => (
                    <a
                      key={i}
                      href={cartaz.urlCartaz}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-accent/5 hover:bg-accent/10 border border-accent/20 rounded-lg transition-colors group"
                    >
                      <svg
                        className="w-4 h-4 text-accent flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-card-foreground font-medium group-hover:text-accent transition-colors text-sm">
                        {cartaz.tipoCartaz}
                      </span>
                      <svg
                        className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {ultimaOcorrencia?.ocoId && (
              <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2m5-4v2a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2h4a2 2 0 012 2z"
                      />
                    </svg>
                    Informações da Comunidade
                  </h2>
                  <button
                    onClick={() => {
                      if (mostrarInfos) {
                        setMostrarInfos(false)
                      } else {
                        carregarInformacoesEnviadas()
                      }
                    }}
                    className="px-3 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={mostrarInfos ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                    {mostrarInfos ? "Ocultar" : "Ver Informações"}
                  </button>
                </div>

                {mostrarInfos && (
                  <div className="border-t border-border pt-3">
                    {informacoes.length > 0 ? (
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {informacoes.map((info) => (
                          <div key={info.id} className="bg-muted/30 border border-border/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-accent">
                                {new Date(info.data).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            <p className="text-card-foreground text-sm">{info.informacao}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <svg
                          className="w-8 h-8 text-muted-foreground mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-muted-foreground text-sm">
                          Nenhuma informação foi enviada pela comunidade ainda.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
              {ultimaOcorrencia?.encontradoVivo != null ? (
                <div className="text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-base font-semibold text-green-800 dark:text-green-200 mb-1">
                      Pessoa Localizada
                    </h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Agradecemos a todos que colaboraram com informações. Esta pessoa já foi localizada.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Link
                    to={`/enviar-informacoes/${id}`}
                    state={{ backgroundLocation: location }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Enviar Informações
                  </Link>
                  <p className="text-muted-foreground text-xs mt-2">
                    Tem informações sobre esta pessoa? Ajude-nos a localizá-la.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
