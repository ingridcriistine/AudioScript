import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Add from "@/assets/add.png";
import Pasta from "@/components/pasta";
import Arrow from "@/assets/arrow.png";
import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import Arquivo from "@/components/arquivoSecreto";

export default function ArquivoSecreto() {
  return (
    <div className="">
        <Menu/>
        <div className="flex">
            <Submenu/>
            <div className="pt-[150px] pl-[80px] pr-[60px]">
                <div>
                    <h2 className="text-[25px]">Arquivos Restritos</h2>
                </div>
                <div className="flex gap-5 mt-10 mb-10">
                    <div className="flex justify-between p-1 pr-3 pl-3 border-2 border-white rounded w-[200px]"> 
                        <p className="text-[14px]">Formato</p>
                        <Image className="w-[13px]" src={Arrow} alt={"Ícone de adicionar"}/>
                    </div>
                    <div className="flex justify-between p-1 pr-3 pl-3 border-2 border-white rounded w-[200px]">
                        <p className="text-[14px]">Data</p>
                        <Image className="w-[13px]" src={Arrow} alt={"Ícone de adicionar"}/>
                    </div>
                </div>
                <h3 className="text-[18px] mt-8 mb-8">Arquivos</h3>
                <div className="flex flex-wrap gap-5">
                    <Arquivo title="Spring lab"/>
                    <Arquivo title="Pitch"/>
                    <Arquivo title="Requisitos de Sistemas"/>
                </div>
            </div>
        </div>
    </div>
  );
}
