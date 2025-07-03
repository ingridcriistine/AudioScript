"use client";

import Image from "next/image";
import Points from "@/assets/points.png";
import { useRef, useState, useEffect } from "react";
import Locker from "@/assets/lock.png";

export default function ArquivoSecreto({ title }: any) {
  const [modal, setModal] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dotsRef = useRef<HTMLButtonElement>(null);
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

  const closeMenu = () => setModal(false);

  const openMenu = () => {
    if (dotsRef.current) {
      const offsetTop = dotsRef.current.offsetTop + dotsRef.current.offsetHeight + 12;
      const offsetLeft = dotsRef.current.offsetLeft;

      setMenuPosition({ top: offsetTop, left: offsetLeft });
      setModal(true);
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dotsRef.current && !dotsRef.current.contains(event.target as Node)) {
        setModal(false);
      }
    };
    
    if (modal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };

  }, [modal]);
  return (
    <>
      <div className="relative">
        <div className={isDarkMode ? "bg-[#3D3D3D] flex flex-col w-[220px] rounded p-3 pb-5 gap-4 text-[14px] items-center" : "bg-[#bdbdbd] flex flex-col w-[220px] rounded p-3 pb-5 gap-4 text-[14px] items-center"}>
          <div className="flex justify-between w-[190px]">
            <p className="cursor-pointer">{title}</p>
            <button ref={dotsRef} onClick={openMenu} className="p-1">
              <Image
                className="w-[20px] cursor-pointer"
                src={Points}
                alt="Ícone de opções"
              />
            </button>
          </div>
          <Image className="w-[28px] cursor-pointer" src={Locker} alt={"Ícone de cadeado"} />
        </div>

        {modal && (
          <div
            className="absolute bg-zinc-800 text-white rounded-md shadow-md flex flex-col w-40 z-50"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="px-4 py-2 text-left hover:bg-zinc-700">Renomear</button>
            <button className="px-4 py-2 text-left hover:bg-zinc-700">Mover para</button>
            <button className="px-4 py-2 text-left hover:bg-zinc-700">Baixar como .pdf</button>
            <button className="px-4 py-2 text-left hover:bg-zinc-700">Baixar como .doc</button>
            <button className="px-4 py-2 text-left hover:bg-zinc-700 text-red-400">Excluir</button>
          </div>
        )}
      </div>

    </>

  );
}
