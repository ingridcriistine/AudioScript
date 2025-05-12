import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { Colaborador } from "@/components/tabelaColaboradores";
import Image from "next/image";
import search from "@/assets/search.png"
import add from "@/assets/add.png";

export default function Colaboradores(){
    return(
        <>
            <Menu/>
            <div className="flex">
                <Submenu/>
                <div className="flex flex-col pt-[150px] pl-[80px] pr-[60px] w-full gap-6">
                    <h2 className="text-[25px]">Histórico</h2>

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
                        <button className="bg-orange-400 rounded-xl p-2 flex gap-2 items-center">
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
            </div>
        </>
    )
}