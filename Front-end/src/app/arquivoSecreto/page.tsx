"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Add from "@/assets/add.png";
import AddBlack from "@/assets/add-black.png";
import Pasta from "@/components/pasta";
import Arrow from "@/assets/arrow.png";
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import Arquivo from "@/components/arquivoSecreto";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import './custom.css';

export default function ArquivoSecreto() {

    const [selectFormat, setSelectFormat] = useState(null);
    const [date, setDate] = useState<Date | null>(null);
    const [modal, setModal] = useState(false);
    const [nomePasta, setNomePasta] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    const formats = [
        { name: 'mp3' },
        { name: 'mp4' },
    ];

    return (
        <div className={isDarkMode ? "bg-[#181717] z-0 text-white" : "bg-white z-0 text-black"}>
            <Menu />
            <div className="flex">
                <Submenu />
                <div className="pt-[150px] pl-[80px] pr-[60px]">
                    <h2 className="text-[25px]">Arquivos Secretos</h2>
                    <button className="flex items-center gap-2 mt-10 mb-8 cursor-pointer" onClick={openModal}>
                        <h3 className="text-[18px]">Pastas</h3>
                        <Image className="w-[20px] h-[20px] cursor-pointer" src={isDarkMode ? Add : AddBlack} alt={"Ícone de adicionar"} />
                    </button>
                    <Pasta title="Reuniões" />
                    <h3 className="text-[18px] mt-8 mb-8">Arquivos</h3>
                    <div className="flex gap-5 mb-8">
                        {/* <Dropdown value={selectFormat} onChange={(e) => setSelectFormat(e.value)} options={formats} optionLabel="name" placeholder="Formato" className={isDarkMode ? "p-1 pr-3 pl-3 border-2 border-white text-white rounded w-[200px] text-[14px]" : "p-1 pr-3 pl-3 border-2 border-black text-black rounded w-[200px] text-[14px]"} panelClassName="custom-dropdown-panel" /> */}
                        <div className={isDarkMode ? "flex justify-between p-1 pr-3 pl-3 border-2 border-white text-white rounded w-[200px] text-[14px] cursor-pointer" : "flex justify-between p-1 pr-3 pl-3 border-2 border-black text-black rounded w-[200px] text-[14px] cursor-pointer"}>
                            <Calendar
                                value={date}
                                onChange={(e) => setDate(e.value as Date)}
                                placeholder="Data"
                                showIcon
                                className={isDarkMode ? 'text-white' : 'text-black'}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5">
                        <Arquivo title="Spring lab" />
                        <Arquivo title="Pitch" />
                        <Arquivo title="Requisitos de Sistemas" />
                    </div>
                </div>

                {/* Modal */}
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
                            <div className="p-2 flex flex-col w-96">
                                <h2 className="text-xl font-semibold mb-4">Nova Pasta</h2>
                                <form className="flex flex-col">
                                    <input
                                        type="text"
                                        placeholder="Nome da pasta"
                                        className="border-2 rounded-[5px] p-2 mt-2 text-[13px]"
                                        value={nomePasta}
                                        onChange={(e) => setNomePasta(e.target.value)}
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
        </div>
    );
}
