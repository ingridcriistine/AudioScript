import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Add from "@/assets/add.png";
import Pasta from "@/components/pasta";
import Arrow from "@/assets/arrow.png";
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";

export default function Historico() {
  return (
    <div className="">
        <Menu/>
        <div className="flex">
            <Submenu/>
            <div className="pt-[150px] pl-[80px]">
                <h2 className="text-[30px]">Histórico</h2>
                <div className="flex items-center gap-2">
                    <h3 className="text-[20px]">Pastas</h3>
                    <Image className="w-[20px] h-[20px]" src={Add} alt={"Ícone de adicionar"}/>
                </div>
                <Pasta title="Reuniões"/>
                <h3 className="text-[20px]">Arquivos</h3>
                <div className="flex gap-5">
                    <div className="flex justify-between p-1 pr-3 pl-3 border-2 border-white rounded w-[200px]"> 
                        <p className="text-[16px]">Formato</p>
                        <Image className="w-[13px]" src={Arrow} alt={"Ícone de adicionar"}/>
                    </div>
                    <div className="flex justify-between p-1 pr-3 pl-3 border-2 border-white rounded w-[200px]">
                        <p className="text-[16px]">Data</p>
                        <Image className="w-[13px]" src={Arrow} alt={"Ícone de adicionar"}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
