"use client"
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { Colaborador } from "@/components/tabelaColaboradores";
import Image from "next/image";
import search from "@/assets/search.png"
import add from "@/assets/add.png";
import { useState } from "react";

export default function Colaboradores(){

    const [selectFormat, setSelectFormat] = useState(null);
    const [date, setDate] = useState<Date | null>(null);
    const [modal, setModal] = useState(false);
    const [nomeColaborador, setnomeColaborador] = useState("");
    const [codColaborador, setcodColaborador] = useState("");
    const [emailColaborador, setemailColaborador] = useState("");

    const closeModal = () => {
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
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
                                className="flex border rounded-sm w-full p-2 h-8 pl-10 placeholder:opacity-60"
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
                        <button className="bg-orange-400 rounded-xl p-2 flex gap-2 items-center" onClick={openModal}>
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

                        <Colaborador id={"a"} name={"a"} email={"a"}></Colaborador>
                    </div>
                </div>

                {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-zinc-800 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
                    <div className="p-2 flex flex-col w-96">
                        <h2 className="text-xl font-semibold mb-4">Novo Colaborador</h2>
                        <form className="flex flex-col">
                            <input
                                type="number"
                                placeholder="Código"
                                className="border-1 rounded-[5px] p-1 mt-2 text-[13px]"
                                value={codColaborador}
                                onChange={(e) => setcodColaborador(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Nome"
                                className="border-1 rounded-[5px] p-1 mt-2 text-[13px]"
                                value={nomeColaborador}
                                onChange={(e) => setnomeColaborador(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="border-1 rounded-[5px] p-1 mt-2 text-[13px]"
                                value={emailColaborador}
                                onChange={(e) => setemailColaborador(e.target.value)}
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
                            onClick={closeModal}
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