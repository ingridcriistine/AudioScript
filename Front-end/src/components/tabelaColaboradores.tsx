import React, { useEffect, useState } from "react"

export interface Linha {
    Id?: number
    CodigoFunc: string;
    Nome: string;
    Email: string;
}

export const Colaborador = ({ CodigoFunc, Nome, Email }: Linha) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
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

    return (
        <div className="flex gap-1">
            <span className={isDarkMode ? "w-[20%] bg-[#272725] h-8 rounded-sm p-2 items-center flex" : "w-[20%] bg-[#bdbdbd] h-8 rounded-sm p-2 items-center flex"}>{CodigoFunc}</span>
            <span className={isDarkMode ? "w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex" : "w-[40%] bg-[#bdbdbd] h-8 rounded-sm p-2 items-center flex"}>{Nome}</span>
            <span className={isDarkMode ? "w-[40%] bg-[#272725] h-8 rounded-sm p-2 items-center flex" : "w-[40%] bg-[#bdbdbd] h-8 rounded-sm p-2 items-center flex"}>{Email}</span>
        </div >
    )
}