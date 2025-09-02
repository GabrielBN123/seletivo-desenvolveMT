"use client"

import { useState } from "react"
import Detalhes from "../pages/Detalhes"
import EnviarInformacoes from "../pages/EnviarInformacoes"
import { useParams } from "react-router-dom"

interface PessoaResponse {
  vivo: boolean
}

export default function ModalTabs() {
  const { id } = useParams()
  const [abaAtiva, setAbaAtiva] = useState<"detalhes" | "informacoes">("detalhes")

  return (
    <div className="w-full">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 pb-0">
        <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setAbaAtiva("detalhes")}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              abaAtiva === "detalhes"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <div className="flex dark:text-gray-50 items-center gap-2 text-light-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Detalhes
            </div>
          </button>

          <button
            onClick={() => setAbaAtiva("informacoes")}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              abaAtiva === "informacoes"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <div className="flex dark:text-gray-50 items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Enviar Informações
            </div>
          </button>
        </div>
      </div>

      <div className="p-6">
        {abaAtiva === "detalhes" && <Detalhes />}
        {abaAtiva === "informacoes" && id && <EnviarInformacoes />}
      </div>
    </div>
  )
}
