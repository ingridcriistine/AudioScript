import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import iconHome from "@/assets/home.png";
import iconExit from "@/assets/exit.png";
import iconSecret from "@/assets/lock.png";
import iconHistoryc from "@/assets/history.png";
import { useEffect, useState } from "react";

export const Menu = () => {
const [userName, setUserName] = useState('Carregando...');

    useEffect(() => {
        const userId = localStorage.getItem('Id');

        if (!userId) return;

        fetch(`http://localhost:5000/user/${userId}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar funcionário');
                return res.json();
            })
            .then((data) => {
                console.log("Nome do funcionário:", data.nome);
                setUserName(data.nome); // supondo que você tenha um useState para exibir
            })
            .catch((err) => {
                console.error(err);
                setUserName('Erro ao carregar nome');
            });
    }, []);

    return (
        <>
            <div className="bg-[#272727] items-center flex justify-between text-amber-50 w-full h-20 shadow-lg shadow-gray-900/50 z-10 p-6 fixed top-0 left-0">
                <div className="flex">
                    <Image src={Logo} alt={"Logo"} className="w-[180px]" />
                </div>
                <div className="flex items-center gap-20">
                    <h1>Nome pessoal</h1>
                    <button className="w-[25px] cursor-pointer" onClick={toggleTheme}>
                        <Image src={isDarkMode ? SunWhite : MoonWhite} alt="theme icon" />
                    </button>
                    <Link href={ROUTES.login} className="flex gap-2">
                        <Image src={iconExit} alt="histórico" width={20} />
                    </Link>
                </div>
            </div>
        </>
    );
};
