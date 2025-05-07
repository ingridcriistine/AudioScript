import { Menu } from "@/components/menu";
import { Submenu } from "@/components/submenu";
import { Colaborador } from "@/components/tabelaColaboradores";

export default function Colaboradores(){
    return(
        <>
            <Menu/>
            <div className="flex">
                <Submenu/>
                <div className="flex flex-col pt-[150px] pl-[80px] pr-[60px] w-full gap-6">
                    <h1>Colaboradores</h1>

                    <div className="flex justify-between items-center">
                        <input type="text" className="border rounded-sm w-[50%] p-2 h-8"/>
                        <button className="bg-orange-400 rounded-xl p-2">Adicionar colaborador</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex w-full gap-2 ">
                            <h1 className="flex bg-gray-500 rounded-sm p-2 w-[20%] h-8 items-center">Código</h1>
                            <span className="flex bg-gray-500 rounded-sm p-2 w-[40%] h-8 items-center">Nome</span>
                            <span className="flex bg-gray-500 rounded-sm p-2 w-[40%] h-8 items-center">Email</span>
                        </div>

                        <Colaborador id={"a"} name={"a"} email={"a"}></Colaborador>
                    </div>
                </div>
            </div>
        </>
    )
}