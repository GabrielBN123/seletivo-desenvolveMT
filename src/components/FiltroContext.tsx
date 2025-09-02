"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface FiltroContextType {
  mostrarFiltros: boolean
  alternarFiltros: () => void
  tema: "light" | "dark" | "system"
  alternarTema: (novoTema: "light" | "dark" | "system") => void
}

const FiltroContext = createContext<FiltroContextType>({
  mostrarFiltros: false,
  alternarFiltros: () => {},
  tema: "system",
  alternarTema: () => {},
})

export const useFiltro = () => useContext(FiltroContext)

export function FiltroProvider({ children }: { children: React.ReactNode }) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [tema, setTema] = useState<"light" | "dark" | "system">(() => {
    const temaArmazenado = localStorage.getItem("tema")
    return (temaArmazenado as "light" | "dark" | "system") || "system"
  })

  useEffect(() => {
    const aplicarTema = () => {
		const root = document.documentElement

		if (tema === "system") {
			const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches
			root.classList.toggle("dark", prefereEscuro)
		} else {
			root.classList.toggle("dark", tema === "dark")
		}
    }

    aplicarTema()
    localStorage.setItem("tema", tema)

    if (tema === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", aplicarTema)
      return () => mediaQuery.removeEventListener("change", aplicarTema)
    }
  }, [tema])

  const alternarFiltros = () => {
    setMostrarFiltros((prev) => {
      const proximoEstado = !prev

      if (proximoEstado) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 100)
      }

      return proximoEstado
    })
  }

  const alternarTema = (novoTema: "light" | "dark" | "system") => {
    setTema(novoTema)
  }

  return (
    <FiltroContext.Provider value={{ mostrarFiltros, alternarFiltros, tema, alternarTema }}>
      {children}
    </FiltroContext.Provider>
  )
}
