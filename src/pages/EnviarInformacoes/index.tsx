"use client"

import { useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { enviarInformacao, buscarDetalhesPessoa } from "../../services/api"

export default function EnviarInformacoes() {
  const { id } = useParams()
  const [informacao, setInformacao] = useState("")
  const [descricao, setDescricao] = useState("")
  const [local, setLocal] = useState("")
  const [data, setData] = useState("")
  const [foto, setFoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [anexosBase64, setAnexosBase64] = useState<string[]>([])
  const [ocoId, setOcoId] = useState<number | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [formValido, setFormValido] = useState(false)

  useEffect(() => {
    if (id) {
      buscarDetalhesPessoa(id)
        .then((res) => {
          // console.log("Pessoa retornada:", res.data);
          setOcoId(res.data?.ultimaOcorrencia?.ocoId ?? null)
        })
        .catch((err) => {
          console.error("Erro ao buscar dados:", err)
        })
    }
  }, [id])

  useEffect(() => {
    const infoValida = informacao.trim().length >= 10
    const descValida = descricao.trim().length >= 10
    // const localValido = local.trim().length > 0;
    const dataValida = data.trim().length > 0

    setFormValido(infoValida && descValida && dataValida)
  }, [informacao, descricao, data])

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFoto(file)
      setPreview(URL.createObjectURL(file))

      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          const base64 = (reader.result as string).split(",")[1]
          setAnexosBase64([base64]);
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCarregando(true)

    if (!ocoId) {
      setMensagem("Ocorreu um erro ao carregar os dados da ocorrência.")
      setCarregando(false)
      return
    }

    if (informacao.trim().length < 10 || !descricao || !data) {
      setMensagem("Preencha todos os campos obrigatórios corretamente.")
      setCarregando(false)
      return
    }

    const formData = new FormData()
    formData.append("informacao", informacao)
    formData.append("descricao", descricao)
    formData.append("data", data)
    formData.append("ocoId", ocoId.toString())

    anexosBase64.forEach((base64, i) => {
      formData.append(`anexos[${i}]`, base64)
    })

    try {
      await enviarInformacao(formData)
      setMensagem("Informações enviadas com sucesso!")
      setInformacao("")
      setDescricao("")
      setData("")
      setFoto(null)
      setPreview(null)
      setAnexosBase64([])
    } catch (error) {
      console.error(error)
      setMensagem("Erro ao enviar as informações.")
    } finally {
      setCarregando(false)
    }
  }

  const removePhoto = () => {
    setFoto(null)
    setPreview(null)
    setAnexosBase64([])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Início
            </Link>
            <span>•</span>
            <span>Enviar Informações</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Enviar Informações</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Compartilhe informações que possam ajudar na localização desta pessoa
          </p>
        </div>

        {mensagem && (
          <div
            className={`mb-6 p-4 rounded-lg border-l-4 ${
              mensagem === "Informações enviadas com sucesso!"
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-200"
                : mensagem === "Erro ao enviar as informações."
                  ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200"
                  : "bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-800 dark:text-amber-200"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 mr-3 ${
                  mensagem === "Informações enviadas com sucesso!"
                    ? "text-emerald-500"
                    : mensagem === "Erro ao enviar as informações."
                      ? "text-red-500"
                      : "text-amber-500"
                }`}
              >
                {mensagem === "Informações enviadas com sucesso!" ? (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : mensagem === "Erro ao enviar as informações." ? (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="font-medium">{mensagem}</span>
            </div>
          </div>
        )}

        {carregando && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-800 dark:text-blue-200 font-medium">Enviando informações... aguarde</span>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="informacao">
                Informação *
              </label>
              <textarea
                id="informacao"
                value={informacao}
                onChange={(e) => setInformacao(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                placeholder="Descreva detalhadamente as informações que você possui sobre esta pessoa..."
                rows={4}
                required
                minLength={10}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mínimo de 10 caracteres ({informacao.length}/10)
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="descricao">
                Descrição do Anexo *
              </label>
              <input
                type="text"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Descreva o que mostra a imagem ou documento anexado..."
                required
                minLength={10}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mínimo de 10 caracteres ({descricao.length}/10)
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="data">
                Data da Ocorrência *
              </label>
              <input
                type="date"
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Anexar Fotografia (opcional)
              </label>

              {!preview ? (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-primary-400 dark:hover:border-primary-500 transition-colors">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 text-slate-400 dark:text-slate-500">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <label
                        htmlFor="foto"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
                      >
                        Selecionar Imagem
                      </label>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">PNG, JPG até 10MB</p>
                    </div>
                  </div>
                  <input type="file" id="foto" accept="image/*" onChange={handleFotoChange} className="hidden" />
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview da foto"
                      className="w-24 h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Imagem selecionada</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{foto?.name}</p>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!formValido || carregando}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  formValido && !carregando
                    ? "bg-primary-600 hover:bg-primary-700 dark:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                }`}
              >
                {carregando ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  "Enviar Informações"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Como posso ajudar?</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Forneça informações detalhadas e precisas
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Anexe fotos ou documentos que possam ajudar na identificação
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Seja específico sobre local, data e circunstâncias
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Todas as informações são tratadas com confidencialidade
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
