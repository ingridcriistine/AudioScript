"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { Colaborador, Linha } from "@/components/tabelaColaboradores";
import Image from "next/image";
import search from "@/assets/search.png"
import add from "@/assets/add.png";
import { useEffect, useState } from "react";

export default function Colaboradores(){

    const [selectFormat, setSelectFormat] = useState(null);
    const [modal, setModal] = useState(false);
    const [nomeColaborador, setNomeColaborador] = useState("");
    const [codColaborador, setCodColaborador] = useState("");
    const [emailColaborador, setEmailColaborador] = useState("");
    const [error,setError] = useState<boolean>(false)

    const closeModal = () => {
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
    }

    const [todosColaboradores, setTodosColaboradores] = useState<Linha[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/user"); // Sua rota para todos os funcionários
                
                if (!response.ok) throw new Error("Falha ao buscar dados.");
                const data = await response.json();
                setTodosColaboradores(data);

            } catch (err) {
                // setError("Erro ao carregar colaboradores.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // if (loading) return <div>Carregando tabela...</div>;
    // if (error) return <div style={{ color: 'red' }}>{error}</div>;
    // if (todosColaboradores.length === 0) return <div>Nenhum colaborador para exibir.</div>;


    const Cadastrar = async () => {
        try{
            const response =  await fetch('http://localhost:5000/cadastraFunc',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomeColaborador: nomeColaborador,
                    codColaborador: codColaborador,
                    emailColaborador: emailColaborador
                }),
            });

            const result = await response.json();

            if (response.status > 400 && response.status < 500) {
                setError(true)
                setCodColaborador("")
                setNomeColaborador("")
                setEmailColaborador("")
                alert(result.message);
            } else {
                setError(false);
                setCodColaborador("")
                setNomeColaborador("")
                setEmailColaborador("")
            }
            console.log(result)
        }catch{

        }
    }
    return(
        <>
            <Menu/>
            <div className="flex">
                <Submenu/>
                <div className="flex flex-col pt-[150px] pl-[80px] pr-[60px] w-full gap-6">
                    <h2 className="text-[25px]">Colaboradores</h2>

                    <div className="flex justify-between items-center">
                        <div className="flex w-[50%] relative">
                            <input
                                type="text"
                                className="flex border rounded-sm w-full  h-9 pl-10 placeholder:opacity-60"
                                placeholder="Pesquisar colaborador"
                            />
                            <button
                                type="button"
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-transparent border-none cursor-pointer"
                            >
                                <Image
                                src={search}
                                alt="Ícone de lupa"
                                width={20}
                                height={20}
                                />
                            </button>
                        </div>
                        <button className="bg-orange-400 rounded-xl p-2 flex gap-2 items-center cursor-pointer" onClick={openModal}>
                            <h1>Adicionar funcionario </h1>
                            <Image src={add} alt="imagem de +" className="w-5"></Image>
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex w-full gap-1 ">
                            <h1 className="flex bg-[#272725] rounded-sm p-2 w-[20%] h-8 items-center">Código</h1>
                            <span className="flex bg-[#272725] rounded-sm p-2 w-[40%] h-8 items-center">Nome</span>
                            <span className="flex bg-[#272725] rounded-sm p-2 w-[40%] h-8 items-center">Email</span>
                        </div>

                        {todosColaboradores.map((colaborador) => (
                            <Colaborador 
                                Id={colaborador.Id}
                                Name={colaborador.Name}
                                Email={colaborador.Email}
                            />
                        ))}
                    </div>
                </div>

                {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                    <div className="bg-zinc-800 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
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
                                type="email"
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
        </>
    )
}