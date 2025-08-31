import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFiltro } from "../../components/FiltroContext";
import CardDesaparecido from "../../components/CardDesaparecido";
import { buscarPessoasDesaparecidas} from "../../services/api";
import { ChevronDownIcon } from '@heroicons/react/16/solid'


interface PessoaDesaparecida {
    id: number;
    nome: string;
    idade: number;
    sexo: string;
    vivo: boolean;
    urlFoto: string;
    ultimaOcorrencia: {
        dtDesaparecimento: string;
        localDesaparecimentoConcat: string;
        dataLocalizacao: string,
    };
}

export default function Home() {
    const [searchParams] = useSearchParams();
    const paginaInicial = Number(searchParams.get("pagina")) || 1;
    const [numeroPagina, setNumeroPagina] = useState(paginaInicial - 1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalElementos, setTotalElementos] = useState(0);
    const itensPorPagina = 10;
    const [lista, setLista] = useState<PessoaDesaparecida[]>([]);
    const { mostrarFiltros, alternarFiltros } = useFiltro();
    const [filtros, setFiltros] = useState({
        nome: "",
        sexo: "",
        faixaIdadeInicial: 0,
        faixaIdadeFinal: 0,
        status:"DESAPARECIDO"
    });

    useEffect(() => {
        const carregarDesaparecidos = async () => {
            try {
                const res = await buscarPessoasDesaparecidas(numeroPagina, filtros);
                setLista(res.data.content || []);
                setTotalPaginas(res.data.totalPages || 0);
                setTotalElementos(res.data.totalElements || 0);
            } catch (err) {
                console.error("Erro ao carregar desaparecidos:", err);
            }
        };

        carregarDesaparecidos();
    }, [numeroPagina, JSON.stringify(filtros)]);

    useEffect(() => {
        const carregarDesaparecidos = async () => {
            try {
                const res = await buscarPessoasDesaparecidas(0, filtros);
                setLista(res.data.content || []);
                setTotalPaginas(res.data.totalPages || 0);
                setTotalElementos(res.data.totalElements || 0);
            } catch (err) {
                console.error("Erro ao carregar desaparecidos:", err);
            }
        };
        setNumeroPagina(0)
        carregarDesaparecidos();
    }, [JSON.stringify(filtros)]);

    return (
        <div className="p-4 max-w-7xl mx-auto">

            {/* <div className="mb-6 flex flex-col sm:flex-row items-center gap-2">
                <input
                    type="text"
                    placeholder="Nome"
                    className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto flex-1"
                    value={filtros.nome}
                    onChange={(e) =>
                        setFiltros((prev) => ({ ...prev, nome: e.target.value }))
                    }
                />
                <button
                    onClick={() => setNumeroPagina(0)}
                    className="bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white px-4 py-2 transition"
                >
                    Buscar
                </button>
                <button
                    onClick={() => {
                        setFiltros({ nome: "", sexo: "",faixaIdadeInicial: 0, faixaIdadeFinal: 0,status:"" });
                        setNumeroPagina(0);
                    }}
                    className="bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white px-4 py-2 transition"
                >
                    Limpar Filtros
                </button>
            </div> */}

            {mostrarFiltros && (
                <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 backdrop-blur-sm bg-black/30">
                    <div className="bg-white dark:bg-gray-900 rounded shadow-lg w-full max-w-2xl p-6 relative">
                        <h2 className="text-xl font-bold mb-4">Filtrar por:</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="sm:col-span-4">
                                <label htmlFor="nome" className="text-left block text-sm/6 font-medium text-gray-900 dark:text-white">
                                    Nome
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    autoComplete="nome"
                                    value={filtros.nome}
                                    placeholder="Nome"
                                    onChange={(e) =>
                                        setFiltros((prev) => ({ ...prev, nome: e.target.value }))
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="sexo" className="text-left block text-sm/6 font-medium text-gray-900 dark:text-white">
                                    Sexo
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                    id="sexo"
                                    name="sexo"
                                    autoComplete="sexo"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                                    value={filtros.sexo}
                                    onChange={(e) =>
                                        setFiltros((prev) => ({ ...prev, sexo: e.target.value }))
                                    }
                                    >
                                    <option value="">Selecione uma opção</option>
                                    <option value="MASCULINO">Masculino</option>
                                    <option value="FEMININO">Feminino</option>
                                    </select>
                                    <ChevronDownIcon aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="faixaIdadeInicial" className="text-left block text-sm/6 font-medium text-gray-900 dark:text-white">
                                    Idade mínima
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="faixaIdadeInicial"
                                    name="faixaIdadeInicial"
                                    type="number"
                                    autoComplete="faixaIdadeInicial"
                                    value={filtros.faixaIdadeInicial}
                                    placeholder="Idade mínima"
                                    onChange={(e) =>
                                        setFiltros((prev) => ({ ...prev, idadeMin: e.target.value }))
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="faixaIdadeFinal" className="text-left block text-sm/6 font-medium text-gray-900 dark:text-white">
                                    Idade máxima
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="faixaIdadeFinal"
                                    name="faixaIdadeFinal"
                                    type="number"
                                    autoComplete="faixaIdadeFinal"
                                    value={filtros.faixaIdadeFinal}
                                    placeholder="Idade máxima"
                                    onChange={(e) =>
                                        setFiltros((prev) => ({ ...prev, idadeMax: e.target.value }))
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    />
                                </div>
                            </div>
                            

                            <div className="sm:col-span-2">
                                <label htmlFor="status" className="text-left block text-sm/6 font-medium text-gray-900 dark:text-white">
                                    Situação
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                    id="status"
                                    name="status"
                                    autoComplete="status"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                                    value={filtros.status}
                                    onChange={(e) =>
                                        setFiltros((prev) => ({ ...prev, status: e.target.value }))
                                    }
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="LOCALIZADO">LOCALIZADO</option>
                                        <option value="DESAPARECIDO">DESAPARECIDO</option>
                                    </select>
                                    <ChevronDownIcon aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2 flex-wrap">
                            {/* <button
                                onClick={() => setNumeroPagina(0)}
                                className="bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white px-4 py-2 transition"
                            >
                                Buscar
                            </button> */}
                            <button
                                onClick={() => {
                                    setFiltros({ nome: "", sexo: "",faixaIdadeInicial: 0,faixaIdadeFinal: 0,status:"DESAPARECIDO" });
                                    setNumeroPagina(0);
                                }}
                                className="bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white px-4 py-2 transition"
                            >
                                Limpar Filtros
                            </button>
                            <button
                                onClick={alternarFiltros}
                                className="ml-auto text-sm text-gray-500 hover:text-red-500"
                            >
                                Fechar Filtros ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className=" dark:text-white px-4 py-3 transition ext-xl font-bold mb-4">
                {filtros.status + "S"}
            </div>
            {lista.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">Carregando dados...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {lista.map((d) => (
                        <CardDesaparecido
                            key={d.id}
                            id={d.id}
                            nome={d.nome}
                            foto={d.urlFoto}
                            situacao={filtros.status}
                            situacaoAtualVivoMorto={d.vivo}
                            dataDesaparecimento={d.ultimaOcorrencia?.dtDesaparecimento ?? ""}
                            paginaAtual={numeroPagina + 1}
                        />
                    ))}
                </div>
            )}

            <div className="mt-6 flex flex-col items-center gap-2">
                <div className="flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white"
                        disabled={numeroPagina === 0}
                        onClick={() => setNumeroPagina((p) => p - 1)}
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 font-semibold text-gray-800 dark:text-white">
                        Página {numeroPagina + 1} de {totalPaginas}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 dark:text-white"
                        disabled={numeroPagina + 1 >= totalPaginas}
                        onClick={() => setNumeroPagina((p) => p + 1)}
                    >
                        Próxima
                    </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    Exibindo {numeroPagina * itensPorPagina + 1} a {Math.min((numeroPagina + 1) * itensPorPagina, totalElementos)} de {totalElementos} registros
                </div>
            </div>
        </div>
    );
}