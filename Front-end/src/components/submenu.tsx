"use client"

import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import iconHome from "@/assets/home.png";
import iconExit from "@/assets/exit.png";
import iconSecret from "@/assets/lock.png";
import iconHistoryc from "@/assets/history.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Submenu = () => {

    const [modal, setModal] = useState(false);
    const [senha, setSenhaArquivo] = useState<string>();
    const [empresaCodigo, setEmpresaCodigo] = useState<string>("");
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const fetchUserData = () => {
            const userId = localStorage.getItem("Id");
            if (!userId) return;

            fetch(`http://localhost:5000/user/${userId}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar funcionário");
                return res.json();
            })
            .then((data) => {
                setEmpresaCodigo(data.empresaCodigo); 
                console.log(empresaCodigo);
            })
            .catch((err) => {
                console.error(err);
            });
        };

        fetchUserData();

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

    const handleConfirm = () => {
        if (senha === empresaCodigo) {
            setModal(false);
            window.location.href = ROUTES.arqvScrt;
        } else {
            alert("Senha incorreta!");
        }
    };

    const closeModal = () => {
        handleConfirm();
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
                            <span className="text-amber-50 hover:border-b border-amber-50 cursor-pointer">Arquivos Secretos</span>
                        </h2>
                    </div>
                    <div className="flex p-5">
                        <Link href={ROUTES.cola} className="flex items-center gap-2">
                            <Image src={iconHome} alt="colaboradores" width={20} height={20} />
                            <span className="text-amber-50 hover:border-b border-amber-50">Colaboradores</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className={isDarkMode ? "bg-zinc-800 p-8 rounded-lg shadow-lg flex items-center justify-center flex-col" : "bg-white p-8 rounded-lg shadow-lg flex items-center justify-center flex-col"}>
                        <div className="p-2 flex flex-col w-96">
                            <h2 className="text-xl font-semibold mb-4">Insira a senha de acesso</h2>
                            <form className="flex flex-col">
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="border-1 rounded-[5px] p-2 mt-2 text-[13px]"
                                    value={senha}
                                    onChange={(e) => setSenhaArquivo(e.target.value)}
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
        </>
    );
};
