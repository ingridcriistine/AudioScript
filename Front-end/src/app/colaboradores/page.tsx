"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { Colaborador, Linha } from "@/components/tabelaColaboradores";
import Image from "next/image";
import search from "@/assets/search.png"
import searchBlack from "@/assets/search-black.png"
import add from "@/assets/add.png";
import { useEffect, useState } from "react";

export default function Colaboradores() {

    const [modal, setModal] = useState(false);
    const [nomeColaborador, setNomeColaborador] = useState("");
    const [codColaborador, setCodColaborador] = useState("");
    const [emailColaborador, setEmailColaborador] = useState("");
    const [error, setError] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [termoBusca, setTermoBusca] = useState("");
    const [idAdm, setIdAdm] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedId = localStorage.getItem('Id');
            setIdAdm(storedId);
        }
    }, []);

    useEffect(() => {
        const updateTheme = () => {
            const storedTheme = localStorage.getItem('theme');
            console.log("Evento 'themeChanged' capturado. Novo tema:", storedTheme);
            if (storedTheme !== null) {
                try {
                    const parsedTheme = JSON.parse(storedTheme);
                    setIsDarkMode(parsedTheme);
                } catch (error) {
                    console.error("Erro ao fazer parse do tema no localStorage:", error);
                    setIsDarkMode(false);
                }
            }
        };

        updateTheme();
        window.addEventListener("themeChanged", updateTheme);

        return () => window.removeEventListener("themeChanged", updateTheme);
    }, []);

    const closeModal = () => {
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
    }

    const [todosColaboradores, setTodosColaboradores] = useState<Linha[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!idAdm) return;

                const response = await fetch(`http://localhost:5000/users/${idAdm}`);
                if (!response.ok) throw new Error("Falha ao buscar dados.");

                const data = await response.json();
                setTodosColaboradores(data);
            } catch (err) {
                console.error("Erro ao buscar colaboradores", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idAdm]);



    const Cadastrar = async () => {
        try {
            const response = await fetch('http://localhost:5000/cadastraFunc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomeColaborador: nomeColaborador,
                    codColaborador: codColaborador,
                    emailColaborador: emailColaborador,
                    idAdm: idAdm,
                }),
            });

            const result = await response.json();

            if (response.status > 400 && response.status < 500) {
                setError(true)
                setCodColaborador("")
                setNomeColaborador("")
                setEmailColaborador("")
                // alert(result.message);
                alert("Erro ao cadastrar funcionário.")
            } else {
                setError(false);
                setCodColaborador("")
                setNomeColaborador("")
                setEmailColaborador("")
                window.location.reload();
            }
        } catch {

        }
    }

    const colaboradoresFiltrados = todosColaboradores.filter((colaborador) =>
        colaborador.Nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        String(colaborador.CodigoFunc).toLowerCase().includes(termoBusca.toLowerCase()) ||
        colaborador.Email.toLowerCase().includes(termoBusca.toLowerCase())
    );


    return (
        <div className={isDarkMode ? "bg-[#181717] z-0 text-white" : "bg-white z-0 text-black"}>
            <Menu />
            <div className="flex">
                <Submenu />
                <div className="flex flex-col pt-[150px] pl-[80px] pr-[60px] w-full gap-6">
                    <h2 className="text-[25px]">Colaboradores</h2>

                    <div className="flex justify-between items-center">
                        <div className="flex w-[50%] relative">
                            <input
                                type="text"
                                className="flex border rounded-sm w-full h-9 pl-10 placeholder:opacity-60"
                                placeholder="Pesquisar colaborador"
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                            />


                            <button
                                type="button"
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-transparent border-none cursor-pointer"
                            >
                                <Image
                                    src={isDarkMode ? search : searchBlack}
                                    alt="Ícone de lupa"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                        <button className="bg-orange-400 text-white rounded-xl p-2 flex gap-2 items-center cursor-pointer" onClick={openModal}>
                            <h1>Adicionar funcionario </h1>
                            <Image src={add} alt="imagem de +" className="w-5"></Image>
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex w-full gap-1 ">
                            <h1 className={isDarkMode ? "flex bg-[#272725] rounded-sm p-2 w-[20%] h-8 items-center font-bold" : "flex font-bold bg-[#bdbdbd] rounded-sm p-2 w-[20%] h-8 items-center"}>Código</h1>
                            <span className={isDarkMode ? "flex bg-[#272725] rounded-sm p-2 w-[40%] h-8 items-center font-bold" : "font-bold bg-[#bdbdbd] rounded-sm p-2 w-[40%] h-8 items-center"}>Nome</span>
                            <span className={isDarkMode ? "flex bg-[#272725] rounded-sm p-2 w-[40%] h-8 items-center font-bold" : "font-bold bg-[#bdbdbd] rounded-sm p-2 w-[40%] h-8 items-center"}>Email</span>
                        </div>

                        {colaboradoresFiltrados.map((colaborador, index) => (
                            <Colaborador
                                key={colaborador.Id ?? `${colaborador.CodigoFunc}-${index}`}
                                CodigoFunc={colaborador.CodigoFunc}
                                Nome={colaborador.Nome}
                                Email={colaborador.Email}
                            />
                        ))}
                    </div>
                </div>

                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm text-white">
                        <div className={isDarkMode ? "bg-zinc-800 text-white p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" : "bg-white p-8 rounded-lg shadow-lg flex items-center justify-center flex-col text-black"}>
                            <div className="p-2 flex flex-col w-96">
                                <h2 className="text-xl font-semibold mb-4">Novo Colaborador</h2>
                                <form className="flex flex-col">
                                    <input
                                        type="number"
                                        placeholder="Código"
                                        className="border-1 rounded-[5px] p-2 mt-2 text-[13px]"
                                        value={codColaborador}
                                        onChange={(e) => setCodColaborador(e?.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        className="border-1 rounded-[5px] p-2 mt-2 text-[13px]"
                                        value={nomeColaborador}
                                        onChange={(e) => setNomeColaborador(e?.target.value)}
                                    />
                                    <input
                                        type="Email"
                                        placeholder="Email"
                                        className="border-1 rounded-[5px] p-2 mt-2 text-[13px]"
                                        value={emailColaborador}
                                        onChange={(e) => setEmailColaborador(e?.target.value)}
                                    />
                                </form>
                                <div className="flex justify-between mt-10">
                                    <button
                                        onClick={closeModal}
                                        className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={Cadastrar}
                                        className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 cursor-pointer"
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}