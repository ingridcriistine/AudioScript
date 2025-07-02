import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import iconHome from "@/assets/home.png";
import iconExit from "@/assets/exit.png";
import iconSecret from "@/assets/lock.png";
import iconHistoryc from "@/assets/history.png";
import { useEffect, useState } from "react";
import MoonDark from "@/assets/moon-dark.png"
import MoonWhite from "@/assets/moon-white.png"
import SunWhite from "@/assets/sun-white.png"
import SunDark from "@/assets/sun-black.png"
import Logo from "@/assets/Logo.png"

export const Menu = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const storedTheme = localStorage.getItem("theme");
                return storedTheme !== null ? JSON.parse(storedTheme) : true;
            } catch (err) {
                console.warn("Erro ao carregar tema:", err);
                return true;
            }
        }
        return true;
    });


    const toggleTheme = () => {
        setIsDarkMode((prev: any) => {
            const updated = !prev;
            localStorage.setItem("theme", JSON.stringify(updated));
            window.dispatchEvent(new Event("themeChanged"));       
            return updated;
        });
    };
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    return (
        <>
            <div className="bg-[#272727] items-center flex justify-between text-amber-50 w-full h-20 shadow-lg shadow-gray-900/50 z-10 p-6 fixed top-0 left-0">
                <div className="flex">
                    <Link href={ROUTES.home} className="flex gap-2">
                        <Image src={Logo} alt={"Logo"} className="w-[180px]" />
                    </Link>          
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
