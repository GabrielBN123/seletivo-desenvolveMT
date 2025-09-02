"use client"

import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import ImagemComFallback from "./ImagemComFallBack"

interface MissingPersonCardProps {
  id: number
  nome: string
  foto: string
  situacao: string
  dataDesaparecimento: string
  dataLocalizacao: string
  encontradoVivo: boolean
  paginaAtual: number
  situacaoAtualVivoMorto: boolean
}

export default function MissingPersonCard({
  id,
  nome,
  foto,
  situacao,
  dataDesaparecimento,
  paginaAtual,
  situacaoAtualVivoMorto,
  dataLocalizacao,
  encontradoVivo,
}: MissingPersonCardProps) {
  const location = useLocation()

  useEffect(() => {
    if (id) {
      console.log(`[v0] Would fetch details for person ID: ${id}`)
    }
  }, [id])

  const diasDesaparecido = Math.floor(
    (new Date().getTime() - new Date(dataDesaparecimento).getTime()) / (1000 * 3600 * 24),
  )

  const getStatusConfig = () => {
    if (dataLocalizacao || encontradoVivo) {
      return {
        bg: "bg-green-25 hover:bg-green-100",
        badge: "bg-green-500 text-green-foreground",
        border: "border-green-700 hover:border-green-40",
        text: encontradoVivo ? "ENCONTRADO VIVO" : "ENCONTRADO",
        icon: "✓",
      }
    }
    return {
      bg: "bg-red-25 hover:bg-red-100",
      badge: "bg-red-500 text-destructive-foreground",
      border: "border-red-700 hover:border-destructive/40",
      text: "DESAPARECIDO",
      icon: "⚠",
    }
  }

  const statusConfig = getStatusConfig()

  const handleClick = () => {
    console.log(`[v0] Would navigate to /detalhes/${id} with paginaAtual: ${paginaAtual}`)
  }

  return (
    <Link to={`/detalhes/${id}`} state={{ backgroundLocation: location, paginaAtual }}>
      <div
        className={`group relative overflow-hidden rounded-2xl border-2 ${statusConfig.border} ${statusConfig.bg} shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-card`}
        onClick={handleClick}
      >
        {/* Image container */}
        <div className="relative h-64 overflow-hidden">
          <ImagemComFallback
            src={foto || "/placeholder.svg"}
            alt={nome || ""}
            destaqueStatus={encontradoVivo ? "Vivo" : "Morto"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Status badge */}
          <div className={`absolute top-4 right-4 px-3 py-2 rounded-full text-xs font-bold ${statusConfig.badge} shadow-lg flex items-center gap-1`}>
            <span>{statusConfig.icon}</span>
            {statusConfig.text}
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl font-bold text-white drop-shadow-lg text-balance leading-tight">{nome}</h2>
          </div>
        </div>

        {/* Card content */}
        <div className="p-6 space-y-4 bg-card">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1h-2"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">Desaparecimento</p>
                <p className="text-base font-semibold text-card-foreground">
                  {new Date(dataDesaparecimento).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">Tempo decorrido</p>
                <p className="text-base font-semibold text-card-foreground">
                  {diasDesaparecido} {diasDesaparecido === 1 ? "dia" : "dias"}
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-accent font-medium text-sm group-hover:text-accent/80 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Ver detalhes completos
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-secondary/0 group-hover:from-accent/5 group-hover:to-secondary/5 transition-all duration-300 pointer-events-none rounded-2xl" />
      </div>
    </Link>
  )
}
