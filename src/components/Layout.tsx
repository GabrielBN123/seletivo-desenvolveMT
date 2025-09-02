import type React from "react"
import TopoInstitucional from "./TopoInstitucional"
import RodapeInstitucional from "./RodapeInstitucional"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <TopoInstitucional />
      <main className="min-h-screen bg-background">{children}</main>
      <RodapeInstitucional />
    </div>
  )
}
