"use client"

import React, { useState } from 'react';
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Add from "@/assets/add.png";
import Pasta from "@/components/pasta";
import Arrow from "@/assets/arrow.png";
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import Arquivo from "@/components/arquivo";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import './custom.css';

export default function Historico() {

    const [selectFormat, setSelectFormat] = useState(null);
    const [date, setDate] = useState<Date | null>(null);
    const [modal, setModal] = useState(false);
    const [nomePasta, setNomePasta] = useState("");

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
        <div className="z-0">
            <Menu />
            <div className="flex ">
                <Submenu />
                <div className="pt-[150px] pl-[80px] pr-[60px]">
                    <h2 className="text-[25px]">Histórico</h2>
                    <button className="flex items-center gap-2 mt-10 mb-8" onClick={() => openModal()}>
                        <h3 className="text-[18px]">Pastas</h3>
                        <Image className="w-[20px] h-[20px] cursor-pointer" src={Add} alt={"Ícone de adicionar"} />
                    </button>
                    <Pasta title="Reuniões" />
                    <h3 className="text-[18px] mt-8 mb-8">Arquivos</h3>
                    <div className="flex gap-5 mb-8">
                        <Dropdown value={selectFormat} onChange={(e) => setSelectFormat(e.value)} options={formats} optionLabel="name" placeholder="Formato" className="p-1 pr-3 pl-3 border-2 border-white rounded w-[200px] text-[14px]" panelClassName="custom-dropdown-panel"/>
                        <div className="flex justify-between p-1 pr-3 pl-3 border-2 border-white text-white rounded w-[200px] text-[14px] cursor-pointer" >
                            <Calendar
                                value={date}
                                onChange={(e) => setDate(e.value as Date)}
                                placeholder="Data"
                                showIcon
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5">
                        <Arquivo title="Spring lab" />
                        <Arquivo title="Pitch" />
                        <Arquivo title="Pitch" />
                        <Arquivo title="Pitch" />
                        <Arquivo title="Pitch" />
                        <Arquivo title="Pitch" />
                        <Arquivo title="Requisitos de Sistemas" />
                    </div>
                </div>

                {/* Modal */}
                <div className={modal ? "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" : "hidden"}>
                    <div className="bg-zinc-800 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col">
                        <div className="p-2 flex flex-col w-96">
                            <h2 className="text-xl font-semibold mb-4">Nova Pasta</h2>
                            <form className="flex flex-col">
                                <input type="text" placeholder="Nome da pasta" className="border-2 rounded-[5px] p-1 mt-2 text-[13px]" value={nomePasta} onChange={(e) => { setNomePasta(e.target.value) }} ></input>
                            </form>
                            <div className="flex justify-between mt-10">
                                <button onClick={() => closeModal()} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer">Cancelar</button>
                                <button onClick={() => closeModal()} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 cursor-pointer">Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
