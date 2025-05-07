import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import iconHome from "@/assets/home.png";
import iconExit from "@/assets/exit.png";
import iconSecret from "@/assets/lock.png";
import iconHistoryc from "@/assets/history.png";
import { useState } from "react";

export const Submenu = () => {

    const [modal, setModal] = useState(false);
    const [senha, setSenha] = useState<string>();

    const closeModal = () => {
        setModal(false);
    }

    const openModal = () => {
        setModal(true);
    }

    return (
        <>
            <div className="pt-20">
                <div className="bg-[#272725] flex flex-col w-[250px] h-screen">
                    <div className="flex p-5 pt-12">
                        <Link href={ROUTES.home} className="flex items-center gap-2">
                            <Image src={iconHome} alt="home" width={22} height={22} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Página Inicial</span>
                        </Link>
                    </div>
                    <div className="flex p-5">
                        <Link href={ROUTES.hist} className="flex items-center gap-2">
                            <Image src={iconHistoryc} alt="histórico" width={20} height={20} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Histórico</span>
                        </Link>
                    </div>
                    <div className="flex p-5">
                        <h2 className="flex items-center gap-2" onClick={openModal}>
                            <Image src={iconSecret} alt="arquivos secretos" width={20} height={20} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Arquivos Secretos</span>
                        </h2>
                    </div>
                    <div className="flex p-5">
                        <Link href={ROUTES.arqvScrt} className="flex items-center gap-2">
                            <Image src={iconHome} alt="colaboradores" width={20} height={20} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Colaboradores</span>
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Modal */}
            <div className={modal ? "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30" : "hidden"}>
                <div className="bg-zinc-800 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" >
                    <div className="p-2 flex flex-col w-96 bg-opacity-50 z-50">
                        <h2 className="text-xl font-semibold">Insira a senha de acesso</h2>
                        <form className="flex flex-col">
                            <input type="password" placeholder="Senha" className="border-2 rounded-[5px] p-1 mt-2 text-[13px]" value={senha} onChange={(e) => { setSenha(e.target.value) }} ></input>
                        </form>
                        <div className="flex justify-between mt-10">
                            <button onClick={() => closeModal()} className="flex justify-center items-center h-8 text-[15px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Cancelar</button>
                            <button onClick={() => setModal(false)} className="flex justify-center items-center h-8 text-[15px] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                                <Link href={ROUTES.arqvScrt} className="flex items-center">
                                    <span className="text-amber-50 hover:border-b border-amber-50">Confirmar</span>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
