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

    const formats = [
        { name: 'mp3' },
        { name: 'mp4' },
    ];

    return (
        <div className="">
            <Menu />
            <div className="flex">
                <Submenu />
                <div className="pt-[150px] pl-[80px] pr-[60px]">
                    <h2 className="text-[25px]">Histórico</h2>
                    <div className="flex items-center gap-2 mt-10 mb-8">
                        <h3 className="text-[18px]">Pastas</h3>
                        <Image className="w-[20px] h-[20px] cursor-pointer" src={Add} alt={"Ícone de adicionar"} />
                    </div>
                    <Pasta title="Reuniões" />
                    <h3 className="text-[18px] mt-8 mb-8">Arquivos</h3>
                    <div className="flex gap-5 mb-8">
                        <Dropdown value={selectFormat} onChange={(e) => setSelectFormat(e.value)} options={formats} optionLabel="name" placeholder="Formato" className="p-1 pr-3 pl-3 border-2 border-white rounded w-[200px] text-[14px]" panelClassName="custom-dropdown-panel"/>
                        <div className="flex justify-between p-1 pr-3 pl-3 border-2 border-white rounded w-[200px] text-[14px] cursor-pointer" >
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
            </div>
        </div>
    );
}
