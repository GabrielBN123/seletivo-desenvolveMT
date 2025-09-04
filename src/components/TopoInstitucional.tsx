"use client"

import { useEffect, useState } from "react"
import logo from "../assets/logo-pjc.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useFiltro } from "./FiltroContext"
import { buscarEstatisticas } from "../services/api"

export default function TopoInstitucional() {
  const location = useLocation()
  const navigate = useNavigate()
  const url = "https://abitus-api.geia.vip"
  const { mostrarFiltros, alternarFiltros, tema, alternarTema } = useFiltro()
  const isHome = location.pathname === "/"
  const isDetalhes = location.pathname.startsWith("/detalhes/")
  const isEnviar = location.pathname.startsWith("/enviar-informacoes/")
  const mostrarBotoes = isDetalhes || isEnviar
  const [estatisticas, setEstatisticas] = useState<{
    quantPessoasDesaparecidas: number
    quantPessoasEncontradas: number
  } | null>(null)

  const [mostrarSeletorTema, setMostrarSeletorTema] = useState(false)

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        const res = await buscarEstatisticas()
        setEstatisticas(res.data)
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err)
      }
    }

    carregarEstatisticas()
  }, [])

  const obterIconeTema = () => {
    if (tema === "system") return "🖥️"
    return tema === "dark" ? "🌙" : "☀️"
  }

  const obterTextoTema = () => {
    if (tema === "system") return "Sistema"
    return tema === "dark" ? "Escuro" : "Claro"
  }

  return (
    <header className="w-full text-gray-50 shadow-lg header-pjc-style" >
      {/* Top utility bar */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-sm">
          <div className="flex gap-6 items-center">
            <span className="font-medium">MT.GOV.BR</span>
            <Link to="#" className="hover:text-accent transition-colors">
              Contatos
            </Link>
          </div>
        </div>
      </div>

      {mostrarSeletorTema && <div className="fixed inset-0 z-40" onClick={() => setMostrarSeletorTema(false)} />}

      {/* Main header */}
      <div className="w-full bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <img src={logo || "/placeholder.svg"} alt="PJC-MT" className="h-20 w-auto" />
              <div className="text-center lg:text-left">
                <h1 className="text-2xl lg:text-3xl font-bold text-card-foreground leading-tight">
                  QUADRO DE PESSOAS DESAPARECIDAS
                </h1>
                <p className="text-lg text-muted-foreground font-medium mt-1">Polícia Judiciária Civil - Mato Grosso</p>
              </div>
            </div>
            <div className="text-center lg:text-right bg-accent/10 rounded-xl p-4">
              <p className="text-xl font-bold text-card-foreground">
                Denuncie: <span className="text-accent">197 / 181</span>
              </p>
              <p className="text-muted-foreground font-medium">3613-6981</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and stats */}
      <nav className="w-full bg-primary/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Navigation buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              {isHome && (
                <button
                  onClick={alternarFiltros}
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  {mostrarFiltros ? "Ocultar Filtros" : "Filtros de Busca"}
                </button>
              )}

              {mostrarBotoes && (
                <div className="flex gap-3">
                  <Link
                    to="/?pagina=1"
                    className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-medium transition-colors"
                  >
                    Página Inicial
                  </Link>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg font-medium transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              )}
            </div>

            {/* Statistics */}
            {estatisticas && (
              <div className="flex gap-4">
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-4 py-2 text-center min-w-[120px]">
                  <p className="text-xs font-medium uppercase tracking-wide">Desaparecidos</p>
                  <p className="text-2xl font-bold">{estatisticas.quantPessoasDesaparecidas}</p>
                </div>
                <div className="bg-accent/10 border border-accent/20 text-accent rounded-lg px-4 py-2 text-center min-w-[120px]">
                  <p className="text-xs font-medium uppercase tracking-wide">Localizados</p>
                  <p className="text-2xl font-bold">{estatisticas.quantPessoasEncontradas}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
